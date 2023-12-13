import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Server } from '@/env/server';
import { sanitizeAndValidateUrl } from '@/lib/utils';
import { PageDataResponse } from '@/lib/types';
import { db } from '@/db/client';
import { Page } from '@/db/schema';

export const runtime = 'edge';

export async function GET(
	req: NextRequest,
): Promise<NextResponse<PageDataResponse> | NextResponse<{ message: string }>> {
	try {
		const url = sanitizeAndValidateUrl(req.nextUrl.searchParams.get('url'));
		const existingPageCacheResults = await db.select().from(Page).where(eq(Page.url, url));
		const existingPageCache = existingPageCacheResults.at(0);
		if (existingPageCache) {
			console.log(`Cache hit! Retrieving url[${url}] from cache.`);
			return NextResponse.json({
				authorName: existingPageCache.authorName,
				authorUrl: existingPageCache.authorUrl,
				publishedAt: existingPageCache.publishedAt,
				htmlContent: existingPageCache.htmlContent,
			});
		}

		console.log(`Cache miss. Fetching url[${url}] from source`);
		const pageDataResponse = await fetch(`${Server.env.JUNO_API_URL}/page?url=${url}&mode=rich`);
		if (!pageDataResponse.ok) {
			const pageError: { message: string } = await pageDataResponse.json();
			throw new Error(pageError.message);
		}

		const pageData: PageDataResponse = await pageDataResponse.json();
		const cachedAt = z.coerce.number().parse(pageDataResponse.headers.get('X-Cached-At'));
		await db.insert(Page).values({
			url,
			cachedAt,
			authorName: pageData.authorName,
			authorUrl: pageData.authorUrl,
			publishedAt: pageData.publishedAt,
			htmlContent: pageData.htmlContent,
		});

		return NextResponse.json(pageData);
	} catch (error) {
		let message = 'Internal server error';
		if (error instanceof Error) {
			message = error.message;
		}

		return NextResponse.json({ message }, { status: 500 });
	}
}

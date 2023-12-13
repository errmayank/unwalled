'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import * as cheerio from 'cheerio';
import { z } from 'zod';
import { RefreshCwIcon } from 'lucide-react';
import dayjs from 'dayjs';
import pluginAdvancedFormat from 'dayjs/plugin/advancedFormat';

import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@/env/client';
import { sleep } from '@/lib/utils';
import { PageDataResponse } from '@/lib/types';

dayjs.extend(pluginAdvancedFormat);

export const runtime = 'edge';

const getPageData = async (url: string): Promise<null | PageDataResponse> => {
	try {
		const pageDataResponse = await fetch(`${Client.env.SERVER_BASE_URL}/page?url=${url}`, {
			method: 'GET',
		});
		if (!pageDataResponse.ok) {
			const pageError: { message: string } = await pageDataResponse.json();
			throw new Error(pageError.message);
		}
		const pageData: PageDataResponse = await pageDataResponse.json();

		return pageData;
	} catch (error) {
		return null;
	}
};

export default function Page() {
	const { toast } = useToast();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [pageData, setPageData] = React.useState<null | PageDataResponse>(null);

	const rawUrl = searchParams.get('url');

	const setPageContent = useCallback(async () => {
		const url = z.string().safeParse(rawUrl);
		if (!url.success) {
			toast({ description: 'Please provide a valid URL' });
			return;
		}
		setIsLoading(true);
		const pageDataResponse = await getPageData(url.data);
		if (pageDataResponse === null) {
			toast({ description: 'Unable to get page content please try again later :(' });
			await sleep(5000);
			router.push('/');
			return;
		}

		const $ = cheerio.load(decodeURIComponent(pageDataResponse.htmlContent), {
			decodeEntities: true,
		});
		const article = $('#root').find('article').first();
		article.find('.speechify-ignore').remove();
		const htmlContent = article.html();

		if (htmlContent) {
			setPageData({
				authorName: decodeURIComponent(pageDataResponse.authorName),
				authorUrl: decodeURIComponent(pageDataResponse.authorUrl),
				publishedAt: pageDataResponse.publishedAt,
				htmlContent,
			});
		}
		setIsLoading(false);
	}, [toast, router, rawUrl]);

	React.useEffect(() => {
		setPageContent();
	}, [setPageContent]);

	return (
		<div className="container p-5 prose-sm">
			{isLoading && (
				<div className="w-full min-h-[calc(100dvh-48px-40px)] flex justify-center items-center">
					<RefreshCwIcon
						strokeWidth={1.5}
						absoluteStrokeWidth
						size={20}
						className="animate-spin mr-3"
					/>
				</div>
			)}
			{pageData && (
				<Card className="page-content w-full min-h-[calc(100dvh-48px-40px)] p-5 overflow-x-auto">
					<div className="flex flex-col gap-1">
						<div className="text-sm">
							<span>Written by&nbsp;</span>
							<Link href={pageData.authorUrl} target="_blank" rel="noopener noreferrer">
								{pageData.authorName}
							</Link>
						</div>
						<span className="text-xs text-foreground/40">
							Published at {dayjs(pageData.publishedAt).format('Do MMM YYYY')}
						</span>
						<hr className="my-5" />
					</div>

					<div dangerouslySetInnerHTML={{ __html: pageData.htmlContent }} />
				</Card>
			)}
		</div>
	);
}

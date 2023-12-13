import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import isUrl from 'validator/es/lib/isURL';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const TimeFormat = {
	TimestampTZ: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	ShortDate: 'YYYY-MM-DD',
} as const;

export const sanitizeAndValidateUrl = (inputUrl: unknown) => {
	const inputUrlString = z.string().parse(inputUrl);
	if (!isUrl(inputUrlString)) throw new Error('Invalid input URL');

	const url = new URL(inputUrlString);
	return url.origin + url.pathname;
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

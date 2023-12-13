'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCwIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { sanitizeAndValidateUrl } from '@/lib/utils';

export default function RootPage() {
	const { toast } = useToast();
	const router = useRouter();

	const [inputUrl, setInputUrl] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<div className="font-geist-sans">
			<div className="container w-full h-[calc(100dvh-48px)] flex flex-col justify-center items-center gap-6">
				<h1 className="text-4xl font-semibold tracking-tight text-center">
					Enter the Medium story URL
				</h1>
				<form
					className="w-full flex flex-row mb-10"
					onSubmit={e => {
						try {
							e.preventDefault();
							setIsLoading(true);
							const url = sanitizeAndValidateUrl(inputUrl);
							setIsLoading(false);

							router.push(`/page?url=${url}`);
						} catch (error) {
							setIsLoading(false);
							toast({
								description: 'Please enter a valid Medium story URL',
							});
						}
					}}
				>
					<Input
						value={inputUrl}
						onChange={e => {
							setInputUrl(e.target.value);
						}}
						icon={
							isLoading ? (
								<RefreshCwIcon
									strokeWidth={1.5}
									absoluteStrokeWidth
									size={20}
									className="animate-spin mr-3"
								/>
							) : (
								<SearchIcon strokeWidth={1.5} absoluteStrokeWidth size={20} className="mr-3" />
							)
						}
						type="text"
						placeholder="https://medium.com/@..."
						className="w-full h-12 rounded-r-none bg-background"
					/>
					<Button type="submit" className="h-12 rounded-l-none">
						Unwall
					</Button>
				</form>
			</div>
		</div>
	);
}

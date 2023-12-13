'use client';

import Link from 'next/link';
import { GithubIcon } from 'lucide-react';

import { UnwalledIcon } from '@/components/ui/vectors/unwalled-icon';
import { ThemeToggle } from '@/components/theme-toggle';

export const TopNav = () => {
	return (
		<nav className="w-full h-12 border-b bg-card">
			<div className="container h-12 flex justify-between items-center">
				<Link href="/" className="flex items-center gap-2 select-none">
					<UnwalledIcon size={24} />
					<span className="font-semibold tracking-tight mt-0.5 text-lg">Unwalled</span>
				</Link>
				<div className="flex items-center gap-2">
					<Link
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/errmayank/unwalled"
						className="w-9 h-9 inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground"
					>
						<GithubIcon strokeWidth={1.5} absoluteStrokeWidth size={20} />
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
};

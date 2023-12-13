import React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon: React.JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div
				className={cn(
					'flex h-10 items-center rounded-md border border-input bg-white px-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0',
					className,
				)}
			>
				{icon}
				<input
					type={type}
					className="w-full h-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };

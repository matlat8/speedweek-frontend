"use client";
import type { PropsWithChildren } from "react";
import { cn } from "@/utils";

export function DrawerSectionDivider({ children }: Readonly<PropsWithChildren>) {
	return (
		<div className={ cn("flex items-center -mx-6 px-6 uppercase text-gray-400 font-medium text-xs tracking-wide mt-4 border-t border-gray-200", !children ? "my-4 h-auto" : "h-12.5") }>
			{ children }
		</div>
	);
}
"use client";
import { type HTMLAttributes, type PropsWithChildren, useContext, useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/utils";
import { DrawerContext } from "./index";

export function DrawerItem({ children, icon: Icon, active = false, className, ...props }: Readonly<HTMLAttributes<HTMLButtonElement> & PropsWithChildren<Partial<{
	icon: IconType;
	active: boolean;
}>>>) {
	const indicatorRef = useContext(DrawerContext);
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(function() {
		if (active && indicatorRef.current && ref.current) {
			indicatorRef.current.style.transitionProperty = "height, top";
			indicatorRef.current.style.height = `${ ref.current.offsetHeight }px`;
			indicatorRef.current.style.top = `${ ref.current.offsetTop }px`;
			indicatorRef.current.addEventListener("transitionend", function() {
				if (!indicatorRef.current) return;
				indicatorRef.current.style.transitionProperty = "none";
			}, { once: true });
		}
	}, [ active, indicatorRef ]);

	return (
		<button
			className={ cn("h-12.5 outline-0 w-full px-6", !active && "group-hover/item:bg-gray-100 group-focus-within/item:bg-gray-100", className) }
			tabIndex={ 0 }
			{ ...props }
			ref={ ref }>
			<div className={ cn("h-full flex items-center px-4 cursor-pointer gap-3.5 font-medium text-sm select-none transition-colors rounded-md", active ? "bg-primary text-white group-focus-within/item:bg-none group-hover/item:bg-primary-700" : "text-gray-500") }>
				{ Icon && <Icon className="shrink-0 text-2xl" /> }
				{ children }
			</div>
		</button>
	);
}
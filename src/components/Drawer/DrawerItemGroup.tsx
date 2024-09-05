"use client";
import { Children, type PropsWithChildren } from "react";

export function DrawerItemGroup({ children }: Readonly<PropsWithChildren>) {
	return (
		<ul className="flex flex-col isolate group/section">

			{ Children.map(children, (child, index) => (
				<li className="group/item -mx-6" key={ index }>
					{ child }
				</li>
			)) }

		</ul>
	);
}
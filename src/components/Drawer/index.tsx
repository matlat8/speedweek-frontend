"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useRef, type RefObject } from "react";
import { FaChartPie, FaTachometerAlt } from "react-icons/fa";
import { FaArrowRightFromBracket, FaCartShopping, FaMoneyCheckDollar, FaPhoneVolume, FaTruckFast } from "react-icons/fa6";
import getQueryClient from "@/app/providers";
//import omegaLogo from "~/assets/logo-horizontal.png";
import swAPI from "@/api/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils";
import { DrawerItem } from "./DrawerItem";
import { DrawerItemGroup } from "./DrawerItemGroup";
import { DrawerSectionDivider } from "./DrawerSectionDivider";
export { DrawerItem, DrawerItemGroup, DrawerSectionDivider };

export const DrawerContext = createContext<RefObject<HTMLLIElement>>({ current: null });

export function Drawer() {

	const pathname = usePathname();
	const { push } = useRouter();
	const ref = useRef<HTMLLIElement>(null);

	const logout = async function() {
		getQueryClient.setQueryData([ "user" ], false);
		await swAPI.post("/auth/cookie/logout");
	}

	return (
		<aside className="w-[241px] sticky left-0 border-r h-full flex flex-col overflow-y-auto shrink-0 py-4.5 bg-white z-10 top-0 bottom-0">
			<div className="flex justify-center h-35 items-start shrink-0">

			</div>
			<ul className="flex flex-col relative mx-6">
				<DrawerContext.Provider value={ ref }>

					<li
						className="bg-primary w-1 rounded-r-full h-12.5 absolute transition-all -left-6"
						ref={ ref } />

					<DrawerItemGroup>

						<DrawerItem
							active={ pathname === "/" }
							icon={ FaTachometerAlt }
							onClick={ () => push("/") }>
							Dashboard
						</DrawerItem>

					</DrawerItemGroup>

					<DrawerSectionDivider>Time Trials</DrawerSectionDivider>

					<DrawerItemGroup>

						<DrawerItem
							active={ pathname === "/leagues" }
							icon={ FaCartShopping }
							onClick={ () => push("/leagues") }>
							Leagues
						</DrawerItem>
						
						<DrawerItem
							active={ pathname === "/syndicated" }
							icon={ FaChartPie }
							onClick={ () => push("/syndicated") }>
							Syndicated
						</DrawerItem>

					</DrawerItemGroup>

					<DrawerSectionDivider>Operations</DrawerSectionDivider>
						
					<DrawerItemGroup>
						
						<DrawerItem
							active={ pathname === "/consumer-care" }
							icon={ FaPhoneVolume }
							onClick={ () => push("/consumer-care") }>
							Consumer care
						</DrawerItem>
						
						<DrawerItem
							active={ pathname === "/finance" }
							icon={ FaMoneyCheckDollar }
							onClick={ () => push("/finance") }>
							Finance
						</DrawerItem>
					
						<DrawerItem
							active={ pathname === "/logistics" }
							icon={ FaTruckFast }
							onClick={ () => push("/logistics") }>
							Logistics
						</DrawerItem>

						{ /* <DrawerItem
							active={ pathname === "/inventory" }
							icon={ FaTruckLoading }
							onClick={ () => push("/inventory") }>
							Inventory
						</DrawerItem> */ }
				
					</DrawerItemGroup>
					
					<DrawerSectionDivider />

					<DrawerItemGroup>

						{ /* <DrawerItem
							active={ pathname === "/settings" }
							icon={ FaGear }>
							{ /* // onClick={ () => push("/settings") }> */ }
						{ /* Settings */ }
						{ /* </DrawerItem> */ }

						<DrawerItem
							icon={ FaArrowRightFromBracket }
							onClick={ logout }>
							Logout
						</DrawerItem>
				
					</DrawerItemGroup>
				</DrawerContext.Provider>
			</ul>
		</aside>
	);
}
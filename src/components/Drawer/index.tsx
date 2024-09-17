"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useRef, type RefObject } from "react";
import {  FaTachometerAlt } from "react-icons/fa";
import { FaArrowRightFromBracket, FaCarSide, FaPeopleGroup } from "react-icons/fa6";
import getQueryClient from "@/app/providers";
import swAPI from "@/api/axiosInstance";
import { cn } from "@/utils";
import { DrawerItem } from "./DrawerItem";
import { DrawerItemGroup } from "./DrawerItemGroup";
import { DrawerSectionDivider } from "./DrawerSectionDivider";
import { useAuth } from "@/context/AuthContext";

export const DrawerContext = createContext<RefObject<HTMLLIElement>>({ current: null });

export function Drawer() {
  const pathname = usePathname();
  const { push } = useRouter();
  const ref = useRef<HTMLLIElement>(null);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await swAPI.post("/auth/cookie/logout");
    logout(); // Clear the user state
    push("/login"); // Redirect to login page
  };

  return (
  <aside className="w-[241px] sticky left-0 border-r h-screen flex flex-col overflow-y-auto shrink-0 py-4.5 bg-white z-10 top-0 pt-16">
    <div className="flex justify-center h-35 items-start shrink-0">
      {/* Add any content here if needed */}
    </div>
    <ul className="flex flex-col relative mx-6">
      <DrawerContext.Provider value={ref}>
        <li
          className="bg-primary w-1 rounded-r-full h-12.5 absolute transition-all -left-6"
          ref={ref}
        />
        <DrawerItemGroup>
          <DrawerItem
            active={pathname === "/"}
            icon={FaTachometerAlt}
            onClick={() => push("/")}
          >
            Dashboard
          </DrawerItem>
          <DrawerItem
            active={pathname === "/teams"}
            icon={FaPeopleGroup}
            onClick={() => push("/teams")}
          >
            Teams
          </DrawerItem>
        </DrawerItemGroup>
        <DrawerSectionDivider>
          <p className="p-3">Time Trials</p>
        </DrawerSectionDivider>
        <DrawerItemGroup>
          <DrawerItem
            active={pathname === "/leagues"}
            icon={FaCarSide}
            onClick={() => push("/leagues")}
          >
            Leagues
          </DrawerItem>
        </DrawerItemGroup>
        <DrawerSectionDivider />
      </DrawerContext.Provider>
    </ul>
  </aside>
  );
}
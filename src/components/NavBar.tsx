'use client'
import { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

const NavBar = () => {
  const [active, setActive] = useState('home');

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>
      <NavigationMenu className="flex-1, py-10 h-5" orientation='vertical'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 ${
                active === 'home' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('home')}
            >
              <FaHome className="h-6 w-6 mr-3" />
              Home
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 ${
                active === 'profile' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('profile')}
            >
              <FaUser className="h-6 w-6 mr-3" />
              Profile
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 ${
                active === 'settings' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('settings')}
            >
              <FaCog className="h-6 w-6 mr-3" />
              Settings
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
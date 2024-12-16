"use client"
import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/shadcn/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetHeader} from "@/components/shadcn/sheet";
import { BarChart, Menu, Home, Search, Compass, LayoutDashboard } from "lucide-react";
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <BarChart className="h-6 w-6" />
        <span className="font-bold text-lg">Bsky Analytics</span>
      </div>

      {/* Navigation for Larger Screens */}
      <div className="hidden sm:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" /> Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Compass className="mr-2 h-4 w-4" /> Discover
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Navigation for Smaller Screens */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" /> Home
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <Search className="h-5 w-5" /> Search
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <Compass className="h-5 w-5" /> Discover
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
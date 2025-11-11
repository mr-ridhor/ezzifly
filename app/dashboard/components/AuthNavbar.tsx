"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, ChevronDown, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AuthNavbar = () => {
  const [open, setOpen] = useState(false);

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "/flags/ng.png" },
    { code: "USD", name: "US Dollar", flag: "/flags/us.png" },
    { code: "GBP", name: "British Pound", flag: "/flags/gb.png" },
    { code: "EUR", name: "Euro", flag: "/flags/eu.png" },
    { code: "CAD", name: "Canadian Dollar", flag: "/flags/ca.png" },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  // Example logged-in user
  const user = {
    name: "Victor Daniel",
    avatar: "/avatar.jpg", // Replace with your actual image path or URL
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full h-[70px] flex items-center bg-white shadow-sm dark:bg-black">
      <div className="mx-auto w-[90%] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Ezzifly Logo"
            width={150}
            height={150}
            priority
          />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart */}
          <ShoppingCart className="cursor-pointer text-black" size={18} />

          {/* Flag + EN + Divider + Currency Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="rounded-full h-4 w-4 overflow-hidden">
                <Image
                  src="/flags/ng.png"
                  alt="Nigeria Flag"
                  width={18}
                  height={18}
                  className="rounded-full h-full w-full"
                />
              </div>
              <span className="text-sm font-medium text-black">EN</span>
            </div>

            <span className="text-gray-400 text-sm">|</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-sm font-medium text-black hover:text-gray-700">
                  <span>{selectedCurrency.code}</span>
                  <ChevronDown className="h-3 w-3 text-gray-500 mt-[1px]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {currencies.map((cur) => (
                  <DropdownMenuItem
                    key={cur.code}
                    onClick={() => setSelectedCurrency(cur)}
                    className="flex items-center space-x-2"
                  >
                    <div className="h-4 w-4 rounded-full overflow-hidden">
                      <Image
                        src={cur.flag}
                        alt={cur.name}
                        width={16}
                        height={16}
                        className="rounded-full h-full w-full"
                      />
                    </div>
                    <span>{cur.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex  items-center space-x-2 focus:outline-none">
                <div className="relative h-10 w-10 rounded-full">

                <Image
                  src={user.avatar}
                  alt={user.name}
                  // width={30}
                  // height={30}
                  fill
                  className="rounded-full"
                  />
                  </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-black">{user.name}</p>
                  <p className="text-xs text-gray-500">Your account</p>
                </div>
                {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-2 text-red-600 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button onClick={() => setOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[75%] sm:w-[50%] p-4 bg-white dark:bg-black"
            >
              <div className="flex flex-col space-y-4 mt-12 text-gray-800 dark:text-gray-100">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-base font-medium">Cart</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full overflow-hidden">
                    <Image
                      src="/flags/ng.png"
                      alt="Nigeria Flag"
                      width={20}
                      height={20}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <span className="text-base font-medium">English (NG)</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-base font-medium">
                    {selectedCurrency.code} - {selectedCurrency.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">Your account</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;

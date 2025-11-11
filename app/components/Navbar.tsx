"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
// import { RegisterDialog } from "./RegisterDialog";
import { useModalStore } from "@/store/modalStore";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { openRegister, openNewsletter } = useModalStore();

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "/flags/ng.png" },
    { code: "USD", name: "US Dollar", flag: "/flags/us.png" },
    { code: "GBP", name: "British Pound", flag: "/flags/gb.png" },
    { code: "EUR", name: "Euro", flag: "/flags/eu.png" },
    { code: "CAD", name: "Canadian Dollar", flag: "/flags/ca.png" },
  ];
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <>
    {/* <RegisterDialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen} /> */}
    <header className="fixed top-0 left-0 z-50 w-full h-[70px] flex items-center bg-white shadow-sm dark:bg-black">
      <div className="mx-auto w-[90%] flex items-center justify-between ">
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
            {/* Flag + EN */}
            <div className="flex items-center space-x-2">
                <div className=" rounded-full  h-4 w-4">

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

            {/* Divider */}
            <span className="text-gray-400 text-sm">|</span>

            {/* Currency Dropdown */}
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
                    <div className="h-4 w-4 rounded-full">

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
          <Button 
         onClick={openRegister}
          className="bg-primary cursor-pointer h-[45px] w-[169px] text-sm font-se text-white hover:bg-primary">
            Sign In or Register
          </Button>
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
                 {/* Menu Content */}
            <div className="flex flex-col space-y-4 mt-12  text-gray-800 dark:text-gray-100">
              {/* Cart */}
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-base font-medium">Cart</span>
              </div>

              {/* Language */}
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

              {/* Currency */}
              <div className="flex flex-col space-y-1">
                <span className="text-base font-medium">
                  NGN - Nigerian Naira
                </span>
              </div>

         
            </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;

"use client"
import Link from "next/link"

import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/ui/button";

export default function Footer() {
      const { openRegister, openLogin } = useModalStore();
    
  return (
    <footer className="bg-[#132839] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
      <div className="md:hidden flex  items-start">
            <div className="text-2xl font-bold">
            <img src="/Ezziflylogo.svg" className=""/>

            </div>
          </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Company Column */}
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Company Details
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Policy Column */}
          <div>
            <h5 className="font-semibold mb-4">Our Policy</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h5 className="font-semibold mb-4">Socials</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Facebook size={18} />
                  <span>Ezzify</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Instagram size={18} />
                  <span>Ezzify</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Twitter size={18} />
                  <span>Ezzify</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Mail size={18} />
                  <span>ezzifywithus@gmail.com</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Phone size={18} />
                  <span>09053081230</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h5 className="font-semibold mb-4">Account</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Button
                onClick={openRegister}
                 className="hover:opacity-80  bg-transparent hover:bg-transparent transition-opacity">
                  Register
                </Button>
              </li>
              <li>
                <Button
                onClick={openLogin}
                className="hover:opacity-80 bg-transparent hover:bg-transparent transition-opacity">
                  Sign In
                </Button>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex justify-end items-start">
            <div className="text-2xl font-bold">
            <img src="/Ezziflylogo.svg" className=""/>

            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-sm opacity-90">Copyrights © 2025 Ezzify. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

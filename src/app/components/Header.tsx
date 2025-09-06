"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import navLinks from "../../constants/navLinks";
import { useState } from "react";
import Navlink from "./Navlink";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div>
            <Image
              src={logo}
              alt="logo"
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white italic font-[cursive]">
            Receipe
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map((navLinks, index) => (
              <Navlink key={index} {...navLinks} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

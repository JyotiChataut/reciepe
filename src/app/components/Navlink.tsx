'use client'

import Link from 'next/link'
import { useState } from 'react'
import * as React from 'react';


type SubMenu = {
  label: string;
  route: string;
};

type NavLinkProps = {
  label: string;
  route: string;
  subMenu?: SubMenu[];
};

function Navlink(navLinks: NavLinkProps): React.JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <li>
      <Link
        href={navLinks.route}
        className="block relative py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        onClick={() => {
          if ((navLinks.subMenu?.length ?? 0) > 0)
            setShowDropdown(!showDropdown);
        }}
      >
        {navLinks.label}

        <div>
          {(navLinks.subMenu?.length ?? 0) > 0 ? (
            <div
              className={` ${
                showDropdown ? "block" : "hidden"
              } absolute top-10 z-10   font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className=" py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                {navLinks.subMenu?.map((subMenu, index) => (
                  <li key={index}>
                    <Link
                      href={subMenu.route}
                      className="  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {subMenu.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
}

export default Navlink
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
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

type isAuthProps = {
  isAuth: boolean;
};

function Navlink(props: NavLinkProps & isAuthProps) {
  const { label, route, subMenu, isAuth } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();

  const isActive =pathname == route || ( route!=='/' &&pathname.startsWith(route));
  
  
  return (
    <li className="relative"
    
    onMouseEnter={() => {
          if ((subMenu?.length ?? 0) > 0) setShowDropdown(true);
           
        }}
        onMouseLeave={()=>(setShowDropdown(false))}>
      <Link
        href={route}
        className={` ${isActive?'text-blue-700 dark:text-blue-500': ' text-gray-900 dark:text-white'} block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
       
      >
        {label}
      </Link>
        <div>
          {(subMenu?.length ?? 0) > 0 ? (
            <div
              className={` ${
                showDropdown ? "block" : "hidden"
              } absolute top-6 z-10   font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className=" py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                {subMenu?.map((subMenu, index) => (
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
      
    </li>
  );
}

export default Navlink
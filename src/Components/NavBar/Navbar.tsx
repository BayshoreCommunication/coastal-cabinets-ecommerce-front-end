"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <div>
      {/* Desktop Nav */}
      <div className="hidden lg:flex justify-between items-center py-1 font-medium text-lg bg-white px-28">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-8 font-darker font-semibold text-base text-black">
            {["home", "cabinets", "products", "about", "contact"].map((page) => (
              <li key={page}>
                <Link href={`/${page}`} className="hover:text-blue-500 capitalize">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden flex justify-between items-center px-5 py-4">
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <button onClick={toggleDrawer} aria-label="Toggle menu">
          <FiMenu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ease-in-out"
          onClick={toggleDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-4/5 bg-gradient-to-b from-white to-[#8aceda] z-50 shadow-lg p-6 flex flex-col transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>
          <button onClick={toggleDrawer} aria-label="Close drawer">
            <FiX size={28} />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <nav className="mt-10 flex flex-col gap-6 ml-4 font-darker text-base font-semibold text-black">
          {["home", "cabinets", "products", "about", "contact"].map((page) => (
            <Link
              key={page}
              href={`/${page}`}
              onClick={toggleDrawer}
              className="hover:text-blue-500 capitalize"
            >
              {page}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

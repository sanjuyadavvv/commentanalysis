"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [decoded, setDecoded] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(JSON.parse(token));
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("AuthToken");
    location.reload();
  }

  function toggleDropdown() {
    setDropdownVisible((prev) => !prev);
  }

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-colors">
              YT Comments Xpert
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {decoded ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <span>Hi, {decoded.fname}</span>
                  <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

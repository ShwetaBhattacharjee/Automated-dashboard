"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[rgba(0,0,0,0.6)] backdrop-blur-md text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Image src="/logo.jpg" alt="Company Logo" width={50} height={40} />
        </Link>
      </div>

      {/* Right: Desktop Nav */}
      <ul className="hidden md:flex space-x-4 items-center">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/br" className="hover:underline">
            BR Unit
          </Link>
        </li>
        <li>
          <Link href="/influencer" className="hover:underline">
            Influencer Unit
          </Link>
        </li>
        <li>
          <Link href="/ai-news-daily" className="hover:underline">
            Daily AI News
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </li>
        <li>
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-3 py-1 rounded-md"
            >
              Sign out
            </button>
          ) : (
            <Link href="/signin" className="text-white hover:underline">
              Sign in
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMenu}
        className="md:hidden focus:outline-none z-50"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 backdrop-blur-md z-40 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col space-y-6 p-6 pt-20 text-lg">
          <li>
            <Link href="/dashboard" onClick={toggleMenu}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/br" onClick={toggleMenu}>
              BR Unit
            </Link>
          </li>
          <li>
            <Link href="/influencer" onClick={toggleMenu}>
              Influencer Unit
            </Link>
          </li>
          <li>
            <Link href="/ai-news-daily" onClick={toggleMenu}>
              Daily AI News
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={toggleMenu}
                className="hover:underline"
              >
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

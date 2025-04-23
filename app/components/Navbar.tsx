"use client";
import type { JSX } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMenuOpen(!menuOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  if (status === "loading") return null;

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-[#171717] p-2 rounded-md shadow-md"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#171717] text-white z-40 transition-all duration-300 ease-in-out
        ${
          isMobile
            ? menuOpen
              ? "w-64"
              : "w-0"
            : isSidebarOpen
            ? "w-64"
            : "w-16"
        }
        overflow-hidden flex flex-col shadow-lg`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {(!isMobile || menuOpen) && isSidebarOpen && (
            <Link href="/dashboard">
              <Image
                src="/logo.jpg"
                alt="Company Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
            </Link>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <ChevronLeft size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-2 p-4 flex-1" role="navigation">
          <SidebarLink
            href="/dashboard"
            label="Dashboard"
            icon={DashboardIcon}
            isOpen={isSidebarOpen || (isMobile && menuOpen)}
          />
          <SidebarLink
            href="/states"
            label="Analytics"
            icon={AnalyticsIcon}
            isOpen={isSidebarOpen || (isMobile && menuOpen)}
          />
          <SidebarLink
            href="/ai-news-daily"
            label="Daily AI News"
            icon={NewsIcon}
            isOpen={isSidebarOpen || (isMobile && menuOpen)}
          />
          <SidebarLink
            href="/contact"
            label="Contact Us"
            icon={ContactIcon}
            isOpen={isSidebarOpen || (isMobile && menuOpen)}
          />
        </ul>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          {session ? (
            <div className="flex items-center">
              {(isSidebarOpen || (isMobile && menuOpen)) && (
                <div className="flex-1">
                  <p className="text-sm font-semibold">{session.user?.name}</p>
                  <p className="text-xs text-gray-400">{session.user?.email}</p>
                </div>
              )}
              <button
                onClick={() => signOut()}
                className={`text-white hover:bg-[#2A2A2A] rounded-md p-2 transition-colors ${
                  !isSidebarOpen && !menuOpen && "w-10 h-10 flex justify-center"
                }`}
                aria-label="Sign out"
              >
                <LogoutIcon />
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className={`flex items-center text-white hover:bg-[#2A2A2A] rounded-md p-2 transition-colors ${
                !isSidebarOpen && !menuOpen && "justify-center"
              }`}
            >
              <LoginIcon />
              {(isSidebarOpen || (isMobile && menuOpen)) && (
                <span className="ml-2">Sign In</span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

/* Utility Components */

function SidebarLink({
  href,
  label,
  icon: Icon,
  isOpen,
}: {
  href: string;
  label: string;
  icon: () => JSX.Element;
  isOpen: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center text-white hover:bg-[#2A2A2A] rounded-md p-2 transition-colors ${
          !isOpen && "justify-center"
        }`}
      >
        <Icon />
        {isOpen && <span className="ml-2">{label}</span>}
      </Link>
    </li>
  );
}

/* Icons */

function DashboardIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 3v18h18" />
      <path d="M3 10h18" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v4" />
      <path d="M10 14L21 3" />
      <path d="M21 3v4" />
    </svg>
  );
}

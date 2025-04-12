import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[rgba(0,0,0,0.6)] backdrop-blur-md text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      {/* Logo on the left side */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Image
            src="/logo.jpg"
            alt="Company Logo"
            width={50}
            height={40}
          />
        </Link>
      </div>

      {/* Navbar links */}
      <ul className="flex space-x-4">
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
      </ul>

      {/* Authentication button */}
      {session ? (
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Sign out
        </button>
      ) : (
        <Link href="/signin" className="text-white">
          Sign in
        </Link>
      )}
    </nav>
  );
}

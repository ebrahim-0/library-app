"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center w-4/5 mx-auto py-5">
      <div>
        <Link
          href="/"
          className={`text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300 cursor-pointer`}
        >
        <img src="/logo.png" alt="logo" className="w-10 h-10 inline-block mr-2" />
          Library App
        </Link>
      </div>

      <div className="ml-auto">
        <Link
          href="/"
          className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer`}
        >
          Home
        </Link>
        <Link
          href={session ? "/dashboard" : "/login"}
          className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer`}
        >
          Dashboard
        </Link>
        {!session && (
          <>
            <Link
              href="/login"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer`}
            >
              Login
            </Link>

            <Link
              href="/register"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

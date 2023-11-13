"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function NavBar() {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center w-4/5 mx-auto py-5">
      <div>
        <Link
          href="/"
          className={`text-white px-3 py-2 rounded-md text-xl font-medium transition-all duration-300 cursor-pointer`}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 inline-block mr-2"
          />
          Library App
        </Link>
      </div>

      <div className="ml-auto sm:flex justify-center items-center gap-3 hidden">
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
        <Link
          href={session ? "/add-book" : "/login"}
          className={`text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
            session ? "" : "hidden"
          }`}
        >
          Add Book
        </Link>
        {!session && (
          <>
            <Link
              href={"/login"}
              className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer`}
            >
              Login
            </Link>

            <Link
              href={"/register"}
              className="text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              Register
            </Link>
          </>
        )}
        {session && (
          <button
            className="red_btn"
            onClick={() => {
              signOut().then((r) => console.log(r));
              setToggleDropdown(false);
            }}
          >
            Log Out
          </button>
        )}
      </div>

      <div className="sm:hidden flex relative">
        <div className="flex">
          <FaBars
            className="text-3xl text-white"
            onClick={() => {
              setToggleDropdown((prev) => !prev);
            }}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Home
              </Link>
              <Link
                href={session ? "/dashboard" : "/login"}
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Dashboard
              </Link>
              {session && (
                <button
                  type="button"
                  className="red_btn w-full"
                  onClick={() => {
                    signOut().then((r) => console.log(r));
                    setToggleDropdown(false);
                  }}
                >
                  Sign Out
                </button>
              )}
              {!session && (
                <>
                  <Link
                    href={"/login"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href={"/register"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

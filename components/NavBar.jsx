"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function NavBar() {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center w-4/5 mx-auto py-5">
      <div>
        <Link href="/" className={"text-white text-xl font-medium"}>
          <img
            src="/logo.png"
            alt="logo"
            className="h-[60px] w-full inline-block mr-2"
          />
        </Link>
      </div>

      <div className="ml-auto md:flex justify-center items-center gap-3 hidden">
        <Link
          href="/"
          className={
            "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
          }
        >
          Home
        </Link>
        <Link
          href={session ? "/dashboard" : "/login"}
          className={
            "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
          }
        >
          Dashboard
        </Link>{" "}
        {session && session.user?._doc?.role !== "librarian" && (
          <Link
            href={"search"}
            className={
              "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
            }
          >
            Search
          </Link>
        )}
        {session && session.user?._doc?.role !== "researchers&students" && (
          <>
            <Link
              href={session ? "/add-book" : "/login"}
              className={`text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black ${
                session ? "" : "hidden"
              }`}
            >
              Add Book
            </Link>

            {session && (
              <Link
                href={"/profile"}
                className={
                  "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
                }
              >
                <span>Welcome, </span>
                <span className="font-semibold capitalize">
                  {session.user.name}
                </span>
              </Link>
            )}
          </>
        )}
        {!session && (
          <>
            <Link
              href={"/login"}
              className={
                "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
              }
            >
              Login
            </Link>

            <Link
              href={"/register"}
              className={
                "text-white px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
              }
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div className="flex relative md:hidden">
        <Menu
          className="text-3xl text-white md:hidden"
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
            <Link
              href={"/search"}
              className="dropdown_link"
              onClick={() => setToggleDropdown(false)}
            >
              Search
            </Link>
            <Link
              href={session ? "/add-book" : "/login"}
              className="dropdown_link"
              onClick={() => setToggleDropdown(false)}
            >
              Add Book
            </Link>
            {session && (
              <Link
                href={"/profile"}
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                <span>Welcome, </span>
                <span className="font-semibold capitalize">
                  {session.user.name}
                </span>
              </Link>
            )}
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
    </nav>
  );
}

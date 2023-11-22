"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session, status } = useSession();
  return (
    <section className="relative text-center">
      <img
        src="/hero.webp"
        alt="hero"
        style={{
          height: "calc(100vh - 80px)",
        }}
        className="w-full  object-cover"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold gap-4 flex flex-col justify-center items-center">
        <span>Welcome</span>
        <span>To</span>
        <span>Our Library</span>

        <Link
          href={
            session
              ? session.user?._doc?.role === "librarian"
                ? "add-book"
                : "books"
              : "login"
          }
          className="bg-white text-black px-4 sm:px-7 py-2 rounded-lg"
        >
          Get Started
        </Link>

        {status !== "authenticated" && (
          <>
            <span>OR</span>

            <Link
              href="/books"
              className="bg-white text-black px-4 sm:px-7 py-2 rounded-lg"
            >
              See Our Books
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

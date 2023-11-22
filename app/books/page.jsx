"use client";

import Books from "@/components/Books";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ViewBooks() {
  const { data: session } = useSession();

  if (session && session.user?._doc?.role !== "researchers&students")
    redirect("/profile");

  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/book");
      const data = await res.json();
      setBooks(data);
    })();
  }, []);

  console.log(books);

  return (
    <div>
      <Books books={books} />
    </div>
  );
}

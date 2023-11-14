"use client";

import Books from "@/components/Books";
import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/book");
      const data = await res.json();
      setBooks(data);
    })();
  }, []);
  return (
    <div>
      <h1 className={"text-center text-4xl font-bold my-7"}>
        Welcome to Our Books
      </h1>

      <Books books={books} />
    </div>
  );
}

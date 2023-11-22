"use client";

import Books from "@/components/Books";
import { useEffect, useState } from "react";

export default function ViewBooks() {
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

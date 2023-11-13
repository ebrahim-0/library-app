"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Products() {
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
    <section className="bg-slate-200">
      <div className="w-4/5 mx-auto py-8">
        <h1 className="text-center text-4xl font-bold my-7">Our Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <ProductCardList books={books} />
        </div>
      </div>
    </section>
  );
}

const ProductCardList = ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <ProductCard
          book={book}
          key={Math.round(book._id * Math.random() * 1000)}
        />
      ))}
    </>
  );
};

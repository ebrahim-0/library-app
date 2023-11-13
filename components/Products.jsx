"use client";

import { useEffect, useState } from "react";

export default function Products() {
  const [books, setBooks] = useState([]);

  ("use server");
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
          {books.map((book, i) => (
            <div
              key={Math.round(book._id * Math.random() * 1000) + i}
              className="bg-white p-2 h-full grid rounded-md shadow-2xl"
            >
              <img
                src={book.imageBook}
                alt=""
                className="w-full h-auto rounded-md object-cover"
              />
              <h3 className="my-7 text-xl text-center font-bold">
                {book.name}
              </h3>
              <p className="text-slate-800">{book.description}</p>

              <a href={book.pdfBook} download="your_file_name.pdf">
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

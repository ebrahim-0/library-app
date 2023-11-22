"use client";

import Books from "@/components/Books";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ViewBooks() {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [searchOption, setSearchOption] = useState("name");

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

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  console.log(searchOption);

  const filterBooks = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return books.filter((book) => regex.test(book[searchOption]));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterBooks(e.target.value);
        setSearchedResults(searchResults);
      }, 500),
    );
  };

  console.log(searchedResults);

  return (
    <section className="bg-slate-200">
      <div className="w-4/5 mx-auto py-8">
        <h1 className="text-center text-4xl font-bold my-7">Our Books</h1>

        <div className="w-full border border-gray-200 rounded-md flex items-center shadow-lg mt-16 mx-auto">
          <input
            type="search"
            placeholder="Search for a Book"
            className="w-2/3 py-2.5 font-satoshi pl-5 pr-5 text-sm focus:border-transparent focus:outline-none focus:ring-0 border-none"
            required
            value={searchText}
            onChange={handleSearchChange}
          />
          <div className="border-l border-gray-200"></div>

          <select
            value={searchOption}
            onChange={handleOptionChange}
            className="w-1/3 py-2.5 font-satoshi pl-5 text-sm focus:outline-none focus:ring-0 border-none"
          >
            <option className="py-2" value="name">
              Name
            </option>
            <option className="py-2" value="category">
              Category
            </option>
            <option className="py-2" value="author">
              Author
            </option>
          </select>
        </div>

        {searchText ? (
          <Books books={searchedResults} />
        ) : (
          <Books books={books} />
        )}
      </div>
    </section>
  );
}

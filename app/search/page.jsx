"use client";

import Books from "@/components/Books";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ViewBooks() {
  const { data: session } = useSession();

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchOption, setSearchOption] = useState("name");

  const router = useRouter();

  if (session && session.user?._doc?.role === "librarian") redirect("/profile");

  const handleEdit = (book) => {
    router.push(`/update-book?id=${book._id}`);
  };

  const handleDelete = async (book) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Book?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/book/${book._id.toString()}`, {
          method: "DELETE",
        });

        const filteredBooks = books.filter((item) => item._id !== book._id);

        setBooks(filteredBooks);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const filterBooks = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return books.filter((book) => regex.test(book[searchOption]));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    performSearch(e.target.value);
  };

  const performSearch = (value) => {
    clearTimeout(searchTimeout);
    setSearchText(value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterBooks(value);
        setSearchedResults(searchResults);
      }, 500),
    );
  };

  useEffect(() => {
    performSearch(searchText);
  }, [searchOption, searchText]);

  return (
    <section className="bg-slate-200">
      <div className="w-4/5 mx-auto py-8">
        <h1 className="text-center text-4xl font-bold my-7">Our Books</h1>
        <div className="w-full max-w-3xl bg-white border-2 border-slate-600 rounded-md flex items-center shadow-lg mt-16 mx-auto">
          <input
            type={searchOption === "dateOfPublication" ? "date" : "search"}
            placeholder={
              searchOption === "dateOfPublication"
                ? "Select a date"
                : `Search for a book by ${searchOption}`
            }
            onClick={(e) => {
              if (searchOption === "dateOfPublication") {
                e.target.showPicker();
              }
            }}
            max={new Date().toISOString().split("T")[0]}
            className="w-full placeholder:text-black py-2.5 font-satoshi pl-5 pr-5 text-sm focus:border-transparent focus:outline-none focus:ring-0 border-none"
            required
            value={searchText}
            onChange={handleSearchChange}
          />
          <div className="border h-10 border-slate-600"></div>

          <select
            value={searchOption}
            onChange={handleOptionChange}
            className="w-1/5 p-0 py-2.5 text-black font-satoshi mr-3 text-sm focus:outline-none focus:ring-0 border-none"
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
            <option className="py-2" value="dateOfPublication">
              Publication Date
            </option>
          </select>
        </div>

        {searchText ? (
          <>
            {searchedResults.length > 0 ? (
              <Books
                books={searchedResults}
                handleDelete={
                  session.user?._doc?.role === "Admin" && handleDelete
                }
                handleEdit={session.user?._doc?.role === "Admin" && handleEdit}
              />
            ) : (
              <div className="flex flex-col items-center my-[62px]">
                <p className="text-gray-500 text-2xl font-bold">
                  Oops! No Books Found.
                </p>
                <p className="text-gray-500 mt-2">
                  Please try searching another keyword.
                </p>
              </div>
            )}
          </>
        ) : (
          <Books
            books={books}
            handleDelete={session?.user?._doc?.role === "Admin" && handleDelete}
            handleEdit={session?.user?._doc?.role === "Admin" && handleEdit}
          />
        )}
      </div>
    </section>
  );
}

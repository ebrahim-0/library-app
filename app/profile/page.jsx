"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);

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
    const fetchBooks = async () => {
      const res = await fetch(`/api/users/${session?.user?.sub}/books`);
      const data = await res.json();
      setBooks(data);
    };

    if (session?.user?.sub) fetchBooks();
  }, [session?.user?.sub]);

  console.log(books);

  return (
    <Profile
      name={session?.user.name}
      books={books}
      desc={"My Books"}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

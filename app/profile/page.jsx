"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";
import { redirect, useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [books, setBooks] = useState([]);

  if (status && status === "unauthenticated") redirect("/login");

  if (session && session.user?._doc?.role === "researchers&students")
    redirect("/search");

  console.log(status);

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
    const fetchBooks = async () => {
      const res =
        session?.user?._doc?.role === "Admin"
          ? await fetch("/api/book")
          : await fetch(`/api/users/${session?.user?.sub}/books`);

      const data = await res.json();
      setBooks(data);
    };

    if (session?.user?.sub) fetchBooks();
  }, [session?.user?.sub]);

  return (
    <Profile
      name={session?.user.name}
      books={books}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      des={
        session?.user?._doc?.role === "Admin"
          ? "Admin Have access for all users Books and can edit and delete them"
          : ""
      }
    />
  );
};

export default MyProfile;

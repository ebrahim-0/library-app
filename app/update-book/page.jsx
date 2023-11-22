"use client";

import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateBook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);

  const [book, setBook] = useState({
    name: "",
    description: "",
    author: "",
    dateOfPublication: "",
    category: "",
    imageBook: "",
    pdfBook: "",
  });

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/book/${bookId}`);
      const data = await response.json();
      setBook({
        name: data.name,
        description: data.description,
        author: data.author,
        dateOfPublication: data.dateOfPublication,
        category: data.category,
        imageBook: data.imageBook,
        pdfBook: data.pdfBook,
      });
    };

    if (bookId) getBookDetails();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!bookId) return alert("Book ID not found");

    try {
      const response = await fetch(`/api/book/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: book.name,
          description: book.description,
          author: book.author,
          dateOfPublication: book.dateOfPublication,
          category: book.category,
          imageBook: book.imageBook,
          pdfBook: book.pdfBook,
        }),
      });

      if (response.ok) {
        toast.success("Book Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          router.push("/books");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);

  return (
    <Form
      type={"Update"}
      book={book}
      setBook={setBook}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
}

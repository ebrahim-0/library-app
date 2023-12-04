"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "@uploadthing/react/styles.css";
import Form from "@/components/Form";

export default function AddBook() {
  const { data: session } = useSession();

  const router = useRouter();

  const [book, setBook] = useState({
    name: "",
    description: "",
    author: "",
    dateOfPublication: "",
    category: "",
    imageBook: "",
    pdfBook: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !book.name ||
      !book.imageBook ||
      !book.pdfBook ||
      !book.description ||
      !book.author ||
      !book.dateOfPublication ||
      !book.category
    ) {
      toast.info("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSubmitting(false);
    } else {
      setSubmitting(true);
      try {
        const response = await fetch("/api/book/new", {
          method: "POST",
          body: JSON.stringify({
            name: book.name,
            description: book.description,
            author: book.author,
            dateOfPublication: book.dateOfPublication,
            category: book.category,
            imageBook: book.imageBook,
            pdfBook: book.pdfBook,
            userId: session?.user?._doc?._id,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Book Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            router.push("/search");
          }, 2000);
        } else {
          setSubmitting(false);

          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.log("data", data);
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("error", error);
      }
    }
  };

  return (
    <Form
      type={"Add"}
      book={book}
      setBook={setBook}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
}

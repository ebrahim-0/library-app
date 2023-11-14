"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Image, FileText, Pencil, Plus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "@uploadthing/react/styles.css";

export default function AddBook() {
  const { data: session } = useSession();

  const router = useRouter();

  const [bookImageUrl, setBookImageUrl] = useState("");
  const [bookPdfUrl, setBookPdfUrl] = useState("");
  const { handleSubmit, register } = useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data) {
    data.bookImageUrl = bookImageUrl;
    data.bookPdfUrl = bookPdfUrl;

    if (
      !data.name ||
      !data.bookImageUrl ||
      !data.bookPdfUrl ||
      !data.description
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
            name: data.name,
            description: data.description,
            author: data.author,
            dateOfPublication: data.dateOfPublication,
            category: data.category,
            imageBook: data.bookImageUrl,
            pdfBook: data.bookPdfUrl,
            userId: session?.user?._doc?._id,
          }),
        });

        console.log(response);
        console.log(response.json());

        if (response.ok) {
          toast.success("Book Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            router.push("/books");
          }, 2000);
        } else {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
  }

  return (
    <div className="w-full md:max-w-3xl p-8 my-16 bg-white border border-gray-200 rounded-lg shadow mx-auto">
      <h2 className="text-4xl text-center font-semibold py-8">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Book Name
            </label>
            <div className="mt-2 py-4 border-b-2">
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="Type the Book Name"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Book Description
            </label>
            <div className="mt-2 pb-4 border-b-2">
              <textarea
                {...register("description")}
                name="description"
                id="description"
                autoComplete="given-name"
                className="block w-full h-28 rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="Type the Description of Book"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Author
            </label>
            <div className="mt-2 pb-4 border-b-2">
              <input
                type="text"
                {...register("author")}
                name="author"
                id="author"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="Type the Author of Book"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="dateofpublication"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Date of Publication
            </label>
            <div className="mt-2 pb-4 border-b-2">
              <input
                type="date"
                {...register("dateOfPublication")}
                name="dateOfPublication"
                id="dateofpublication"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                onClick={(e) => e.target.showPicker()}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>{" "}
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Category
            </label>
            <div className="mt-2 pb-4 border-b-2">
              <input
                type="text"
                {...register("category")}
                name="category"
                id="category"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder={"Type the Category of Book"}
              />
            </div>
          </div>
          <div className="col-span-full py-4 border-b-2">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="course-image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Book PDF
              </label>
              {bookPdfUrl && (
                <button
                  onClick={() => setBookPdfUrl("")}
                  type="button"
                  className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change PDF</span>
                </button>
              )}
            </div>
            {bookPdfUrl ? (
              <Link
                className="flex space-x-3 items-center text-purple-600"
                target="_blank"
                href={bookPdfUrl}
              >
                <FileText />
                <span>View PDF</span>
              </Link>
            ) : (
              <UploadDropzone
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  setBookPdfUrl(res[0].fileUrl);
                  // Do something with the response
                  console.log("Files: ", res);

                  toast.success("Upload Completed", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
                onUploadError={(error) => {
                  console.log(error);
                  // Do something with the error.
                  toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
              />
            )}
          </div>
          <div className="col-span-full py-4 border-b-2">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="course-image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Book Image
              </label>
              {bookImageUrl && (
                <button
                  onClick={() => setBookImageUrl("")}
                  type="button"
                  className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change Image</span>
                </button>
              )}
            </div>

            {bookImageUrl ? (
              <Link
                href={bookImageUrl}
                target="_blank"
                className="flex space-x-3 items-center text-purple-600"
              >
                <Image />
                <span>View Image</span>
              </Link>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setBookImageUrl(res[0].fileUrl);
                  // Do something with the response
                  console.log("Files: ", res);
                  toast.success("Upload Completed", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
                onUploadError={(error) => {
                  console.log(error);

                  // Do something with the error.
                  toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
              />
            )}
          </div>
        </div>

        {!submitting ? (
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#007bb6] rounded-lg focus:ring-1 focus:ring-gray-800 hover:bg-[#007bb6]/80"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>Add Book</span>
          </button>
        ) : (
          <div className="inline-flex gap-2 justify-center items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#007bb6] rounded-lg focus:ring-1 focus:ring-gray-800 hover:bg-[#007bb6]/80">
            <Loader2 className={"animate-spin text-white"} />
            <span>Uploading...</span>
          </div>
        )}
      </form>

      <div></div>
      <ToastContainer />
    </div>
  );
}

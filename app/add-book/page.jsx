"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Image, FileText, Pencil, Plus } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function page() {
  const { data: session } = useSession();

  const router = useRouter();

  const [bookImageUrl, setBookImageUrl] = useState("");
  const [bookPdfUrl, setBookPdfUrl] = useState("");
  const { handleSubmit, register } = useForm();
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
    } else {
      try {
        const response = await fetch("/api/book/new", {
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            imageBook: data.bookImageUrl,
            pdfBook: data.bookPdfUrl,
            description: data.description,
            userId: session?.user?._doc?._id,
          }),
        });

        if (response.ok) {
          toast.success("Book Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            router.push("/books");
          }, 2000);
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
                  console.log(res);
                  // Do something with the response
                  console.log("Files: ", res);

                  toast.success("Upload Completed", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
                onUploadError={(error) => {
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
                endpoint="bookImage"
                onClientUploadComplete={(res) => {
                  setBookImageUrl(res[0].fileUrl);
                  // Do something with the response
                  console.log("Files: ", res);
                  toast.success("Upload Completed", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }}
              />
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
              Book Name
            </label>
            <div className="mt-2 pb-4 border-b-2">
              <textarea
                {...register("description")}
                name="description"
                id="description"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="Type the Description of Book"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#007bb6] rounded-lg focus:ring-1 focus:ring-gray-800 hover:bg-[#007bb6]/80"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Add Book</span>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

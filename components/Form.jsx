"use client";

import { FileText, Image, Loader2, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form({
  type,
  book,
  setBook,
  submitting,
  handleSubmit,
}) {
  const { data: session, status } = useSession();

  if (status !== "authenticated") redirect("/login");

  if (session && session.user?._doc?.role === "researchers&students")
    redirect("/search");

  return (
    <div className="w-full md:max-w-3xl p-8 my-16 bg-white border border-gray-200 rounded-lg shadow mx-auto">
      <h2 className="text-4xl text-center font-semibold py-8">{type} Book</h2>
      <form onSubmit={handleSubmit}>
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
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, name: e.target.value }))
                }
                value={book.name}
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
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, description: e.target.value }))
                }
                value={book.description}
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
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, author: e.target.value }))
                }
                value={book.author}
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
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    dateOfPublication: e.target.value,
                  }))
                }
                value={book.dateOfPublication}
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
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, category: e.target.value }))
                }
                value={book.category}
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
              {book?.pdfBook && (
                <button
                  onClick={() => setBook((prev) => ({ ...prev, pdfBook: "" }))}
                  type="button"
                  className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change PDF</span>
                </button>
              )}
            </div>
            {book?.pdfBook ? (
              <Link
                className="flex space-x-3 items-center text-purple-600"
                target="_blank"
                href={book.pdfBook}
              >
                <FileText />
                <span>View PDF</span>
              </Link>
            ) : (
              <UploadDropzone
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  setBook((prev) => ({ ...prev, pdfBook: res[0].fileUrl }));
                  // Do something with the response

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
              {book.imageBook && (
                <button
                  onClick={() =>
                    setBook((prev) => ({ ...prev, imageBook: "" }))
                  }
                  type="button"
                  className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change Image</span>
                </button>
              )}
            </div>

            {book.imageBook ? (
              <Link
                href={book.imageBook}
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
                  setBook((prev) => ({ ...prev, imageBook: res[0].fileUrl }));
                  // Do something with the response
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
        </div>

        {!submitting ? (
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#007bb6] rounded-lg focus:ring-1 focus:ring-gray-800 hover:bg-[#007bb6]/80"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>{type} Book</span>
          </button>
        ) : (
          <div className="inline-flex gap-2 justify-center items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#007bb6] rounded-lg focus:ring-1 focus:ring-gray-800 hover:bg-[#007bb6]/80">
            <Loader2 className={"animate-spin text-white"} />
            <span>{type}ing...</span>
          </div>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}

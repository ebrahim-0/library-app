"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BookCard({ book, handleEdit, handleDelete }) {
  const pathName = usePathname();

  const { data: session, status } = useSession();

  return (
    <div className="bg-white p-4 h-full grid rounded-md shadow-2xl">
      <img
        src={book.imageBook}
        alt={book.name}
        className="w-full h-96 rounded-t-md object-cover"
      />
      <div className="flex flex-col justify-between h-full mt-4 text-left">
        <h3 className="text-lg font-bold text-center">{book.name}</h3>
        <p className="text-gray-500 mt-2">
          <span className="text-gray-700 font-bold">Author:</span> {book.author}
        </p>
        <p className="text-gray-500 mt-2">
          <span className="text-gray-700 font-bold">Publication Date:</span>{" "}
          {book.dateOfPublication}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="text-gray-700 font-bold">Category:</span>{" "}
          {book.category}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="text-gray-700 font-bold">Description:</span>{" "}
          {book.description}
        </p>
        {pathName !== "/profile" && (
          <>
            {status === "authenticated" ? (
              <div className="my-4 mx-auto">
                <a
                  href={book.pdfBook}
                  download={`${book.name}.pdf`}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#007bb6] rounded-full hover:bg-[#007bb6]/80 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Download PDF
                </a>
              </div>
            ) : (
              <div className="my-4 mx-auto">
                <Link
                  href={"/login"}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#007bb6] rounded-full hover:bg-[#007bb6]/80 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Login to download
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {session?.user?.sub === book?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent text-sm cursor-pointer"
            onClick={handleEdit}
          >
            Update
          </p>
          <p
            className="font-medium text-sm bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

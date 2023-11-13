"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const generateDownloadLink = () => {
    if (pdfFile) {
      const downloadLink = `${URL.createObjectURL(pdfFile)}`;
      return downloadLink;
    }
    return null;
  };

  useEffect(() => {
    setPdf(generateDownloadLink());
  }, [pdfFile]);

  const newBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/book/new", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          imageBook: image,
          pdfBook: pdf,
          description: description,
          userId: session?.user._doc?._id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-3 p-8 bg-white shadow-md rounded-md">
      <form onSubmit={newBook} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Book Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
            id="name"
            placeholder="Enter Book Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageBook"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
            id="imageBook"
            accept="image/*"
            onChange={(e) => {
              const ImageLink = `${URL.createObjectURL(e.target.files[0])}`;
              setImage(ImageLink);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pdfBook"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
            id="description"
            placeholder="Enter Description"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

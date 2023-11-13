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
      const downloadLink = URL.createObjectURL(pdfFile);
      return downloadLink;
    }
    return null;
  };

  useEffect(() => {
    setPdf(generateDownloadLink());
  }, [pdfFile]);

  const NewBook = async (e) => {
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
    } finally {
    }
  };

  console.log(name);
  console.log(image);
  console.log(pdf);
  console.log(description);

  return (
    <form onSubmit={NewBook}>
      <div className="form-group">
        <label htmlFor="name">Book Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Book Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageBook">Image</label>
        {/*<input*/}
        {/*  onChange={(e) => setImage(e.target.value)}*/}
        {/*  type="text"*/}
        {/*  className="form-control"*/}
        {/*  id="imageBook"*/}
        {/*  placeholder="Enter Image"*/}
        {/*/>*/}

        <input
          type="file"
          className="form-control"
          id="imageBook"
          placeholder="Enter Image"
          onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pdfBook">PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter Description"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

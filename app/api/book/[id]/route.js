import Book from "@/models/book";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET (Read)
export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const book = await Book.findById(params.id).populate("creator");

    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    return new Response("Failed To Fetch All Books", { status: 500 });
  }
};

// Patch (Update)

export const PATCH = async (request, { params }) => {
  const {
    name,
    imageBook,
    pdfBook,
    description,
    author,
    dateOfPublication,
    category,
  } = await request.json();

  try {
    await connectMongoDB();
    const existingBook = await Book.findById(params.id);

    if (!existingBook) return new Response("Book not found", { status: 404 });

    existingBook.name = name;
    existingBook.imageBook = imageBook;
    existingBook.pdfBook = pdfBook;
    existingBook.description = description;
    existingBook.author = author;
    existingBook.dateOfPublication = dateOfPublication;
    existingBook.category = category;

    await existingBook.save();

    return new Response(JSON.stringify(existingBook), { status: 200 });
  } catch (error) {
    return new Response("Failed To Update Book", { status: 500 });
  }
};

// DELETE (Delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectMongoDB();

    // Find the book by ID and remove it
    await Book.findByIdAndRemove(params.id);

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting book" },
      { status: 500 },
    );
  }
};

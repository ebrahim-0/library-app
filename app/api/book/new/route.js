import { connectMongoDB } from "@/lib/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {
    userId,
    name,
    imageBook,
    pdfBook,
    description,
    author,
    dateOfPublication,
    category,
  } = await req.json();

  try {
    await connectMongoDB();

    await Book.create({
      creator: userId,
      name,
      imageBook,
      pdfBook,
      description,
      author,
      dateOfPublication,
      category,
    });

    return NextResponse.json({ message: "Book created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the book." },
      { status: 500 },
    );
  }
};

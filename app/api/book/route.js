import Book from "@/models/book";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectMongoDB();
    const books = await Book.find({}).populate("creator");

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching all books." },
      { status: 500 },
    );
  }
};

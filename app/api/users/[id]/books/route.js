import Book from "@/models/book";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectMongoDB();

    const books = await Book.find({ creator: params.id }).populate("creator");
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch books" },
      { status: 500 },
    );
  }
};

import Book from "@/models/book";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    await connectMongoDB();

    // Find the prompt by ID and remove it
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

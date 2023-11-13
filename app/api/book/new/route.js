import { connectMongoDB } from "@/lib/mongodb";
import Book from "@/models/book";

export const POST = async (req) => {
  const { userId, name, imageBook, pdfBook, description } = await req.json();

  try {
    await connectMongoDB();
    const newBook = new Book({
      creator: userId,
      name,
      imageBook,
      pdfBook,
      description,
    });

    await newBook.save();
    return new Response(JSON.stringify(newBook), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create prompt", {
      status: 500,
    });
  }
};

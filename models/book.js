import { Schema, model, models } from "mongoose";

const BookSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    imageBook: {
      type: String,
      required: [true, "Image is required"],
    },
    pdfBook: {
      type: String,
      required: [true, "PDF is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    author: {
      type: String,
      required: [true, "Author is required"],
    },
    dateOfPublication: {
      type: String,
      required: [true, "Date of Publication is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  { timestamps: true },
);

const Book = models.book || model("book", BookSchema);

export default Book;

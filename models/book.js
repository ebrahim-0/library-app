import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "name is required"],
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
});

const Book = models.book || model("book", BookSchema);

export default Book;

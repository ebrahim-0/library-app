import BookCard from "@/components/BookCard";

const BookCardList = ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <BookCard
          book={book}
          key={Math.round(book._id * Math.random() * 1000)}
        />
      ))}
    </>
  );
};

const Books = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 my-14">
      <BookCardList books={books} />
    </div>
  );
};

export default Books;

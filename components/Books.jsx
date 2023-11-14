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
    <section className="bg-slate-200">
      <div className="w-4/5 mx-auto py-8">
        <h1 className="text-center text-4xl font-bold my-7">Our Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <BookCardList books={books} />
        </div>
      </div>
    </section>
  );
};

export default Books;

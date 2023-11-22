import BookCard from "@/components/BookCard";

export default function Profile({ books, desc, name, handleDelete }) {
  return (
    <section className="w-4/5 mx-auto py-8">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left">
        <span className="capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {name} Profile
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left">
        {desc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 my-10">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            handleDelete={() => handleDelete && handleDelete(book)}
          />
        ))}
      </div>
    </section>
  );
}

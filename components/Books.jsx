import BookCard from "@/components/BookCard";

const BookCardList = ({ books, handleDelete, handleEdit }) => {
  return (
    <>
      {books.map((book) => (
        <BookCard
          book={book}
          key={book._id}
          handleDelete={() => handleDelete && handleDelete(book)}
          handleEdit={() => handleEdit && handleEdit(book)}
        />
      ))}
    </>
  );
};

const Books = ({ books, handleDelete, handleEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 my-14">
      <BookCardList
        books={books}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Books;

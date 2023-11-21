import getBooks from "@/lib/getBooks";
import Books from "@/components/Books";

const ViewBooks = async () => {
  const books = await getBooks();

  return (
    <div>
      <h1 className={"text-center text-4xl font-bold my-7"}>
        Welcome to Our Books
      </h1>

      <Books books={books} />
    </div>
  );
};

export default ViewBooks;

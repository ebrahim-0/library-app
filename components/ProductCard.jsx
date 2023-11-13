export default function ProductCard({ book }) {
  return (
    <div
      key={Math.round(book._id * Math.random() * 1000)}
      className="bg-white p-2 h-full grid rounded-md shadow-2xl"
    >
      <img
        src={book.imageBook}
        alt=""
        className="w-full h-auto rounded-md object-cover"
      />
      <h3 className="my-7 text-xl text-center font-bold">{book.name}</h3>
      <p className="text-slate-800">{book.description}</p>

      <a href={book.pdfBook} download="your_file_name.pdf">
        Download PDF
      </a>
    </div>
  );
}

"use client";

export default function BookCard({ book }) {
  return (
    <div className="bg-white p-4 h-full grid rounded-md shadow-lg">
      <img
        src={book.imageBook}
        alt={book.name}
        className="w-full h-96 object-cover rounded-t-md"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">{book.name}</h3>
          <p className="text-gray-700 mt-2">{book.description}</p>
        </div>
        <div className="mt-4 mx-auto">
          <a
            href={book.pdfBook}
            download={`${book.name}.pdf`}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#007bb6] rounded-full hover:bg-[#005580] focus:outline-none focus:ring focus:border-blue-300"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

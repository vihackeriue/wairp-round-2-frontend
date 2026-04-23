import React from "react";
import { Link } from "react-router-dom";
import { useList } from "../hooks/useList";

import Pagination from "../components/Pagination";
import { getBooks } from "../services/bookService";
import { FaEdit, FaTrash } from "react-icons/fa";

const BooksList = () => {
  const { data, page, totalPages, setPage } = useList(getBooks);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Books</strong>

      <div className="mt-3">
        <table className="w-full">
          <thead className="bg-gray-800 text-white text-left text-xs">
            <tr>
              <td>No</td>
              <td>Title</td>
              <td>Author</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {data.map((book, index) => (
              <tr key={book.id} className="border-b">
                <td className="px-2 py-1">{(page - 1) * 6 + index + 1}</td>
                <td className="px-2 py-1">{book.name}</td>
                <td className="px-2 py-1">{book.authorName}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {/* Edit */}
                    <button
                      onClick={() => console.log("Edit", book.id)}
                      className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <FaEdit size={14} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => console.log("Delete", book.id)}
                      className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            pagination={{
              page,
              totalPages,
              setPage,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksList;

import React, { useState } from "react";
import { useList } from "../hooks/useList";
import {
  getAuthors,
  updateAuthor,
  deleteAuthor,
} from "../services/authorService";
import Pagination from "../components/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";

const AuthorsList = () => {
  const { data, page, totalPages, setPage, setData } = useList(getAuthors);

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [name, setName] = useState("");

  // ===== EDIT =====
  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setName(author.name);
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (!name.trim()) return;

    const res = await updateAuthor(selectedAuthor.id, { name });

    // update UI ngay không reload
    setData((prev) =>
      prev.map((a) => (a.id === selectedAuthor.id ? { ...a, name } : a)),
    );

    setShowEdit(false);
  };

  // ===== DELETE =====
  const handleDelete = (author) => {
    setSelectedAuthor(author);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    await deleteAuthor(selectedAuthor.id);

    // remove khỏi UI
    setData((prev) => prev.filter((a) => a.id !== selectedAuthor.id));

    setShowDelete(false);
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Authors</strong>

      <div className="mt-3">
        <table className="w-full">
          <thead className="bg-gray-800 text-white text-left text-xs">
            <tr>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Name</td>
              <td className="px-3 py-2">Books</td>
              <td className="px-3 py-2">Action</td>
            </tr>
          </thead>

          <tbody>
            {data?.map((author, index) => (
              <tr key={author.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 text-sm">
                  {(page - 1) * 6 + index + 1}
                </td>

                <td className="px-3 py-2 font-medium">{author.name}</td>

                <td className="px-3 py-2 text-gray-600">{author.booksCount}</td>

                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(author)}
                      className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <FaEdit size={14} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(author)}
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
          <Pagination pagination={{ page, totalPages, setPage }} />
        </div>
      </div>

      {/* ===== MODAL EDIT ===== */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md w-80 shadow">
            <h3 className="mb-3 font-semibold text-lg">Cập nhật Author</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Nhập tên..."
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEdit(false)} className="px-3 py-1">
                Hủy
              </button>

              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL DELETE ===== */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md w-80 shadow">
            <h3 className="mb-3 font-semibold text-lg">Xác nhận xóa</h3>

            <p>
              Bạn có chắc muốn xóa <b>{selectedAuthor?.name}</b>?
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDelete(false)}
                className="px-3 py-1"
              >
                Hủy
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorsList;

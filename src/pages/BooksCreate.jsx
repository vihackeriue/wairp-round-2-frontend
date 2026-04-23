import React, { useState } from "react";
import { createBook } from "../services/bookService";

import { useNavigate } from "react-router-dom";
import { getAuthorsNotPagination } from "../services/authorService";
import { useList } from "../hooks/useList";

const BooksCreate = () => {
  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // load authors
  const { data: authors } = useList(getAuthorsNotPagination);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!name.trim()) {
      setError("Tên sách không được để trống");
      return;
    }

    if (!authorId) {
      setError("Vui lòng chọn tác giả");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createBook({
        name,
        authorId: Number(authorId), // 👈 quan trọng
      });

      navigate("/books");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Thêm Sách</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Tên Sách</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
            placeholder="Nhập tên..."
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Tác giả</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
          >
            <option value="">-- Chọn tác giả --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo Sách"}
        </button>
      </form>
    </div>
  );
};

export default BooksCreate;

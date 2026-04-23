import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import { getBooksNotPagination } from "../services/bookService";
import { createReview } from "../services/reviewService";

const ReviewsCreate = () => {
  const [review, setReview] = useState("");
  const [bookId, setBookId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // load books
  const { data: books } = useList(getBooksNotPagination);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!review.trim()) {
      setError("Nội dung review không được để trống");
      return;
    }

    if (!bookId) {
      setError("Vui lòng chọn sách");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createReview({
        review,
        bookId: Number(bookId),
      });

      navigate("/reviews");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Thêm Review</h2>

      <form onSubmit={handleSubmit}>
        {/* Book */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Chọn Sách</label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
          >
            <option value="">-- Chọn sách --</option>
            {books?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Nội dung Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
            rows={4}
            placeholder="Nhập nội dung review..."
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewsCreate;

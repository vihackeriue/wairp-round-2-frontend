import React, { useState } from "react";
import { createAuthor } from "../services/authorService";
import { useNavigate } from "react-router-dom";

const AuthorsCreate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!name.trim()) {
      setError("Tên không được để trống");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createAuthor({ name });

      // redirect sau khi tạo
      navigate("/authors");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Thêm Author</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Tên Author</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-sm"
            placeholder="Nhập tên..."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo Author"}
        </button>
      </form>
    </div>
  );
};

export default AuthorsCreate;

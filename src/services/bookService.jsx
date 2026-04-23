import { axiosPublic, DEFAULT_LIMIT } from "../api/axios";

export const getBooks = async (page = 1, limit = DEFAULT_LIMIT) => {
  const res = await axiosPublic.get("/books", {
    params: { page, limit },
  });
  return res.data;
};
export const getBooksNotPagination = async () => {
  const response = await axiosPublic.get("/books");
  return response.data;
};
export const createBook = async (payload) => {
  const res = await axiosPublic.post("/books", payload);
  return res.data;
};

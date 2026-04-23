import { axiosPublic, DEFAULT_LIMIT } from "../api/axios";

export const getAuthors = async (page = 1, limit = DEFAULT_LIMIT) => {
  const res = await axiosPublic.get("/authors", {
    params: { page, limit },
  });
  return res.data;
};
export const getAuthorsNotPagination = async () => {
  const response = await axiosPublic.get("/authors");
  return response.data;
};
export const createAuthor = async (payload) => {
  const res = await axiosPublic.post("/authors", payload);
  return res.data;
};

export const updateAuthor = async (id, payload) => {
  const res = await axiosPublic.put(`/authors/${id}`, payload);
  return res.data;
};

export const deleteAuthor = async (id) => {
  const res = await axiosPublic.delete(`/authors/${id}`);
  return res.data;
};

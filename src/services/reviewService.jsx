import { axiosPublic, DEFAULT_LIMIT } from "../api/axios";

export const getReviews = async (page = 1, limit = DEFAULT_LIMIT) => {
  const res = await axiosPublic.get("/reviews", {
    params: { page, limit },
  });
  return res.data;
};
export const createReview = async (payload) => {
  const res = await axiosPublic.post("/reviews", payload);
  return res.data;
};

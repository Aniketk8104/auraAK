import axios from "axios";

// const BASE_URL = "http://52.66.240.31:4000/api";
const BASE_URL = "http://52.66.240.31:4000/api";

export const fetchProtectedData = async (token) => {
  return axios.get(`${BASE_URL}/admin/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSlides = async () => {
  return axios.get(`${BASE_URL}/slideshow`);
};

export const addSlide = async (formData, token) => {
  return axios.post(`${BASE_URL}/slideshow`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSlide = async (id, token) => {
  return axios.delete(`${BASE_URL}/slideshow/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

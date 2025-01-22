import axios from "axios";

export const fetchProtectedData = async (token) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/admin/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSlides = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/slideshow`);
};

export const addSlide = async (formData, token) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/slideshow`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSlide = async (id, token) => {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/slideshow/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

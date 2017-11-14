import axios from "axios";

export const login = credentials => {
  return axios.post("/api/auth/login", credentials);
};

export const resetPasswordRequest = email => {
  return axios.post("/api/auth/resetPasswordRequest", email);
};

export const resetPassword = data => {
  return axios.post("/api/auth/resetPassword", data);
};

export const logout = () => {
  return axios.post("/api/auth/logout");
};

export const isLoggedIn = email => {
  return axios.post("/api/auth/isLoggedIn", { email });
};

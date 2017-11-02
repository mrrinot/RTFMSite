import axios from "axios";

export const login = credentials => {
  return axios.post("/api/login", credentials);
};

export const resetPasswordRequest = email => {
  return axios.post("/api/login/resetPasswordRequest", email);
};

export const resetPassword = data => {
  return axios.post("/api/login/resetPassword", data);
};

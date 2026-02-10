import api from "../api/api";

export const login = async (username: string, password: string) => {
  const response = await api.post("auth/login/", { username, password });
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await api.post("auth/register/", {
    username,
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

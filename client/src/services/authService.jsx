import API from "./api";

export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");
  return data;
};
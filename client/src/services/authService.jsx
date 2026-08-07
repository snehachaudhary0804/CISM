import API from "./api";

export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");
  return data;
};
export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};
export const updateProfile = async (profileData) => {
  const { data } = await API.patch("/auth/profile", profileData);

  return data;
};
export const changePassword = async (passwordData) => {
  const { data } = await API.patch("/auth/change-password", passwordData);

  return data;
};

import api from "./api";


export const getStudentDashboard = async () => {

  const response = await api.get(
    "/student/dashboard"
  );

  return response.data;

};


export const getMyInternships = async () => {
  const response = await api.get("/internships/my-internship");
  return response.data;
};
export const getStudentInternships = async () => {
  const response = await api.get("/internships/my-internship");
  return response.data;
};
export const uploadOfferLetter = async (internshipId, formData) => {
  const response = await api.patch(
    `/internships/${internshipId}/offer-letter`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const uploadCompletionDocument = async (
  internshipId,
  formData
) => {

  const { data } = await api.patch(
    `/internships/${internshipId}/completion-document`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
export const getMyNotifications = async()=>{
   const res = await api.get("/notifications/my");

   return res.data.data;
};

export const markNotificationRead = async (id) => {
  const { data } = await api.patch(`/notification/read/${id}`);
  return data;
};
import api from "./api";

// Dashboard
export const getTeacherDashboard = async () => {
  const res = await api.get("/teacher/dashboard");
  return res.data;
};

// Assigned internships
export const getTeacherInternships = async () => {
  const response = await api.get("/teacher/internships");

  return response.data;
};

// Approve internship
export const approveInternship = async (internshipId) => {
  const res = await api.patch(`/teacher/internship/${internshipId}/approve`);
  return res.data;
};

// Reject internship
export const rejectInternship = async (internshipId, remarks) => {
  const res = await api.patch(`/teacher/internship/${internshipId}/reject`, {
    remarks,
  });
  return res.data;
};
export const generateNOCRequest = async (internship, student) => {
  const response = await api.post("/nocs", {
    internship,
    student,
  });

  return response.data;
};

export const approveReview = async (internshipId, remarks) => {
  const response = await api.patch(`/teacher/review/${internshipId}/approve`, {
    remarks,
  });

  return response.data;
};

export const rejectReview = async (internshipId, remarks) => {
  const response = await api.patch(`/teacher/review/${internshipId}/reject`, {
    remarks,
  });

  return response.data;
};

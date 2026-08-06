
import api from "./api";

// Get Students
export const getAllStudents = async (params = {}) => {
  const response = await api.get("/admin/students", { params });
  return response.data;
};

// Get Single Student
export const getStudentById = async (id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

// Update Student
export const updateStudent = async (id, data) => {
  const response = await api.put(`/admin/students/${id}`, data);
  return response.data;
};

// Delete Student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/admin/students/${id}`);
  return response.data;
};





//teachers
export const getAllTeachers = async () => {
  const response = await api.get("/admin/teachers");
  return response.data;
};
export const updateTeacher = async (id, data) => {
  const response = await api.put(`/admin/teachers/${id}`, data);
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await api.delete(`/admin/teachers/${id}`);
  return response.data;
};

export const registerTeacher = async (data) => {
  const response = await api.post("/auth/register", {
    ...data,
    role: "teacher",
  });

  return response.data;
};


export const assignTeacher = async (data) => {
  const response = await api.post("/admin/assign-teacher", data);
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};



export const getAllSections = async () => {
  const response = await api.get("/sections");
  return response.data;
};

export const getAllAcademicSessions = async () => {
  const response = await api.get("/academic-sessions");
  return response.data;
};

// ================= Internship =================

export const getAllInternships = async () => {
  const response = await api.get("/admin/internships");
  return response.data;
};

export const approveInternship = async (id) => {
  const response = await api.patch(
    `/admin/internships/${id}/approve`
  );

  return response.data;
};

export const rejectInternship = async (
  internshipId,
  remarks
) => {
  const response = await api.patch(
    `/admin/internships/${internshipId}/reject`,
    { remarks }
  );

  return response.data;
};
export const completeInternship = async (internshipId) => {
  const response = await api.put(
    `/admin/internship/${internshipId}/complete`
  );

  return response.data;
};
export const getAllDepartments = async () => {
  const response = await api.get(
    
    "/departments"
  );

  return response.data;
};
export const generateNOC = async (data) => {
  console.log("Generate NOC Payload:", data);

  const response = await api.post("/nocs", data);

  return response.data;
};
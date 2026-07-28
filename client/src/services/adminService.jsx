import API from "./api";

// Students
export const getAllStudents = async () => {
  const response = await API.get("/admin/students");
  return response.data;
};
export const getAllTeachers =async () =>{
  const response=await API.get("/admin/teachers");
  return response.data;
}
export const getStudentById = async (id) => {
  const response = await API.get(`/admin/student/${id}`);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await API.put(`/admin/student/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/admin/student/${id}`);
  return response.data;
};


export const assignTeacher = async (data) => {
  const response = await API.post("/admin/assign-teacher", data);
  return response.data;
};

export const getDashboardData = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const getAllDepartments = async () => {
  const response = await API.get("/departments");
  return response.data;
};

export const getAllSections = async () => {
  const response = await API.get("/sections");
  return response.data;
};

export const getAllAcademicSessions = async () => {
  const response = await API.get("/academic-sessions");
  return response.data;
};


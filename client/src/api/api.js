import axios from "axios";

export const getStaffRequest = async () =>
  await axios.get(`${import.meta.env.VITE_SERVER_URL}/budget/staff`);

export const addPositionRequest = async (staff) =>
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/budget/staff/add`, staff);

export const updatePositionRequest = async (staff, id) =>
  await axios.put(`${import.meta.env.VITE_SERVER_URL}/budget/staff/edit/${id}`, staff);

export const deletePositionRequest = async (id) =>
  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/budget/staff/delete/${id}`);

export const downloadBudgetStaff = async () => 
await axios.get(`${import.meta.env.VITE_SERVER_URL}/budget/staff/download` ,{
  responseType: "arraybuffer"
});
// export const addPositionRequestMicroservice = async () =>
// await axios.post("/subirArchivos", Formdata);
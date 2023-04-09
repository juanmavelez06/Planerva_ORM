import axios from "axios";

export const getStaffRequest = async () =>
  await axios.get("http://localhost:3000/budget/staff");

export const addPositionRequest = async (staff) =>
  await axios.post("http://localhost:3000/budget/staff/add", staff);

export const updatePositionRequest = async (staff, id) =>
  await axios.put(`http://localhost:3000/budget/staff/edit/${id}`, staff);

export const deletePositionRequest = async (id) =>
  await axios.delete(`http://localhost:3000/budget/staff/delete/${id}`);

// export const addPositionRequestMicroservice = async () =>
// await axios.post("/subirArchivos", Formdata);
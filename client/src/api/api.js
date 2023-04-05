import axios from "axios";

export const getStaffRequest = async () =>
  await axios.get("http://localhost:3000/budget/staff");

export const addPositionRequest = async (staff) =>
  await axios.post("http://localhost:3000/budget/staff/add", staff);

export const updatePosition = async (staff) =>
  await axios.put("http://localhost:3000/budget/staff/put/id", staff);

export const deletePositionRequest = async (id) =>
  await axios.delete(`http://localhost:3000/budget/staff/delete/${id}`);

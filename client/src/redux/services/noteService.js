import axios from "axios";
const API_URL = "/api/note";
const getNotes = async (config) => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createNote = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};

const updateNote = async (row, config) => {
  const response = await axios.put(`${API_URL}/${row.id}`, row, config);
  return await response.data;
};

const reportService = {
  createNote,
  getNotes,
  updateNote,
};
export default reportService;

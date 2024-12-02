import axios from "axios";
const API_URL = "/api/knight";
const getKnights = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getKnight = async (config) => {
  const response = await axios.get(`${API_URL}`, config);
  return await response.data;
};
const createKnight = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteKnight = async (config) => {
  const response = await axios.delete(`${API_URL}`, config);
  return await response.data;
};
const updateKnight = async (row, config) => {
  const response = await axios.put(`${API_URL}`, row, config);
  return await response.data;
};

const reportService = {
  createKnight,
  getKnight,
  deleteKnight,
  updateKnight,
};
export default reportService;

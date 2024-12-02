import axios from "axios";
const API_URL = "/api/race";
const getRaces = async (config) => {
  const response = await axios.get(API_URL, config);
  return response.data;
};
const getRace = async (id, config) => {
  const response = await axios.get(`${API_URL}/${id}`, config);
  return await response.data;
};
const createRace = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteRace = async (id, config) => {
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return await response.data;
};
const updateRace = async (row, config) => {
  const response = await axios.put(`${API_URL}/${row.id}`, row, config);
  return await response.data;
};

const reportService = {
  createRace,
  getRace,
  deleteRace,
  updateRace,
  getRaces,
};
export default reportService;

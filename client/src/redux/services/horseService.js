import axios from "axios";
const API_URL = "/api/horse";
const getHorses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getHorse = async (config) => {
  const response = await axios.get(`${API_URL}`, config);
  return await response.data;
};
const createHorse = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteHorse = async (id, config) => {
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return await response.data;
};
const updateHorse = async (row, config) => {
  const response = await axios.put(`${API_URL}/${row.id}`, row, config);
  return await response.data;
};

const reportService = {
  createHorse,
  getHorse,
  deleteHorse,
  updateHorse,
};
export default reportService;

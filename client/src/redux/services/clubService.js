import axios from "axios";
const API_URL = "/api/club";
const getClubs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const getClub = async (config) => {
  const response = await axios.get(`${API_URL}`, config);
  return await response.data;
};
const createClub = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteClub = async (config) => {
  const response = await axios.delete(`${API_URL}`, config);
  return await response.data;
};
const updateClub = async (row, config) => {
  const response = await axios.put(`${API_URL}`, row, config);
  return await response.data;
};

const reportService = {
  createClub,
  getClub,
  deleteClub,
  updateClub,
};
export default reportService;

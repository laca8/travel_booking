import axios from "axios";
const API_URL = "/api/train";
const getTrains = async (keyword, config) => {
  const response = await axios.get(`${API_URL}?keyword=${keyword}`, config);
  return response.data;
};
const getTrain = async (id, config) => {
  const response = await axios.get(`${API_URL}/${id}`, config);
  return await response.data;
};
const createTrain = async (row, config) => {
  const response = await axios.post(API_URL, row, config);
  return await response.data;
};
const deleteTrain = async (id, config) => {
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return await response.data;
};
const updateTrain = async (row, config) => {
  const response = await axios.put(`${API_URL}/${row.id}`, row, config);
  return await response.data;
};

const reportService = {
  createTrain,
  getTrain,
  deleteTrain,
  updateTrain,
  getTrains,
};
export default reportService;

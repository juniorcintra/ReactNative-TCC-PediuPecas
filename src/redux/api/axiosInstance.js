import axios from 'axios';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const axiosInstance = axios.create({
  baseURL: 'https://pediupecas-api.herokuapp.com',
  // baseURL: 'http://192.168.0.112:3333',
});

export default axiosInstance;

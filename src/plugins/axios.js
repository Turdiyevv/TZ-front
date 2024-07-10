import axios from 'axios';
export const baseURL = `http://localhost:3000/api/data`;

const http = axios.create({
  baseURL: baseURL
});

export default http;

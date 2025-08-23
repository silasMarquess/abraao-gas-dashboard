import axios from "axios";

console.log(process.env.NEXT_PUBLIC_DOMAIN_URL);

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

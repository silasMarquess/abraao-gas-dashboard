import axios from "axios";

export const axiosInstanceFile = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

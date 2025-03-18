/* eslint-disable no-useless-catch */
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getRequest = async (url: string) => {
  try {
    const response = await axios.get(`${baseURL}${url}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
import axios from "axios";
import { API_URL } from "../contants/config";

export const api = axios.create({
  baseURL: API_URL,
});

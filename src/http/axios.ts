import axios from "axios";

const $client = axios.create({
  baseURL: "https://dummyjson.com",
  withCredentials: false, 
});

export default $client;

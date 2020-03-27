import axios from "axios";
import { URL } from "../config/settings";

export const getUserById = async id => {
  let url = URL + "api/users/" + id;
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  console.info("API - GET USER");
  return response.data.success;
};

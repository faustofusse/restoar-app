import axios from "axios";
import { URL } from "../config/settings";
import jwt_decode from "jwt-decode";

export const login = async (email, password) => {
  let response = await axios.post(URL + "api/users/login", { email, password });
  if (response.data.error) return console.log("Error: " + response.data.error);;
  let token = response.data.success;
  let user = jwt_decode(token);
  return user;
};

export const register = async (shit) => {}

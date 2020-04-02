import axios from "axios";
import { URL } from "../config/settings";

export const getTablesByRestaurant = async restaurant => {
  let url = URL + 'api/tables/restaurant/' + restaurant;
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  console.log("API - GET TABLES");
  return response.data.success;
}

export const getOrdersByRestaurant = async restaurant => {
  let url = URL + 'api/orders/resto/' + restaurant;
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  console.log("API - GET ORDERS");
  return response.data.success;
}

export const getExtendedUser = async id => {
  let url = URL + 'api/users/' + id + '/extended'
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  console.log("API - GET USER EXTENDED");
  return response.data.success;
}

export const getUserById = async id => {
  let url = URL + "api/users/" + id;
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  console.log("API - GET USER");
  return response.data.success;
};

export const getMenuByRestaurant = async restaurant => {
  let url = URL + "api/restaurant/" + restaurant + "/menu";
  let response = await axios.get(url);
  if (response.data.error) return console.log(response.data.error);
  return response.data.success;
};

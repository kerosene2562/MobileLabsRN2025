import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = axios.create({
  baseURL: "https://itslab7-default-rtdb.europe-west1.firebasedatabase.app/",
});

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.params = { ...(config.params || {}), auth: token };
  }
  return config;
}, (error) => Promise.reject(error));

export default client;
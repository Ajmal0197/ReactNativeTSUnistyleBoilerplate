import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const SOCKET_URL =
  Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000";


export const EMAIL_LOGIN = `${BASE_URL}/auth/login`;
export const REFRESH_TOKEN = `${BASE_URL}/auth/refresh-token`;
export const REGISTER = `${BASE_URL}/auth/register`;

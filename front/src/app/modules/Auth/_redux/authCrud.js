import axios from "axios";

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
export const REGISTER_URL = "http://localhost:4000/api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export function login(email, password) {
  return axios.post('http://localhost:4000/api/auth/login', { email, password })
}

export function register(email, username, password) {
  // export function register(email, fullname, username, password) {
  // return axios.post(REGISTER_URL, { email, fullname, username, password });
  return axios.post(REGISTER_URL, { email, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  return axios.get('http://localhost:4000/api/users/me',{
    headers: {'x-auth-token': localStorage.getItem('authToken')}
  }); // until Deal with Eng Karim .. 
}

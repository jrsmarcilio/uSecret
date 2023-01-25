import axios, { AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const api = axios.create({
  baseURL: "http://localhost:3334/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get('SESSION_TOKEN')}`
  },
});

const apiUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  params: {
    client_id: serverRuntimeConfig.UNSPLASH_ACCESS_KEY
  }
});

export { api, apiUnsplash };
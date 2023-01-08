import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const api = axios.create({
  baseURL: "http://localhost:3333/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

console.log('api params', process.env.UNSPLASH_ACCESS_KEY);

const apiUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  params: {
    client_id: serverRuntimeConfig.UNSPLASH_ACCESS_KEY
  }
});

console.log('apiUnsplash params', apiUnsplash.defaults.params);

export { api, apiUnsplash };
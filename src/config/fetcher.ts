import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/conversion/v1/',
});

export const fetcher = (url: string) => api.get(url)
    .then((res) => res.data);

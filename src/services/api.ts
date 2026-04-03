import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const createApi = (repositoryId?: number) => {
    const basePath = repositoryId
        ? `/api/v1/github/repositories/${repositoryId}`
        : `/api/v1/github/repositories`;

    return axios.create({
        baseURL: serverUrl + basePath,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
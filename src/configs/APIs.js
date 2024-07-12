import axios from 'axios';

// const BASE_URL = 'https://baotrinh.pythonanywhere.com/';
const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {
    'jobs': (pageNum) => `/job/?page=${pageNum}`,
    'user' : `/users/`
};

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});

export const fetchPopularJobs = async (pageNum = 1) => {
    try {
        const response = await APIs.get(endpoints.jobs(pageNum));
        return response.data;
    } catch (error) {
        console.error('Error fetching popular jobs:', error);
        throw error;
    }
};

export default APIs;

import axios from 'axios';

const BASE_URL = 'https://baotrinh.pythonanywhere.com';
// const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {
    'jobs': (pageNum) => `/jobs/?page=${pageNum}`,
    'job_detail': (id) => `/jobs/${id}/`,  
    'users' : `/users/`,
    'companytypes': `/companytypes/`,
    'popular_jobs': (pageNum) => `/jobs/popular/?page=${pageNum}`,
};

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});

//ds công việc
export const fetchAllJob = async (pageNum = 1) => {
    try {
        const response = await APIs.get(endpoints['jobs'](pageNum));
        return response.data;
    } catch (error) {
        console.error('Error fetching popular jobs:', error);
        throw error;
    }
};

export const fetchPopularJob = async (pageNum = 1) => {
    try {
        const response = await APIs.get(endpoints['popular_jobs'](pageNum));
        return response.data;
    } catch (error) {
        console.error('Error fetching popular job:', error);
        throw error;
    }
  };

//Chi tiết danh sách công việc 
export const fetchJobDetail = (id) => {
    return APIs.get(endpoints['job_detail'](id));
}

export default APIs;
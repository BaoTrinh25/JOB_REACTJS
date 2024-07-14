import axios from 'axios';

const BASE_URL = 'https://baotrinh.pythonanywhere.com';
// const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {
    'alljob': (pageNum) => `/jobs/?page=${pageNum}`,
    'jobs': `/jobs/`,
    'job_detail': (id) => `/jobs/${id}/`,  
    'users' : `/users/`,
    'employmenttypes': `/employmenttypes/`,
    'popular_jobs': (pageNum) => `/jobs/popular/?page=${pageNum}`,
    'register': '/users/',
    'login': '/o/token/', 
    'current-user': '/users/current-user/', 
};

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});

//ds công việc mới nhất giảm dần theo ngày tạo(or id)
export const fetchAllJob = async (pageNum = 1) => {
    try {
        const response = await APIs.get(endpoints['alljob'](pageNum));
        return response.data;
    } catch (error) {
        console.error('Error fetching all job:', error);
        throw error;
    }
};

//ds công việc phổ biến giảm dần theo số lượt apply
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

//Xác thực người dùng 
export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }

export default APIs;
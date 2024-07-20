import axios from 'axios';

const BASE_URL = 'https://baotrinh.pythonanywhere.com';
// const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {
    'current_user': `/users/current-user/`, 
    'users' : `/users/`,
    'register': `/users/`,
    'login': `/o/token/`, 
    'patch_user': `/users/patch-current-user/`,
    'put_jobSeeker': (id) => `/jobSeeker/${id}/`,

    'alljob': (pageNum) => `/jobs/?page=${pageNum}`,
    'jobs_popular': (pageNum) => `/jobs/popular/?page=${pageNum}`,
    'job_detail': (id) => `/jobs/${id}/`,  
    'employmenttypes': `/employmenttypes/`,
 
    // 'company': (id) => `/companies/${id}/`,
    // 'careers': `/careers/`,
    'job_application': (id) => `/jobs/${id}/apply/`,
    //ds các ứng viên đã ứng tuyển vào 1 bài tuyển dụng
    'jobSeeker_applied': (id) => `/jobs/${id}/list_apply/`,
    
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
        const response = await APIs.get(endpoints['jobs_popular'](pageNum));
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
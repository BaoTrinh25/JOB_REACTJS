import axios from 'axios';

export const BASE_URL = 'https://baotrinh.pythonanywhere.com';
// export const BASE_URL = 'http://127.0.0.1:8000';

export const endpoints = {
    'current_user': `/users/current-user/`, 
    'users' : `/users/`,
    'register_user': `/users/`,
    'register_jobseeker': (userId) => `/users/${userId}/create_applicant/`,
    'register_company': (userId) => `/users/${userId}/create_employer/`,
    'login': `/o/token/`, 
    'patch_user': `/users/patch-current-user/`,
    'put_jobSeeker': (id) => `/jobSeeker/${id}/`,
    'patch_company': (id) => `/companies/${id}/`,
    'delete_user': (id) => `/users/${id}/delete-account/`,
    'login_google': `/users/google-login/`,

    'alljob': (pageNum) => `/jobs/?page=${pageNum}`,
    'alljobs': `/jobs/`,
    'jobs_popular': (pageNum) => `/jobs/popular/?page=${pageNum}`,
    'job_detail': (id) => `/jobs/${id}/`,  
    
    'employmenttypes': `/employmenttypes/`,
    'careers': `/careers/`,
    'areas': `/areas/`,
    'skills': `/skills/`,

    'apply_job': (id) => `/jobs/${id}/apply/`, //ứng tuyển việc làm
    'job_applied': `/jobseeker/list_job_apply/`, //danh sách việc làm đã apply của ứng viên
    'rating' : (id) => `/jobs/${id}/ratings/`,
    'delete_rating': (id, rating_id) => `/jobs/${id}/ratings/${rating_id}/delete/`,
    'patch_rating':(id, rating_id) => `/jobs/${id}/ratings/${rating_id}/partial-update/`,
    'like': (id) => `/jobs/${id}/like/`,
    'check_liked': (id) => `/jobs/${id}/check_liked/`,
    'liked_job': (pageNum) => `/jobs/get_liked_job/?page=${pageNum}`,
 
    'companies': `/companies/`,
    // 'company': (id) => `/companies/${id}/`,
    'post_recruitment': `/jobs/`,
    'jobSeeker_applied': (id) => `/jobs/${id}/list_apply/`,   //ds các ứng viên đã ứng tuyển vào 1 bài tuyển dụng
    'update_status': (id, application_id) => `/jobs/${id}/applications/${application_id}/partial-update/`, //cập nhật đơn ứng tuyển(trạng thái)
    'job_posted': `/companies/list_job/`, //danh sách các job đã đăng
    'num_application': (id) => `/jobs/${id}/num_applications/`, 
    'update_info_job': (id) => `/jobs/${id}/`,
    'delete_job':(id) => `/jobs/${id}/`,
    'active_job': (id) => `/jobs/${id}/toggle_active/`,
    'invoice_history': `/invoices/`,
};

export const GET_INVOICE_DETAILS = (sessionId) => `${BASE_URL}/payment_success/?session_id=${sessionId}`;

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});


export const fetchAllJob = async (pageNum = 1, keyword = '', location = '', career='') => {
    try {
        const response = await APIs.get(endpoints['alljob'](pageNum), {
            params: {
                title: keyword,
                location: location,
                career: career,
            }
        });
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
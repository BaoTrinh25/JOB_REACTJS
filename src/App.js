import React, { useEffect, useReducer, useContext } from "react";
import { MyUserContext, MyDispatchContext } from "./configs/Context";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './index.css';
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from './pages/User/Login';
import Register from './pages/User/Register/Register';
import RegisterApplicant from "./pages/User/Register/RegisterApplicant";
import RegisterEmployer from "./pages/User/Register/RegisterEmployer";
import Home from "./pages/Home/Home";
import AllJobLatest from './pages/Home/AllJobLatest';
import AllJobPopular from './pages/Home/AllJobPopular';
import JobDetail from './pages/Home/JobDetail';
import ProfileApplicant from './pages/User/JobSeeker/ProfileApplicant';
import ProfileEmployer from './pages/User/Company/ProfileEmployer';
import UpdateProfileUser from './pages/User/UpdateProfileUser';
import UpdateInfoApplicant from './pages/User/JobSeeker/UpdateInfoApplicant';
import JobApplication from './pages/User/JobSeeker/JobApplication';
import UpdateInfoProfileEmployer from './pages/User/Company/UpdateInfoEmployer';
import PostRecruitment from './pages/User/Company/PostRecruitment';
import ListPosted from './pages/User/Company/ListPosted';
import ListJobApplied from './pages/User/JobSeeker/ListJobApplied';
import ListJobLiked from './pages/User/JobSeeker/ListJobLiked';
import MyUserReducer from './configs/Reducers';
import JobApplicantsList from "./pages/User/Company/JobApplicantsList";
import UpdatePostRecruitment from './pages/User/Company/UpdatePostRecruitment';
import JobPostingPackages from "./pages/User/Company/JobPostingPackages ";
import PaymentSuccess from "./pages/User/Company/PaymentSuccess";
import InvoiceHistory from "./pages/User/Company/InvoiceHistory";

const noHeaderFooterRoutes = ['/login', '/register', '/job-posted', '/job-applied', '/liked-job', '/post-recruitment', '/update-post-recruitment', '/checkout'];
const clientId = '611474340578-ilfvgku96p9c6iim54le53pnhimvi8bv.apps.googleusercontent.com';

function AppLayout() {
  const location = useLocation();
  const showHeaderFooter = !noHeaderFooterRoutes.some(route => location.pathname.startsWith(route));
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const loggedIn = window.localStorage.getItem("isLoggedIn"); //kiểm tra trạng thái login
  const storedUser = window.localStorage.getItem('user'); //lấy thông tin user
  const nav = useNavigate();

  useEffect(() => {
    if (loggedIn && storedUser) {
      dispatch({
        type: 'login',
        payload: JSON.parse(storedUser) // Khôi phục thông tin user từ localStorage
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className={`flex-grow ${showHeaderFooter ? 'mt-16' : ''}`}>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-applicant/:userId" element={<RegisterApplicant />} />
          <Route path="/register-employer/:userId" element={<RegisterEmployer />} />
          <Route path="/jobs" element={<AllJobLatest />} />
          <Route path="/jobs-popular" element={<AllJobPopular />} />
          <Route path="/job-detail/:jobId" element={<JobDetail />} />

          {/* Routes for company users */}
          {user?.role === 1 && (
            <>
              <Route path='/employer-profile' exact element={< ProfileEmployer /> } />
              <Route path='/updateProfile-employer' element={<UpdateInfoProfileEmployer />} />
              <Route path='/post-recruitment' element={<PostRecruitment />} />
              <Route path='/job-posted' element={<ListPosted />} />
              <Route path='/jobapplicants-list/:jobId' element={<JobApplicantsList />} />
              <Route path='/update-post-recruitment/:jobId' element={<UpdatePostRecruitment />} />
              <Route path='/updateProfile-user' element={<UpdateProfileUser />} />
              <Route path='/package' element={<JobPostingPackages />} />
              <Route path='/payment_success' element={<PaymentSuccess />} />
              <Route path='/checkout' element={<InvoiceHistory />} />
            </>
          )}
          {user?.role === 0 && (
            <>
              <Route path='/updateProfile-user' element={<UpdateProfileUser />} />
              <Route path='/job-applied' element={<ListJobApplied />} />
              <Route path='/applicant-profile' element={<ProfileApplicant /> } />
              <Route path='/updateProfile-appplicant' element={<UpdateInfoApplicant />} />
              <Route path='/jobApplication/:jobId' element={<JobApplication />} />
              <Route path='/liked-job' element={<ListJobLiked />} />
            </>
          )}

          <Route path="*" element={<div className="text-xl mt-10 ml-10">404 Not Found </div>} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function MyTab() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <AppLayout />
      </GoogleOAuthProvider>
    </Router>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <MyTab />
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;
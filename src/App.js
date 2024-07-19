import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyDispatchContext, MyUserContext } from './configs/Context';
import MyUserReducer from './configs/Reducers';
import {useReducer } from 'react';
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
import About from './pages/Home/About';
import JobDetail from './pages/Home/JobDetail';
import ProfileApplicant from './pages/User/JobSeeker/ProfileApplicant';
import ProfileEmployer from './pages/User/Company/ProfileEmployer';
import UpdateProfileUser from './pages/User/UpdateProfileUser';
import UpdateInfoApplicant from './pages/User/JobSeeker/UpdateInfoApplicant';


function MyTab() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="19411555949-o6cesuh7bg7rl8u06v5679ldjssbeg59.apps.googleusercontent.com">
        <div>
          <Header />
          <main className="flex-grow mt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-applicant" element={<RegisterApplicant />} />
              <Route path="/register-employer" element={<RegisterEmployer />} />
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<AllJobLatest />} />
              <Route path="/jobs-popular" element={<AllJobPopular />} />
              <Route path="/about" element={<About />} />
              <Route path="/job-detail/:jobId" element={<JobDetail />} />
              <Route path='/employer-profile' element={<ProfileEmployer />}/>
              <Route path='/applicant-profile' element={<ProfileApplicant />}/>
              <Route path='/updateProfile-appplicant' element={<UpdateInfoApplicant />}/>
              <Route path='/updateProfile-user' element={<UpdateProfileUser />}/>

              <Route path="*" element={() => <div>404 Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
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
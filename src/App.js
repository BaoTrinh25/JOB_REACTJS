import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyDispatchContext, MyUserContext } from './configs/Context';
import MyUserReducer from './configs/Reducers';
import {useReducer } from 'react';
import './index.css'; 
import Header from "./component/Hearder";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import RegisterApplicant from "./pages/Register/RegisterApplicant";
import RegisterEmployer from "./pages/Register/RegisterEmployer";
import Home from "./pages/Home";
import AllJobLatest from './pages/AllJobLatest';
import AllJobPopular from './pages/AllJobPopular';
import About from './pages/About';
import JobDetail from './pages/JobDetail';
import ProfileEmployer from './pages/Company/ProfileEmployer';
import EditInfoHiring from './pages/Company/Edit_InfoHiring';


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
              <Route path='/edit-infoHiring' element={<EditInfoHiring />}/>

              <Route path="*" component={() => <div>404 Not Found</div>} />
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
}

export default App;
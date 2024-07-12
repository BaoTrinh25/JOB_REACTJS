import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; 
import Header from "./component/Hearder";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import RegisterApplicant from "./pages/Register/RegisterApplicant";
import RegisterEmployer from "./pages/Register/RegisterEmployer";
import Home from "./pages/Home";
import JobList from './pages/JobList';

function App() {

  return (
    <Router>
      <GoogleOAuthProvider clientId="19411555949-o6cesuh7bg7rl8u06v5679ldjssbeg59.apps.googleusercontent.com">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-applicant" element={<RegisterApplicant />} />
              <Route path="/register-employer" element={<RegisterEmployer />} />
              <Route path="/" element={<Home />} />
              <Route path="jobs" element={<JobList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
import React, { useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints, authApi } from '../../configs/APIs';
import cookie from 'react-cookies';
import { MyDispatchContext } from '../../configs/Context';

const LoginGG = () => {
    const nav = useNavigate();
    const dispatch = useContext(MyDispatchContext);
    const handleLoginSuccess = async (response) => {
        try {
            const id_token  = response.credential;
            console.log('Google login response:', response);
            if (!id_token) {
                throw new Error('Không tìm thấy mã xác thực trong phản hồi từ Google');
            }

            const res = await APIs.post(endpoints["login_google"], {
                id_token: id_token 
            });
            
            if (res.status === 200) {
                const { token } = res.data;
                cookie.save('token', token.access_token);
                let user = await authApi(token.access_token).get(endpoints["current_user"]);
                cookie.save('user', user.data);
                console.log("userdata", user.data);
                dispatch(
                    {
                      "type": "login",
                      "payload": user.data
                    });
                
                alert("Đăng nhập thành công");
                nav("/applicant-profile");
            } else {
                throw new Error('Đăng nhập không thành công');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert(`Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.\nDetails: ${error.message}`);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Login failed:', error);
        alert("Google login failed");
    };

    return (
        <GoogleOAuthProvider clientId='611474340578-ilfvgku96p9c6iim54le53pnhimvi8bv.apps.googleusercontent.com'>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                shape="circle"
                size="large"
                text="signin_with"
                width="250"
            />
        </GoogleOAuthProvider>
    );
};

export default LoginGG;
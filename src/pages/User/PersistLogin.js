// import React, { useEffect } from 'react';
// import useRefreshToken from '../../configs/useRefreshToken';

// const PersistLogin = () => {
//     const { isRefreshing, refresh } = useRefreshToken();

//     useEffect(() => {
//         const refreshToken = async () => {
//             try {
//                 await refresh();
//             } catch (error) {
//                 console.error('Error refreshing token:', error);
//             }
//         };

//         refreshToken();
//     }, [refresh]);

//     if (isRefreshing) {
//         return <div>Refreshing...</div>;
//     }

//     return <div>Logged in</div>;
// };

// export default PersistLogin;

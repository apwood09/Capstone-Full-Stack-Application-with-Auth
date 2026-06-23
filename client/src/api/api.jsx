// ensures React frontend correlates to Flask backend smoothly 

import axios from 'axios'; 

// create configures axios instance with base URL 
// every request with 'api' object will start with 'api'
const api = axios.create({ baseURL: 'http://127.0.0.1:5555/api' }); 

// set up request interceptor 
// runs automatically before every request is sent 
api.interceptors.request.use((config) => {
    // retrieve JWT stored in localStorage after successful login 
    const token = localStorage.getItem('jwt_token'); 
    // if token exists, attack to 'Authorization' header
    // 'Bearer' prefix standard protocol for JWT authentication
    if (token) {
        config.headers.Authorization = 'Bearer ${token}'; 
    }
    return config; // return modified configuration -> complete request 
}); 

export default api; 
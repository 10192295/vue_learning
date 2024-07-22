import axios from 'axios';

// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 配置你的 baseURL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    if (error.response && error.response.status === 401) {
      // 例如，未授权时的处理
      console.error('未授权，请重新登录');
    }
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = (url, params = {}) => {
  return axiosInstance.get(url, { params });
};

// 封装 POST 请求
export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

export default axiosInstance;

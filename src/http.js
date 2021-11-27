import axios from "axios";

const axiosObj = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
axiosObj.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
      // could do cookie instead
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
)

export default axiosObj;
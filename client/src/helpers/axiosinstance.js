import axios from 'axios'
const BASE_URL =  
  // "http://localhost:5001/api/v1"
 "https://finance-ms.onrender.com/api/v1"

const axiosinstance = axios.create()
axiosinstance.defaults.baseURL = BASE_URL
axiosinstance.defaults.withCredentials = true


export default axiosinstance
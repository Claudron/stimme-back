import axios from "axios";

const BASE_URL = '';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});



// axiosPrivate is not used jet but maybe will be used for an axios interceptor
export const axiosPrivate =axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})


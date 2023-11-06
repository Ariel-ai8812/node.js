import axios from "axios";

const URL = axios.create({ baseUrl: "http://localhost:4000" });

// export const get = () => URL.get(BaseURL);

// // Function to make a POST request
// export const post = (url, data) => URL.post(url, data);

// // Function to make a PUT request
// export const put = (url, data) => URL.put(url, data);

// // Function to make a DELETE request
// export const del = (url) => URL.delete(url);

export default URL

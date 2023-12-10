import axios from 'axios';

const axiosApi = axios.create({
  baseURL: "https://hw-66-7890a-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default axiosApi;
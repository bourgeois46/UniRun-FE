import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com', 
});

export default instance;
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';

const instance = axios.create({
  baseURL: 'http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com', 
  withCredentials: true, // 쿠키를 전송할 수 있도록 설정
});

// 요청 인터셉터 - 모든 요청에 쿠키 포함
instance.interceptors.request.use(async (config) => {
  // 저장된 쿠키를 가져옴
  const cookies = await CookieManager.get('http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com');
  
  // 서버에서 설정한 'SESSIONID' 쿠키 사용
  if (cookies && cookies.SESSIONID) {
    config.headers.Cookie = cookies.SESSIONID.value;
    console.log('쿠키 포함 요청:', config.headers.Cookie); 
  }
  return config;
});

// 응답 인터셉터 - 로그인 응답에서 쿠키를 추출
instance.interceptors.response.use(async (response) => {
  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader && setCookieHeader.length > 0) {
    const sessionCookie = setCookieHeader[0].split(';')[0].split('=')[1]; 
    if (!sessionCookie) {
      console.error('서버에서 쿠키를 제대로 받지 못했습니다.');
    } else {
      console.log('서버에서 받은 쿠키:', sessionCookie);
    }
    
    // 쿠키 저장
    await CookieManager.set('http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com', {
      name: 'SESSIONID', // 서버에서 설정한 쿠키 이름
      value: sessionCookie,
      domain: 'ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com',
      path: '/',
    });
    console.log('쿠키 저장됨:', sessionCookie); 
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance;

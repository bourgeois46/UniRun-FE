import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // 쿠키를 전송할 수 있도록 설정
});

// 로그인 시 받은 쿠키를 저장
const saveSessionCookie = async (cookieValue:string) => {
  try {
    console.log('저장할 쿠키 값:', cookieValue);
    await AsyncStorage.setItem('SESSIONID', cookieValue);
    console.log('쿠키 저장됨:', cookieValue);
    console.log('쿠키 저장 성공:', await AsyncStorage.getItem('SESSIONID')); 
  } catch (error) {
    console.error('쿠키 저장 중 오류:', error);
  }
};

// 요청 인터셉터 - 저장된 쿠키를 요청에 포함 (로그인 요청 제외)
instance.interceptors.request.use(async (config) => {
  try {
    // 로그인 요청일 경우 쿠키를 포함하지 않음
    if (config.url !== '/user/auth') {
      const sessionCookie = await AsyncStorage.getItem('SESSIONID');
      console.log('요청에 포함할 쿠키:', sessionCookie); 

      if (!sessionCookie) {
        console.warn('저장된 세션 쿠키가 없습니다.');
      }
    } else {
      console.log('로그인 요청이므로 쿠키 제외');
    }
  } catch (error) {
    console.error('쿠키를 가져오는 중 오류:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// 응답 인터셉터 - 로그인이 성공한 후 받은 쿠키를 저장
instance.interceptors.response.use(async (response) => {
  try {
    const setCookieHeader = response.headers['set-cookie'];
    
    // 로그인 요청에만 쿠키 저장 & 서버에서 'set-cookie' 헤더가 있는지 확인
    if (response.config.url === '/user/auth' && setCookieHeader && setCookieHeader.length > 0) {
      // 'SESSIONID' 쿠키 값을 추출
      const sessionCookie = setCookieHeader[0].split(';')[0].split('=')[1];
      
      if (sessionCookie) {
        console.log('서버에서 받은 쿠키:', sessionCookie);
        // 받은 쿠키를 저장 (로그인 성공 시 최초 한 번)
        await saveSessionCookie(sessionCookie);
      } else {
        console.error('쿠키가 유효하지 않습니다.');
      }
    }
  } catch (error) {
    console.error('응답 처리 중 오류:', error);
  }
  
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance;

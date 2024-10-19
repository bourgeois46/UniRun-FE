import instance from "./axiosInstance"
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginKakao = async (code: string): Promise<any> => {
    try {
      console.log('Sending code to backend:', code);
      const response = await instance.post('/user/auth', {code: code}, { withCredentials: true, });
      console.log('Received response from backend:', response.data);
      return response; // header에 접근 가능하도록 전체 응답 반환
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      throw error;
    }
  };

  export const registerUserInfo = async (userInfo: {
    nickname: string;
    userUniName: string;
    gender: string;
    birthYear: string;
    height: number;
    weight: number;
    goal: string;
    walletAddress: string;
  }): Promise<any> => {
    try {
      console.log('Sending user info to backend:', userInfo);
      const response = await instance.patch('/user/register', userInfo);
      console.log('Received response from backend:', response.data);
      return response;
    } catch (error) {
      console.error('회원 정보 제출 에러:', error);
      throw error;
    }
  };

export const logoutKakao = async (): Promise<any> => {
  try {
    const response = await instance.delete('/user/logout');

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.status === 200) {
      await AsyncStorage.removeItem('SESSIONID');
      Alert.alert('로그아웃 되었습니다.');
    } else {
      throw new Error('로그아웃 실패');
    }
    return response;
  } catch (error) {
    const err = error as Error; 
    console.error('Logout Error:', error);
    Alert.alert(
      '로그아웃 실패',
      err.message || '서버와 통신하는 중 오류가 발생했습니다.',
    );
  }
};

export const withdrawalKakao = async (): Promise<any> => {
  try {
    const response = await instance.delete('/user/delete');

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.status === 200) {
      await AsyncStorage.removeItem('SESSIONID');
      Alert.alert('회원탈퇴 되었습니다.');
    } else {
      throw new Error('회원탈퇴 실패');
    }
    return response;
  } catch (error) {
    const err = error as Error; 
    console.error('Withdrawal Error:', error);
    Alert.alert(
      '회원탈퇴 실패',
      err.message || '서버와 통신하는 중 오류가 발생했습니다.',
    );
  }
};

export const userInfoCheck = async (): Promise<any> => {
  try {
    const response = await instance.get('/user');

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.status === 200) {
      return response.data;
    } else if (response.data && response.data.status === 404) {
      Alert.alert('사용자 없음', '해당 사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    const err = error as Error; 
    console.error('회원 정보 조회 에러:', error);
    Alert.alert(
      '회원 정보 조회 에러',
      err.message || '회원 정보 조회 중 오류가 발생했습니다.',
    );
  }
};

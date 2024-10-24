import instance from './axiosInstance';
import { Alert } from 'react-native';

export const getRemainToken = async (): Promise<any> => {
  try {
    const response = await instance.get('/block-chain/token/my-tokens');
    console.log('Received response from backend:', response.data);

    if (response.status === 200 && typeof response.data.data === 'number') {
      return response.data.data; 
    } else if (response.status === 401) {
      Alert.alert('세션 오류', '세션 Id가 없습니다.');
    } else if (response.status === 500) {
      Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
    } else if (response.status === 404) {
      Alert.alert('데이터 없음', '사용자 데이터를 찾을 수 없습니다.');
    } else {
      Alert.alert('토큰 잔액 조회 실패', '데이터를 조회할 수 없습니다.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('토큰 잔액 조회 실패:', error);

    Alert.alert(
      '토큰 잔액 조회 실패',
      err.message || '토큰 잔액을 조회하는 중 오류가 발생했습니다.',
    );
    return null;
  }
};

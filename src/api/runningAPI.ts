import instance from './axiosInstance';
import { Alert } from 'react-native';

export const getRunningTypes = async (): Promise<any> => {
  try {
    const response = await instance.get('/running/types');
    console.log('Received response from backend:', response.data);

    if (response.status === 200 && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data; 
    } else if (response.status === 401) {
      Alert.alert('세션 오류', '세션 Id가 없습니다.');
    } else if (response.status === 500) {
      Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
    } else {
      Alert.alert('러닝 타입 조회 실패', '데이터가 없습니다.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('러닝 타입 조회 실패:', error);

    Alert.alert(
      '러닝 타입 조회 실패',
      err.message || '러닝 타입을 조회하는 중 오류가 발생했습니다.',
    );
    return [];
  }
};

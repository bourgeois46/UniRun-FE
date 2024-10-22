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

export const saveRunningName = async (runningDataId: number, runningName: string): Promise<any> => {
    //console.log('엔드포인트에 전달된 runningDataId:', runningDataId); 
    console.log('전달된 runningName:', runningName); 

    try {
      const response = await instance.patch(`/running/${runningDataId}/name`, {
        runningName: runningName,
      });
      console.log('Response from backend:', response.data);
  
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 401) {
        Alert.alert('세션 오류', '세션 Id가 없습니다.');
      } else if (response.status === 500) {
        Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
      } else {
        Alert.alert('러닝 이름 저장 실패', '러닝 이름을 저장하는데 실패했습니다.');
      }
    } catch (error) {
      const err = error as Error;
      console.error('러닝 이름 저장 실패:', error);
  
      Alert.alert(
        '러닝 이름 저장 실패',
        err.message || '러닝 이름을 저장하는 중 오류가 발생했습니다.',
      );
      return null;
    }
  };

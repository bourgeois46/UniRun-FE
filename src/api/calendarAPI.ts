import instance from './axiosInstance';
import {Alert} from 'react-native';

export const calendarMain = async (
  year: number,
  month: number,
): Promise<any> => {
  try {
    const response = await instance.get(
      `/calendar/running-schedules/monthly?year=${year}&month=${month}`,
    );

    console.log('Received response from backend:', response.data);

    if (response.data && response.data.status === 200) {
      return response.data || [];
    } else if (response.data && response.data.status === 404) {
      Alert.alert('일정 없음', '해당 일정을 찾을 수 없습니다.');
      return [];
    } else {
      return [];
    }
  } catch (error) {
    const err = error as Error;
    console.error('Calendar Error:', error);
    Alert.alert(
      '일정 정보 조회 에러',
      err.message || '일정 조회 중 오류가 발생했습니다.',
    );
    return [];
  }
};

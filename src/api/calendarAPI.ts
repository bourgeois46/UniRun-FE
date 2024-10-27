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

    console.log('월별 러닝 스케줄 날짜 조회:', response.data);

    if (response.data && response.data.status === 200) {
      return response.data || [];
    } else if (response.data && response.data.status === 500) {
      Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
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

export const calendarDaily = async (
  year: number,
  month: number,
  day: number,
): Promise<any> => {
  try {
    const response = await instance.get(
      `/calendar/running-schedules/daily?year=${year}&month=${month}&day=${day}`,
    );

    console.log('날짜별 러닝 스케줄 날짜 조회:', response.data);

    if (response.data && response.data.status === 200) {
      return response.data || [];
    } else if (response.data && response.data.status === 500) {
      Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Calendar Error:', error);
    Alert.alert(
      '날짜별 일정 정보 조회 에러',
      err.message || '날짜별 일정 조회 중 오류가 발생했습니다.',
    );
    return [];
  }
};

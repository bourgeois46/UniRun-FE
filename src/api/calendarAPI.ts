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
    console.error('CalendarMain Error:', error);
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
    console.error('CalendarDaily Error:', error);
    Alert.alert(
      '날짜별 일정 정보 조회 에러',
      err.message || '날짜별 일정 조회 중 오류가 발생했습니다.',
    );
    return [];
  }
};

export const createCalendar = async (newEvent: {
  type: string;
  title: string;
  crew: string;
  date: string;
  startTime: string;
  place: string;
  audienceType: string;
}): Promise<any> => {
  try {
    console.log('요청 데이터:', newEvent);
    const response = await instance.post(
      '/calendar/running-schedule',
      newEvent,
    );
    console.log('응답 데이터:', response);
    if (response.status === 200) {
      return response;
    } else if (response.status === 400) {
      Alert.alert('입력 형식 오류', '입력 형식이 알맞지 않습니다.');
    } else if (response.status === 500) {
      Alert.alert('서버 오류', '서버와 통신하는 중 오류가 발생했습니다.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('CreateCalendar Error:', error);
    Alert.alert(
      '러닝 스케줄 작성 에러',
      err.message || '러닝 스케줄 작성 중 오류가 발생했습니다.',
    );
    return [];
  }
};

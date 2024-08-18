import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CalendarItem from './CalendarItem';

// const mockData: Event[] = [
//   {
//     type: '번개',
//     title: '한강런',
//     crew: '동덕여자대학교 두런두런',
//     date: '2024-08-10',
//     startTime: '5:00PM',
//     endTime: '7:00PM',
//     place: '월곡역 3번 출구',
//     audienceType: '교내',
//   },
//   {
//     type: '번개',
//     title: '성북천 가볍게',
//     crew: '고려대학교 KUTR',
//     date: '2024-08-20',
//     startTime: '8:00PM',
//     endTime: '9:00PM',
//     place: '성북천 입구',
//     audienceType: '교내',
//   },
//   {
//     type: '정규',
//     title: '어대 한바퀴',
//     crew: '건국대학교 RIKU',
//     date: '2024-09-15',
//     startTime: '6:00PM',
//     endTime: '8:00PM',
//     place: '어린이대공원 입구',
//     audienceType: '전체',
//   },
// ];

interface Event {
  type: string;
  title: string;
  crew: string;
  date: string; // yyyy-mm-dd format
  startTime: string;
  endTime: string;
  place: string;
  audienceType: string;
}

interface CalendarListProps {
  selectedDate: string | null;
  events: any[];
}

const CalendarList: React.FC<CalendarListProps> = ({selectedDate, events}) => {
  //선택한 날짜에 해당하는 이벤트 필터링
  const filteredEvents = selectedDate
    ? events.filter(event => event.date === selectedDate)
    : events;

  return (
    <FlatList
      data={filteredEvents}
      renderItem={({item}) => <CalendarItem item={item} />}
      keyExtractor={item => item.title}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    top: 70,
  },
});

export default CalendarList;

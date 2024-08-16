import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, FlatList} from 'react-native';
import CalendarItem from './CalendarItem';
import {useRoute} from '@react-navigation/native';

const mockData = [
  {
    type: '번개',
    title: '한강런',
    crew: '동덕여자대학교 두런두런',
    date: '2024.08.01',
    startTime: '17:00',
    endTime: '19:00',
    place: '월곡역 3번 출구',
    audienceType: '교내',
  },
  {
    type: '번개',
    title: '성북천 가볍게',
    crew: '고려대학교 KUTR',
    date: '2024.08.01',
    startTime: '20:00',
    endTime: '21:00',
    place: '성북천 입구',
    audienceType: '교내',
  },
  {
    type: '정규',
    title: '어대 한바퀴',
    crew: '건국대학교 RIKU',
    date: '2024.08.01',
    startTime: '06:00',
    endTime: '08:00',
    place: '어린이대공원 입구',
    audienceType: '전체',
  },
];

const CalendarList: React.FC = () => {
  const route = useRoute();
  const [events, setEvents] = useState(mockData);

  useEffect(() => {
    if (route.params?.newEvent) {
      setEvents(prevEvents => [...prevEvents, route.params.newEvent]);
    }
  }, [route.params?.newEvent]);

  return (
    <FlatList
      data={events}
      renderItem={({item}) => <CalendarItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
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

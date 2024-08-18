import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CalendarItem from './CalendarItem';

// interface Event {
//   type: string;
//   title: string;
//   crew: string;
//   date: string; // yyyy-mm-dd format
//   startTime: string;
//   endTime: string;
//   place: string;
//   audienceType: string;
// }

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

import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';

//타입 정의
interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    marked: boolean;
  };
}

const markedDates: MarkedDates = {
  '2024-08-20': {
    marked: true,
  },
  '2024-08-03': {
    marked: true,
    selected: true,
  },
  '2024-09-14': {
    marked: true,
  },
};

const CalendarView: React.FC = () => {
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      theme={{
        selectedDayBackgroundColor: '#0F2869',
        arrowColor: '#0F2869',
        dotColor: '#0F2869',
        todayTextColor: '#009688',
      }}
    />
  );
};

type Styles = {
  calendar: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  calendar: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;

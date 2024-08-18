import {StyleSheet, ViewStyle} from 'react-native';
import React, {useState, useMemo} from 'react';
import {Calendar} from 'react-native-calendars';

interface CalendarViewProps {
  onDateSelect: (date: string) => void;
  events?: {date: string}[];
}

// const mockData = [
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

const CalendarView: React.FC<CalendarViewProps> = ({
  onDateSelect,
  events = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = useMemo(() => {
    const dates: {[key: string]: any} = {};
    events.forEach(event => {
      dates[event.date] = {marked: true};
    });
    return dates;
  }, [events]);

  const onDayPress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString); // 날짜 선택 시 상위 컴포넌트로 전달
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={{
        ...markedDates,
        [selectedDate || '']: {selected: true},
      }}
      theme={{
        selectedDayBackgroundColor: '#0F2869',
        arrowColor: '#0F2869',
        dotColor: '#0F2869',
        todayTextColor: '#009688',
      }}
      onDayPress={onDayPress}
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
    borderBottomColor: '#D9D9D9',
  },
});

export default CalendarView;

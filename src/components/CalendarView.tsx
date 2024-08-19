import {StyleSheet, ViewStyle} from 'react-native';
import React, {useState, useMemo} from 'react';
import {Calendar} from 'react-native-calendars';

interface CalendarViewProps {
  onDateSelect: (date: string) => void;
  events?: {date: string}[];
}

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

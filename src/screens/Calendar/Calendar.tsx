import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CalendarView from '../../components/CalendarView';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import CalendarList from '../../components/CalendarList';
import type {StackNavigationProp} from '@react-navigation/stack';
import {calendarMain, calendarDaily} from '../../api/calendarAPI';

type RootStackParamList = {
  CreateRun: undefined;
  Calendar: {newEvent?: any};
};

type CalendarNavigationProp = StackNavigationProp<RootStackParamList>;

const Calendar: React.FC = () => {
  const navigation = useNavigation<CalendarNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Calendar'>>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    //API 추가 코드
    const fetchCalendarInfo = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear(); //현재 연도
        const month = today.getMonth() + 1; //현재 월

        const response = await calendarMain(year, month);
        if (response && response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error('캘린더 메인 조회 중 오류: ', error);
      }
    };

    fetchCalendarInfo();

    //조건에 따른 상태 업데이트
    if (route.params?.newEvent) {
      setEvents(prevEvents => [...prevEvents, route.params.newEvent]);
    }
  }, [route.params?.newEvent]);

  const handleButtonClick = () => {
    navigation.navigate('CreateRun');
  };

  // 캘린더에서 날짜를 클릭했을 때 호출될 함수
  const handleDateSelect = async (date: string) => {
    setSelectedDate(date); // 선택한 날짜를 상태로 설정

    const [year, month, day] = date.split('-').map(Number); //선택한 날짜를 연,월,일로 나누기
    try {
      const dailyEvents = await calendarDaily(year, month, day);
      setFilteredEvents(dailyEvents.data || []); // 선택한 날짜의 일정으로 업데이트
    } catch (error) {
      console.error('날짜별 일정 조회 중 오류:', error);
      setFilteredEvents([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>CALENDAR</Text>
      <Text style={styles.sub}>날짜를 클릭하여 일정을 확인해보세요!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <Image
            source={require('../../../assets/addbtn2.png')}
            style={styles.vector}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <CalendarView onDateSelect={handleDateSelect} events={events} />
      </View>

      <View style={styles.calendarListContainer}>
        {selectedDate && filteredEvents.length === 0 ? (
          // 선택한 날짜에 이벤트가 없을 때
          <Text style={styles.noEventsText}>
            선택한 날짜에 이벤트가 없습니다.
          </Text>
        ) : (
          // 선택한 날짜에 이벤트가 있을 때
          <CalendarList selectedDate={selectedDate} events={filteredEvents} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  name: {
    color: '#343434',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    fontWeight: '500', //medium은 유효하지 않아서 숫자로 설정
    color: '#CBCBCB',
    marginBottom: 10, //CalendarView와의 여백을 위해 추가
  },
  calendarContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    margin: 10,
  },
  vector: {
    width: 400,
    height: 50,
  },
  calendarListContainer: {
    top: -70,
    width: '100%',
  },
  noEventsText: {
    textAlign: 'center',
    top: 100,
    color: '#343434',
  },
});

export default Calendar;

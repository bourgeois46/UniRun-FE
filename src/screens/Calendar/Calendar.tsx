import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CalendarView from '../../components/CalendarView';
import {useNavigation} from '@react-navigation/native';
import CalendarList from '../../components/CalendarList';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Calendar: undefined;
  CreateRun: undefined;
};

type CalendarNavigationProp = StackNavigationProp<RootStackParamList>;

const Calendar: React.FC = () => {
  const navigation = useNavigation<CalendarNavigationProp>();

  const handleButtonClick = () => {
    navigation.navigate('CreateRun');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>CALENDAR</Text>
      <Text style={styles.sub}>날짜를 클릭하여 일정을 추가해보세요!</Text>
      <View style={styles.calendarContainer}>
        <CalendarView />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <Image
            source={require('../../../assets/addbtn.png')}
            style={styles.vector}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarListContainer}>
        <CalendarList />
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
    width: 350,
    height: 42,
  },
  calendarListContainer: {
    top: -70,
    width: '100%',
  },
});

export default Calendar;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CalendarView from '../../components/CalendarView';
import {useNavigation} from '@react-navigation/native';

const Calendar: React.FC = () => {
  const navigation = useNavigation();

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
            source={require('../../../assets/calendaredit.png')}
            style={styles.vector}
          />
        </TouchableOpacity>
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
    marginBottom: 20, //CalendarView와의 여백을 위해 추가
  },
  calendarContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1.5,
    borderColor: '#0F2869',
    borderRadius: 30,
    backgroundColor: '#fff',
    top: -30, //-60이 원하는 위치인데 날짜가 가려서 고민임
    left: 150,
    width: 50,
    height: 50,
    elevation: 5, //그림자 효과 추가(안드로이드만 적용됨)
  },
  vector: {
    width: 24,
    height: 24,
  },
});

export default Calendar;

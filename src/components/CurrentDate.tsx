import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';

const CurrentDate: React.FC = () => {
  const now = new Date();
  const formattedDate = format(now, 'yyyy/MM/dd');
  const formattedDay = format(now, 'EEE'); // 요일을 알파벳 3자로 표시

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{formattedDay}</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#0F2869',
    marginRight: 10,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#0F2869',
    left: 40,
  },
});

export default CurrentDate;

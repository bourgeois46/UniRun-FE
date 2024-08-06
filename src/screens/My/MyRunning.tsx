import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RunningList from '../../components/RunningList';
import ScheduleList from '../../components/ScheduleList';

const MyRunning: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('기록');

  const handleLabelPress = (label: string) => {
    setSelectedLabel(label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 러닝</Text>
      <Text style={styles.message}>나의 러닝 기록과 일정을 확인해보세요.</Text>

      <View style={styles.labelContainer}>
        <TouchableOpacity onPress={() => handleLabelPress('기록')}>
          <Text
            style={[
              styles.label,
              { color: selectedLabel === '기록' ? '#0F2869' : '#CBCBCB' },
            ]}
          >
            러닝 기록
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLabelPress('일정')}>
          <Text
            style={[
              styles.label,
              { color: selectedLabel === '일정' ? '#0F2869' : '#CBCBCB' },
            ]}
          >
            러닝 일정
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
      {selectedLabel === '기록' ? <RunningList /> : <ScheduleList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 30,
    marginTop: 30,
  },
  message: {
    fontSize: 16,
    color: '#CBCBCB',
    marginLeft: 30,
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 100, // 요소 사이 공간 조정
    marginTop: 30,
    marginBottom: 15,
    right: 80,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    marginVertical: 5,
  },
});

export default MyRunning;

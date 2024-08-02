import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

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

        <View style={styles.horizontalLine} />
      </View>
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
    paddingHorizontal: 100, // 요소 사이 공간
    right: 70,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,  
  },
  horizontalLine: {
    position: 'absolute',
    width: '170%',
    height: 1,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    marginVertical: 5,
    left: 100,
    top: 65,
  },
});

export default MyRunning;

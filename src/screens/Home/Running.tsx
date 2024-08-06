import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Record: { showModal: boolean };
};

const Running: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Record'>>();

  const handleButtonClick = () => {
    setIsPaused(!isPaused);
  };

  // 모달을 열면서 화면 이동 
  // 모달 닫은 후 Record 화면
  const handleCombinedPress = () => {
    navigation.navigate('Record', { showModal: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <Image
            source={isPaused ? require('../../../assets/pause.png') : require('../../../assets/button1.png')}
            style={styles.commonMargin}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCombinedPress}>
          <Image source={require('../../../assets/button2.png')} style={styles.commonMargin} />
        </TouchableOpacity>
      </View>

      <View style={styles.timeDistanceContainer}>
        <Image source={require('../../../assets/time.png')} style={styles.commonMargin} />
        <Image source={require('../../../assets/distance.png')} style={[styles.commonMargin, { top: 2 }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.secondText}>00:00:00</Text>
        <View style={styles.kmContainer}>
          <Text style={styles.timeText}>0.00</Text>
          <Text style={styles.distanceText}> km</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 350,
    marginBottom: 38,
    justifyContent: 'space-between',
    width: '58%',
  },
  commonMargin: {
    marginHorizontal: 10,
  },
  timeDistanceContainer: {
    flexDirection: 'row',
    marginBottom: 38,
    justifyContent: 'space-between',
    width: '51%',
  },
  secondText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0F2869',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '55%',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0F2869',
  },
  distanceText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0F2869',
  },
  kmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Running;

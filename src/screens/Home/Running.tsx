import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Record: {showModal: boolean; time: string };
};

const Running: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Record'>>();
  const [seconds, setSeconds] = useState<number>(0);

  const handleButtonClick = () => {
    setIsPaused(!isPaused);
  };

  // 모달을 열면서 화면 이동
  // 모달 닫은 후 Record 화면
  const handleCombinedPress = () => {
    const formattedTime = formatTime(seconds);
    navigation.navigate('Record', { showModal: true, time: formattedTime }); // 측정된 시간 전달
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null; // setInterval가 반환하는 id 저장 -> clearInterval 이용해서 타이머 멈춤
    // ReturnType : number

    // 타이머 시작
    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // 1초
    } 

    // 타이머 정지
    else if (isPaused && interval) {
      clearInterval(interval);
    }

    // 클린업 함수 -> 컴포넌트 언파운트, useEffect 재실행 전에 호출
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const getHours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const getMinutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const getSeconds = String(seconds % 60).padStart(2, '0');
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/runmap.png')}
        style={styles.mapimage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <Image
            source={
              isPaused
                ? require('../../../assets/pause.png')
                : require('../../../assets/button1.png')
            }
            style={styles.commonMargin}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCombinedPress}>
          <Image
            source={require('../../../assets/button2.png')}
            style={styles.commonMargin}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timeDistanceContainer}>
        <Image
          source={require('../../../assets/time.png')}
          style={styles.commonMargin}
        />
        <Image
          source={require('../../../assets/distance.png')}
          style={[styles.commonMargin, {top: 2}]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.secondText}>{formatTime(seconds)}</Text>
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
  mapimage: {
    width: 392,
    height: 370,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
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

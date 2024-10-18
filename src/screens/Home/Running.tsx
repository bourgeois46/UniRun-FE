import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

type RootStackParamList = {
  Record: {showModal: boolean; time: string };
};

const Running: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [region, setRegion] = useState<Region | null>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null); // 현재 위치 상태
  
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Record'>>();
  const [seconds, setSeconds] = useState<number>(0);

  const handleButtonClick = () => {
    setIsPaused(!isPaused);
  };

  const handleCombinedPress = () => {
    const formattedTime = formatTime(seconds);
    navigation.navigate('Record', { showModal: true, time: formattedTime });
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (isPaused && interval) {
      clearInterval(interval);
    }

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

  // 현재 위치 가져오기
  useEffect(() => {
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;

          // 현재 위치를 region과 currentLocation에 설정
          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01, 
            longitudeDelta: 0.01,
          });
          setCurrentLocation({
            latitude: latitude,
            longitude: longitude,
          });
        },
        (error) => {
          console.error(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {region && ( 
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region} // 업데이트된 region 사용
            showsUserLocation={true}
          >
            {currentLocation && (
              <Marker
                coordinate={currentLocation} // 현재 위치에 마커 표시
                title="현재 위치"
                description="여기가 현재 위치입니다."
              />
            )}
          </MapView>
        )}
      </View>

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
  mapContainer: {
    width: '100%',
    height: '60%',
  },
  map: {
    flex: 1,
  }
});

export default Running;

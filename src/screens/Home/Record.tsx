import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import RunningDoneModal from '../../modal/RunningDoneModal';
import CurrentDate from '../../components/CurrentDate';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

type RootStackParamList = {
  Running: undefined;
  Record: {showModal: boolean; time: string};
};

const Record: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Record'>>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [region, setRegion] = useState<Region | null>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null); // 현재 위치 상태

  // useRoute로 전달된 파라미터가 true -> 모달 띄움
  useEffect(() => {
    if (route.params?.showModal) {
      setIsModalVisible(true);
    }
  }, [route.params]);

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

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
            region={region} 
            showsUserLocation={true}
          >
            {currentLocation && (
              <Marker
                coordinate={currentLocation} 
                title="현재 위치"
                description="여기가 현재 위치입니다."
              />
            )}
          </MapView>
        )}
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Image
            source={require('../../../assets/date.png')}
            style={[styles.icon, {top: 20}]}
          />
          <CurrentDate />
        </View>
        <View style={styles.gridItem}>
          <Image
            source={require('../../../assets/time.png')}
            style={styles.icon}
          />
          <Text style={styles.valueNumber}>{route.params?.time || '00:00:00'}</Text>
        </View>

        {/* 가로 점선 */}
        <View style={styles.horizontalLine} />

        <View style={styles.gridItem}>
          <Image
            source={require('../../../assets/distance.png')}
            style={styles.icon}
          />
          <View style={styles.valueContainer}>
            <Text style={styles.valueNumber}>0</Text>
            <Text style={styles.valueUnit}>km</Text>
          </View>
        </View>
        <View style={styles.gridItem}>
          <Image
            source={require('../../../assets/cal.png')}
            style={styles.icon}
          />
          <View style={styles.valueContainer}>
            <Text style={styles.valueNumber}>0</Text>
            <Text style={styles.valueUnit}>m</Text>
          </View>
        </View>
      </View>

      {/* 세로 점선 */}
      <View style={styles.verticalLine} />

      <RunningDoneModal visible={isModalVisible} onClose={onPressModalClose} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  closeText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    height: 300,
    marginTop: 20,
  },
  gridItem: {
    width: '45%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',
  },
  icon: {
    resizeMode: 'cover',
    right: '25%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  valueNumber: {
    marginTop: 18,
    fontSize: 28,
    left: 24,
    fontWeight: 'bold',
    color: '#0F2869',
  },
  valueUnit: {
    fontSize: 26,
    left: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#0F2869',
  },
  valueDay: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0F2869',
    left: 50,
  },
  valueDate: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0F2869',
    left: 20,
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    top: 150,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: '#D9D9D9',
    marginVertical: 5,
  },
  verticalLine: {
    position: 'absolute',
    bottom: 20,
    width: 1,
    height: '40%',
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: '#D9D9D9',
    marginHorizontal: 10,
  },
  mapContainer: {
    width: '100%',
    height: '60%',
  },
  map: {
    flex: 1,
  }
});

export default Record;

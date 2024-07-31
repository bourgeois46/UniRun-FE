import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Running: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image source={require('../../../assets/button1.png')} style= {styles.commonMargin} />
        <Image source={require('../../../assets/button2.png')} style= {styles.commonMargin} />
      </View>
      <View style={styles.timeDistanceContainer}>
        <Image source={require('../../../assets/time.png')} style={styles.commonMargin} />
        <Image source={require('../../../assets/distance.png')} style={[styles.commonMargin, { top: 2 }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.secondText}>00:08:58</Text>
        <View style={styles.kmContainer}>
          <Text style={styles.timeText}>3.57</Text>
          <Text style={styles.distanceText}> km</Text>
        </View>
      </View>
    </View>
  )
}

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
    width: '60%', 
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
    color: '#0F2869'
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
    color: '#0F2869'
  },
  distanceText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0F2869'
  },
  kmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  }
});

export default Running;

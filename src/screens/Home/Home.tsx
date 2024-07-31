import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/home_main.png')} style={styles.image} />
      <Image source={require('../../../assets/ticket.png')} style={styles.ticket} />
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
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '-15%',
  },
  ticket:{
    resizeMode: 'contain',
    position: 'absolute',
    top: '70%',
  }
})





export default Home;
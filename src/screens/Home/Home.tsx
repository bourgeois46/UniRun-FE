import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import RunningStartModal from '../../modal/RunningStartModal';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/home_main.png')} style={styles.image} />
      <Pressable 
          onPress={onPressModalOpen}  
          style={({ pressed }) => [
             styles.ticketPressable,
            {
             opacity: pressed ? 0.5 : 1, // 터치 효과
            },
          ]}>
        <Image source={require('../../../assets/ticket.png')} />
      </Pressable>
      <RunningStartModal visible={isModalVisible} onClose={onPressModalClose} />
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '-15%',
  },
  ticketPressable: {
    position: 'absolute',
    bottom: '8%',   
    zIndex: 2, 
  },
});

export default Home;


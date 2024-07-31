import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RunningStartModal from '../../modal/RunningStartModal';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

  const onPressModalOpen = () => {
    console.log('모달 열기 버튼 클릭됨');
    setIsModalVisible(true);
    console.log('isModalVisible:', isModalVisible);  // 상태값 로그 추가
  };

  const onPressModalClose = () => {
    console.log('모달 닫기 버튼 클릭됨');
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/home_main.png')} style={styles.image} />
      <TouchableOpacity onPress={onPressModalOpen}>
        <Image source={require('../../../assets/ticket.png')} style={styles.ticket} />
      </TouchableOpacity>
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
  ticket: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 130,
    left: -185,
  },
});

export default Home;



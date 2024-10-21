import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import RunningStartModal from '../../modal/RunningStartModal';
import WebSocketService from '../../api/webSocketService';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const wsService = WebSocketService.getInstance(
    'ws://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com/running'
  ); 

  const handleStartClick = () => {
    wsService.sendMessage('start');
  };
  
  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/home_main.png')}
        style={styles.image}
      />

      <Pressable
        onPress={onPressModalOpen}
        style={({pressed}) => [
          styles.ticketPressable,
          {
            opacity: pressed ? 0.5 : 1, // 터치 효과
          },
        ]}>
        <Image
          source={require('../../../assets/ticket.png')}
          style={styles.ticketimage}
        />
      </Pressable>

      <RunningStartModal 
        visible={isModalVisible} 
        onClose={onPressModalClose} 
        onStartClick={handleStartClick}
        />
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
  ticketimage: {
    //ios여서 끌어내림
    top: 30,
  },
});

export default Home;

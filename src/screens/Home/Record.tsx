import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import RunningDoneModal from '../../modal/RunningDoneModal';

type RootStackParamList = {
  Running: undefined;
  Record: { showModal: boolean };
};

const Record: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Record'>>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // useRoute로 전달된 파라미터가 true -> 모달 띄움
  useEffect(() => {
    if (route.params?.showModal) {
      setIsModalVisible(true);
    }
  }, [route.params]);

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Record</Text>
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
    shadowOffset: { width: 0, height: 2 },
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
});

export default Record;

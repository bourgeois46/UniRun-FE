import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface RunningStartModalProps {
  visible: boolean;
  onClose: () => void;
}

const RunningStartModal: React.FC<RunningStartModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>러닝 시작 알림</Text>
          <Text style={styles.message}>3초 후에 러닝이 시작됩니다!</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={() => { 
              console.log('돌아가기 버튼 클릭됨'); 
              onClose();
            }}>
              <Text style={styles.buttonText}>돌아가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => { 
              console.log('러닝 시작 버튼 클릭됨'); 
            }}>
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    right: 65,
    marginBottom: 10,
  },
  message: {
    fontSize: 13,
    right: 45,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button1: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#CBCBCB',
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RunningStartModal;


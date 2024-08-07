import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const CheckDeleteModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    useEffect(() => {
        if (visible) {
          const timer = setTimeout(() => {
            onClose();
          }, 2000); // 3초 후에 모달 닫기
    
          // 컴포넌트가 언마운트되거나 visible이 변경될 때 타이머 정리
          return () => clearTimeout(timer);
        }
      }, [visible]);
    
    return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>기록이 삭제되었습니다</Text>
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
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 200,
    height: 60,
    top: 270,
    alignItems: 'center',
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',  
  }
});

export default CheckDeleteModal;

import React, {useState} from 'react';
import { View, Modal , StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import CheckDeleteModal from './CheckDeleteModal';

const DeleteRecordModal: React.FC<{ visible: boolean; onClose: () => void; onDelete: () => void }> = ({ visible, onClose, onDelete}) => {
    const [isCheckDeleteVisible, setIsCheckDeleteVisible] = useState(false);

    // onPress에서 2가지 동작 수행
    const handleDeletePress = () => {
      onDelete();
      onClose(); // 기존 모달 닫기
      setIsCheckDeleteVisible(true); // 새로운 모달 열기
    };
  
    const handleCheckDeleteClose = () => {
      setIsCheckDeleteVisible(false);
    };
  
    return (
        <>
        <Modal visible={visible} transparent={true} animationType="fade" >
         <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
         </View>
        </Modal>

        <CheckDeleteModal visible={isCheckDeleteVisible} onClose={handleCheckDeleteClose} />
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      borderRadius: 10,
      padding: 20,
      width: '90%',
      alignItems: 'center',
      top: 340,
    },
    deleteButton: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
    },
    deleteButtonText: {
      color: '#A7334A',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
    },
    cancelButtonText: {
      color: '#0F2869',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default DeleteRecordModal
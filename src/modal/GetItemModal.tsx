import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const GetItemModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  
    return (
      <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.closeText} onPress={onClose}>X</Text>
            <Text style={styles.title}>아이템 소장</Text>
            <Text style={styles.message}>아이템을 소장하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={() => { onClose();}}>
                <Text style={styles.buttonText}>아니오</Text>
              </TouchableOpacity>

              {/*onPress 수정 */}
              <TouchableOpacity style={styles.button2} onPress={() => { onClose();}}>
                <Text style={styles.buttonText}>예</Text>
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
      right: 75,
      marginBottom: 10,
    },
    message: {
      fontSize: 13,
      right: 41,
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
    closeText: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  
  export default GetItemModal;
  
  
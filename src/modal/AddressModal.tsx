import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';

const AddressModal: React.FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            {/* 추후 연동 */}
          <Text style={styles.text}>0x8969e084f93B25e78556405c85a15Be0043007DA</Text>
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
  },
});

export default AddressModal;
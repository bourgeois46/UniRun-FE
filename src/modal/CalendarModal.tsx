import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

type CalendarModalProps = {
  visible: boolean;
  onClose: () => void;
  message: string;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  message,
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
          <Text style={styles.text}>{message}</Text>
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
    width: 250,
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
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
});

export default CalendarModal;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import { geWalletAdress } from '../api/blockchainAPI';
import { Alert } from 'react-native';

const AddressModal: React.FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>(''); 

  useEffect(() => {
    const handleWalletAddress = async () => {
      const address = await geWalletAdress(); 
      if (address !== null) {
        setWalletAddress(address); 
      } else {
        Alert.alert('지갑 주소 조회 오류', '지갑 주소를 가져올 수 없습니다.');
      }
    };

    if (visible) {
      handleWalletAddress();
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
            <Text style={styles.text}>{walletAddress || '로딩 중...'}</Text> 
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
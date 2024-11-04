import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { getRunningTypes, saveRunningName } from '../api/runningAPI';
import WebSocketService from '../api/webSocketService';

const RunningDoneModal: React.FC<{ visible: boolean; onClose: () => void; onRunningDataIdReceive: (id: number) => void }> = ({ visible, onClose, onRunningDataIdReceive }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | number | null>(null);
  const [items, setItems] = useState<ItemType<string | number>[]>([]);
  const [runningName, setRunningName] = useState<string>('');
  const [runningDataId, setRunningDataId] = useState<number | null>(null);  

  useEffect(() => {
    const loadRunningTypes = async () => {
      try {
        const types = await getRunningTypes();

        if (Array.isArray(types)) {
          const formattedTypes = types.map((type: { typeName: string }, index: number) => ({
            label: type.typeName,
            value: index + 1,
          }));
          setItems(formattedTypes);
        } else {
          console.error('러닝 타입 데이터가 배열이 아닙니다.');
        }
      } catch (error) {
        console.error('러닝 타입 불러오기 에러:', error);
      }
    };

    loadRunningTypes();
  }, []);

  useEffect(() => {
    const wsService = WebSocketService.getInstance('ws://ec2-3-38-192-141.ap-northeast-2.compute.amazonaws.com/running');
    wsService.setOnRunningDataIdReceived((receivedRunningDataId: number) => {
      console.log(`받은 runningDataId: ${receivedRunningDataId}`);
      setRunningDataId(receivedRunningDataId);
      onRunningDataIdReceive(receivedRunningDataId);  // 상위 컴포넌트에 전달
    });
  }, []);

  const handleSaveRunningName = async () => {
    if (runningDataId !== null) { 
      try {
        console.log('저장할 runningDataId:', runningDataId);
        const response = await saveRunningName(runningDataId, runningName); 
        if (response) {
          Alert.alert('성공', '러닝 이름이 성공적으로 저장되었습니다.');
          onClose(); 
        }
      } catch (error) {
        console.error('러닝 이름 저장 중 오류:', error);
      }
    } else {
      Alert.alert('오류', 'runningDataId가 없습니다.');
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.closeText} onPress={onClose}>
            X
          </Text>
          <Text style={styles.title}>러닝 완료 알림</Text>

          <View style={{ zIndex: 2 }}>
            <View style={styles.formRow}>
              <Text style={styles.label}>러닝 타입</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="러닝 타입 선택"
                containerStyle={[styles.dropdownContainer, { zIndex: 2 }]}
                style={styles.dropdown}
                dropDownContainerStyle={[styles.dropdownList, { zIndex: 3 }]}
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>직접 입력</Text>
            <TextInput
              style={styles.inputText}
              placeholder="직접 입력해주세요."
              value={runningName}
              onChangeText={setRunningName}
            />
          </View>

          <TouchableOpacity 
             onPress={handleSaveRunningName} 
             style={styles.imageWrapper}
             >
            <Image source={require('../../assets/done.png')} />
          </TouchableOpacity>
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
    height: 220,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    right: 70,
  },
  closeText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  dropdownContainer: {
    width: 195,
    left: 9,
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    maxHeight: 45,
    minHeight: 40,
  },
  dropdownList: {
    backgroundColor: '#fff',
    zIndex: 3, 
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    right: 8,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 8,
    width: 195,
    height: 40,
    left: 9,
    padding: 10,
  },
  imageWrapper: {
    marginTop: 20,
    left: 100,
  },
});

export default RunningDoneModal;


import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

const RunningDoneModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  // 드롭다운 열고 닫기
  const [open, setOpen] = useState(false);

  // 드롭다운 값
  const [value, setValue] = useState<string | number | null>(null);

  // 드롭다운 항목
  const [items, setItems] = useState<ItemType<string | number>[]>([
    { label: '[정규] 두런두런 - 한강런', value: 1 },
    { label: '[번개] KUTR - 성북천 가볍게', value: 2 },
    { label: '[번개] RIKU - 어대 한바퀴', value: 3 },
  ]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.closeText} onPress={onClose}>
            X
          </Text>
          <Text style={styles.title}>러닝 완료 알림</Text>

          {/* 부모 요소에 각각 zIndex 설정해서 배경색 투명한 문제 해결 */}
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
            <TextInput style={styles.inputText} placeholder="직접 입력" />
          </View>

          <TouchableOpacity onPress={onClose} style={styles.imageWrapper}>
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
  },
  imageWrapper: {
    marginTop: 20,
    left: 100,
  },
});

export default RunningDoneModal;


import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Calendar: undefined;
};

const CreateRun: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Calendar'>>();

  const handleSignup = () => {
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>러닝 일정 생성하기</Text>
      <Text style={styles.subtitle}>정보를 입력해 일정을 만들어보세요</Text>

      <View style={styles.formRow}>
        <Text style={styles.label}>유형</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '정규' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('정규')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '정규' && styles.selectedTypeButtonText,
              ]}>
              정규
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '번개' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('번개')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '번개' && styles.selectedTypeButtonText,
              ]}>
              번개
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 한강런, 00런"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>주최</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 러닝 크루 이름"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>날짜</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 2024.07.31"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>시간</Text>
        <View style={styles.labelcontainer}>
          <View style={styles.timeContainer}>
            <TextInput
              style={[styles.timeInput, styles.textInput]}
              keyboardType="numeric"
              placeholder="17:00"
            />
          </View>
          <Text style={styles.coloredlabel}> 부터</Text>
          <View style={styles.timeContainer}>
            <TextInput
              style={[styles.timeInput, styles.textInput]}
              keyboardType="numeric"
              placeholder="19:00"
            />
          </View>
          <Text style={styles.coloredlabel}> 까지</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>장소</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 홍대입구역 3번 출구"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>대상</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '교내' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('교내')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '교내' && styles.selectedTypeButtonText,
              ]}>
              교내
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '전체' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('전체')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '전체' && styles.selectedTypeButtonText,
              ]}>
              전체
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Image
          source={require('../../../assets/createbtn.png')}
          style={styles.vector}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    top: 28,
    left: 23,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    top: 33,
    left: 23,
    fontSize: 14,
    color: '#CBCBCB',
    marginBottom: 20,
  },
  formRow: {
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
    justifyContent: 'space-between',
  },
  label: {
    left: 23,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 15,
    color: 'black',
    minWidth: 80,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    right: 15,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    borderColor: '#0F2869',
  },
  typeButtonText: {
    color: 'black',
  },
  selectedTypeButtonText: {
    color: '#0F2869',
    fontWeight: 'bold',
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#0F2869',
    paddingVertical: 5,
    flex: 1,
    textAlign: 'center',
    right: 15,
  },
  textInput: {
    color: '#0F2869',
    fontWeight: '500',
    fontSize: 16,
  },
  labelcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    left: 54,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#0F2869',
    borderRadius: 6,
    padding: 10,
    flex: 1,
    marginLeft: -40,
    textAlign: 'center',
    width: 87,
    height: 32,
    right: 30,
  },
  coloredlabel: {
    fontSize: 17,
    fontWeight: 'bold',
    right: 30,
    marginLeft: 7,
    color: '#0F2869',
    minWidth: 80,
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  vector: {
    top: 20,
    width: 350,
    height: 54,
  },
});

export default CreateRun;

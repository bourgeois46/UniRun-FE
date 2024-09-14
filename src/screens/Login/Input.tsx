import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
};

const Input: React.FC<{}> = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const signupImage: ImageSourcePropType = require('../../../assets/signup.png');
  const fixImage: ImageSourcePropType = require('../../../assets/fixbutton.png');

  // 로그인 연동 후 수정
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const handleSignup = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 정보 입력하기</Text>
      <Text style={styles.subtitle}>간단한 정보를 입력해주세요</Text>

      <View style={styles.formRow}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 러닝덕, 단비"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>학교</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 동덕여자대학교"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>성별</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === '여성' && styles.selectedGenderButton,
            ]}
            onPress={() => setSelectedGender('여성')}>
            <Text
              style={[
                styles.genderButtonText,
                selectedGender === '여성' && styles.selectedGenderButtonText,
              ]}>
              여성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === '남성' && styles.selectedGenderButton,
            ]}
            onPress={() => setSelectedGender('남성')}>
            <Text
              style={[
                styles.genderButtonText,
                selectedGender === '남성' && styles.selectedGenderButtonText,
              ]}>
              남성
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>출생연도</Text>
        <View style={styles.labelcontainer}>
          <View style={styles.birthYearContainer}>
            <TextInput
              style={[styles.birthYearInput, styles.textInput]}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.coloredlabel}> 년도</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>키</Text>
        <View style={styles.labelcontainer}>
          <View style={styles.unitContainer}>
            <TextInput
              style={[styles.inputRow, styles.textInput]}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.coloredlabel}> CM</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>체중</Text>
        <View style={styles.labelcontainer}>
          <View style={styles.unitContainer}>
            <TextInput
              style={[styles.inputRow, styles.textInput]}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.coloredlabel}> KG</Text>
        </View>
      </View>

      <View style={styles.formCol}>
        <Text style={styles.label}>목표 설정</Text>
        <TextInput
          style={[styles.textInput, styles.inputGoal]}
          placeholder="ex) 포기하지말고 꾸준히!"
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Image
          style={[styles.lastButton, isLogged && styles.fixImageStyle]}
          source={isLogged ? fixImage : signupImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 15,
    color: '#CBCBCB',
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
    justifyContent: 'space-between',
  },
  formCol: {
    flexDirection: 'column',
    marginBottom: 38,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 15,
    color: 'black',
    minWidth: 80,
  },
  coloredlabel: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 15,
    marginTop: 10,
    color: '#0F2869',
    minWidth: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    flex: 1,
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#0F2869',
    paddingVertical: 5,
    flex: 1,
    textAlign: 'center',
  },
  inputGoal: {
    borderBottomWidth: 1,
    borderBottomColor: '#0F2869',
    paddingVertical: 5,
    textAlign: 'center',
    marginTop: 8,
  },
  textInput: {
    color: '#0F2869',
    fontWeight: 'bold',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedGenderButton: {
    borderColor: '#0F2869',
  },
  genderButtonText: {
    color: 'black',
  },
  selectedGenderButtonText: {
    color: '#0F2869',
    fontWeight: 'bold',
  },
  birthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  birthYearInput: {
    borderWidth: 1,
    borderColor: '#0F2869',
    borderRadius: 9,
    padding: 5,
    flex: 1,
    marginLeft: 50,
    textAlign: 'center',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    left: 54,
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastButton: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  fixImageStyle: {
    top: -50,
  },
});

export default Input;

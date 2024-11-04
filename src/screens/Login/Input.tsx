import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import {Alert} from 'react-native';
import { registerUserInfo, userInfoCheck, userInfoUpdate } from '../../api/memberAPI.ts';

type RootStackParamList = {
  Home: undefined;
  Record: undefined;
  Running: undefined;
  Main: undefined;
  Input: { walletRealAddress: string };
  MetaMaskWebview: undefined; 
};
type InputProps = {
  handleLoginSuccess: () => void;
  isLogged: boolean; 
};

const Input: React.FC<InputProps> = ({handleLoginSuccess, isLogged}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [userUniName, setUserUniName] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const signupImage: ImageSourcePropType = require('../../../assets/signup.png');
  const fixImage: ImageSourcePropType = require('../../../assets/fixbutton.png');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 
  
  const route = useRoute<RouteProp<RootStackParamList, 'Input'>>();
  const walletRealAddress = route.params?.walletRealAddress || '';
  
  useEffect(() => {
    if (walletRealAddress) {
      console.log('Received wallet real address:', walletRealAddress);
    }
  }, [walletRealAddress]);
  
  // 회원 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLogged) {
        try {
          const response = await userInfoCheck();
          if (response && response.data) {
            // 기존 정보가 있으면 해당 상태 업데이트
            setNickname(response.data.nickname);
            setUserUniName(response.data.userUniName);
            setSelectedGender(response.data.gender);
            setBirthYear(response.data.birthYear);
            setHeight(response.data.height.toString());
            setWeight(response.data.weight.toString());
            setGoal(response.data.goal);
            setWalletAddress(response.data.walletAddress);
          }
        } catch (error) {
          console.error('회원 정보 조회 중 오류:', error);
        }
      }
    };

    fetchUserInfo(); 
  }, [isLogged]);

 // 회원 정보 수정
 const handleUpdateUserInfo = async () => {
  if (!nickname || !userUniName || !selectedGender || !birthYear || !height || !weight || !goal || !walletAddress) {
    Alert.alert('모두 입력해주세요');
    return;
  }

  const updatedUserInfo = {
    nickname,
    userUniName,
    gender: selectedGender,
    birthYear,
    height: parseInt(height, 10),
    weight: parseInt(weight, 10),
    goal,
    walletAddress,
  };

  try {
    const response = await userInfoUpdate(updatedUserInfo);
    if (response && response.status === 201) { // 회원가입 처리가 되므로 201로 설정해야 됨
      Alert.alert('회원 정보 수정 성공', '회원 정보가 성공적으로 수정되었습니다.');
      handleLoginSuccess(); // 성공 시 로그인 상태 변경 가능
      navigation.navigate('Home');
    } else {
      Alert.alert('수정 실패', '회원 정보 수정에 실패하였습니다.');
    }
  } catch (error) {
    Alert.alert('회원 정보 수정 오류', '서버와 통신하는 중 오류가 발생했습니다.');
  }
};


  const handleSignup = async () => {
    if (!nickname || !userUniName || !selectedGender || !birthYear || !height || !weight || !goal || !walletAddress) {
      Alert.alert('모두 입력해주세요');
      return;
    }

    const userInfo = {
      nickname,
      userUniName,
      gender: selectedGender,
      birthYear,
      height: parseInt(height, 10),
      weight: parseInt(weight, 10),
      goal,
      walletAddress,
    };

    try {
      const response = await registerUserInfo(userInfo);

      if (response.data.status === 201) {
        Alert.alert('회원가입 성공', '회원 정보가 성공적으로 등록되었습니다.');
        handleLoginSuccess();  // 회원가입 성공 후 로그인 상태로 변경
        navigation.navigate('Home');  
        
      } else if (response.data.status === 400) {
        Alert.alert('회원가입 실패', '회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      Alert.alert('회원가입 오류', '서버와 통신하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <ScrollView 
       style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }} 
        persistentScrollbar={true}  
        keyboardShouldPersistTaps="handled"  
        contentInsetAdjustmentBehavior="automatic"
        scrollEnabled={true}
      >
      <Text style={styles.title}>회원 정보 입력하기</Text>
      <Text style={styles.subtitle}>간단한 정보를 입력해주세요</Text>

      <View style={styles.formRow}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 러닝덕, 단비"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>학교</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 동덕여자대학교"
          value={userUniName}
          onChangeText={setUserUniName}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>성별</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'F' && styles.selectedGenderButton,
            ]}
            onPress={() => setSelectedGender('F')}>
            <Text
              style={[
                styles.genderButtonText,
                selectedGender === 'F' && styles.selectedGenderButtonText,
              ]}>
              여성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'M' && styles.selectedGenderButton,
            ]}
            onPress={() => setSelectedGender('M')}>
            <Text
              style={[
                styles.genderButtonText,
                selectedGender === 'M' && styles.selectedGenderButtonText,
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
              value={birthYear}
              onChangeText={setBirthYear}
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
              value={height}
              onChangeText={setHeight}
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
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <Text style={styles.coloredlabel}> KG</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>목표 설정</Text>
        <TextInput
          style={[styles.textInput, styles.inputRow]}
          placeholder="ex) 포기하지말고 꾸준히!"
          value={goal}
          onChangeText={setGoal}
        />
      </View>

      <View style={styles.formRow}>
        <TouchableOpacity onPress={() => navigation.navigate('MetaMaskWebview')}>
          <Text style={styles.label}>지갑 주소</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, styles.inputRow]}
          value={walletAddress}
          onChangeText={setWalletAddress}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={isLogged ? handleUpdateUserInfo : handleSignup}>
        <Image
          style={[styles.lastButton, isLogged && styles.fixImageStyle]}
          source={isLogged ? fixImage : signupImage}
        />
      </TouchableOpacity>
    </ScrollView>
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

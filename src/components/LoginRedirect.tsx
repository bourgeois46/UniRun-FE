import {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {loginKakao} from '../api/memberAPI.ts';

type RootStackParamList = {
  LoginWebview: { token: string };
  Login: undefined;
  handleLoginSuccess: any;
  Home: undefined;
  Input: undefined;
};
type LoginRedirectProps = {
    handleLoginSuccess: () => void;
  };
type LoginWebviewRouteProp = RouteProp<RootStackParamList, 'LoginWebview'>;

const LoginRedirect: React.FC<LoginRedirectProps> = ({ handleLoginSuccess }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<LoginWebviewRouteProp>();
    const code = route.params?.token;

  useEffect(() => {
    const handleLogin = async () => {
      if (code) {
        try {
          const loginData = await loginKakao(code);
          if (loginData.success) {
            Alert.alert(
              '로그인 성공',
              '카카오 로그인이 성공적으로 완료되었습니다.',
            ); 
            handleLoginSuccess();  
          } else {
            if (loginData.statusCode === 401){
             Alert.alert(
              '회원가입 필요',
              '회원가입을 먼저 진행해주세요.',
             );
             navigation.navigate('Input');
            } else if (loginData.statusCode === 500){
              Alert.alert(
                '서버 오류',
                '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
              );
            } else {
              throw new Error('백엔드 서버에서 인증에 실패했습니다.');
            }
          }
        } catch (error) {
          const err = error as Error; 
          Alert.alert(
            '로그인 실패',
            err.message || '서버와 통신하는 중 오류가 발생했습니다.',
          );
          navigation.navigate('Login'); // 로그인 실패 시 이동할 화면
        }
      } else {
        Alert.alert('인증 코드 오류', '인증 코드를 가져오지 못했습니다.');
        navigation.navigate('Login'); // 인증 코드 오류 시 이동할 화면
      }
    };

    handleLogin();
  }, [code, navigation, handleLoginSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginRedirect;
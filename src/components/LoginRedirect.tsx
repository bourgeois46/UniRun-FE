import {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {loginKakao} from '../api/memberAPI.ts';
import CookieManager from '@react-native-cookies/cookies';

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
          console.log('로그인 시도 응답:', loginData.data); // 응답 데이터 확인

          if (loginData.data.status === 200) {
            Alert.alert(
              '로그인 성공',
              '카카오 로그인이 성공적으로 완료되었습니다.',
            ); 
            console.log('handleLoginSuccess 호출'); // 이 부분에 로그 추가
            handleLoginSuccess();  

            const setCookieHeader = loginData.headers['set-cookie'];
            console.log('쿠키 헤더:', setCookieHeader); // 쿠키 헤더 로그 확인

            if (setCookieHeader && setCookieHeader.length > 0) {
              const sessionCookie = setCookieHeader[0].split(';')[0].split('=')[1]; // 'SESSIONID' 값 추출
              console.log('SESSIONID:', sessionCookie); // SESSIONID 로그 확인

              // 쿠키 저장
              await CookieManager.set('http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com', {
                name: 'SESSIONID',
                value: sessionCookie,
                domain: 'ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com',
                path: '/',
              });
              console.log('로그인 쿠키 저장됨:', sessionCookie);
            }
          } else {
            if (loginData.data.status === 401){
            console.log('401 에러 응답:', loginData.data); // 401 응답 확인
             Alert.alert(
              '회원가입 필요',
              '회원가입을 먼저 진행해주세요.',
             );
             navigation.navigate('Input');
            } else if (loginData.data.status === 500){
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
          console.log('로그인 오류:', err.message); // 오류 로그 확인
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
    console.log('handleLoginSuccess:', handleLoginSuccess); // LoginRedirect 컴포넌트에서 추가
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
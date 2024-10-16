import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
//import {REACT_APP_REST_API_KEY, REACT_APP_REDIRECT_URI} from '@env';

type RootStackParamList = {
  LoginRedirect: { token: string };
};

const LoginWebview = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const REACT_APP_REST_API_KEY = '7845a080f472eabd0d3ca3a3152d1962';
  const REACT_APP_REDIRECT_URI =('http://ec2-54-180-232-224.ap-northeast-2.compute.amazonaws.com/user/auth');
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: KAKAO_AUTH_URI}}
        onNavigationStateChange={e => {
          if (e.url.startsWith(REACT_APP_REDIRECT_URI)) {
            const code = e.url.split('code=')[1];
            navigation.navigate('LoginRedirect', { token: code });
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default LoginWebview;
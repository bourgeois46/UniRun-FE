import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
    Input: { walletRealAddress: string };
};

const MetaMaskWebview = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const METAMASK_AUTH_URI = 'https://metamask.io/'; // MetaMask 연동 URL

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: METAMASK_AUTH_URI}}
        onNavigationStateChange={e => {
          // MetaMask 연동 후 처리 로직 추가
         /* if (e.url.startsWith('your-redirect-uri')) {
            const walletAddress = e.url.split('walletAddress=')[1];
            navigation.navigate('Input', { walletRealAddress });
          }*/
         const walletRealAddress = e.url.split('walletAddress=')[1];
         if (walletRealAddress) {
            navigation.navigate('Input', { walletRealAddress });
          };
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

export default MetaMaskWebview;

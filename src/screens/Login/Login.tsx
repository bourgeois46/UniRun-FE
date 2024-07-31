import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Input: undefined;
};

const Login: React.FC<{}> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = () => {
    navigation.navigate('Input');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.main} source={require('../../../assets/main.png')} />
      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Image source={require('../../../assets/login.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    resizeMode: 'contain',
    position: 'absolute',
    top: '74%',
  },
});

export default Login;

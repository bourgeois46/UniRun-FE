import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


type RootStackParamList = {
  Login: undefined;
  Input: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Login: React.FC = () => {
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

const InputScreen: React.FC = () => {
  return (
    <View>
      {/* Input screen content */}
    </View>
  );
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Input" component={InputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

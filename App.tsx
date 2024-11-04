import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from './src/screens/Calendar/Calendar';
import CheckRun from './src/screens/Calendar/CheckRun';
import CreateRun from './src/screens/Calendar/CreateRun';
import Mypage from './src/screens/My/Mypage';
import Home from './src/screens/Home/Home';
import Nft from './src/screens/NFT/Nft';
import Login from './src/screens/Login/Login';
import Input from './src/screens/Login/Input';
import Running from './src/screens/Home/Running';
import Record from './src/screens/Home/Record';  // Record는 스택에서 사용
import MyRunning from './src/screens/My/MyRunning';
import LoginWebview from './src/components/LoginWebview';
import LoginRedirect from './src/components/LoginRedirect';
import MetaMaskWebview from './src/components/MetaMaskWebview';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  LoginWebview: undefined;
  LoginRedirect: undefined;
  Input: undefined;
  Calendar: undefined;
  CheckRun: undefined;
  CreateRun: undefined;
  Nft: undefined;
  Running: undefined;
  Record: undefined;
  Mypage: undefined;
  MyRunning: undefined;
  Home: undefined;
  MetaMaskWebview: undefined;
};

type HeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  back?: boolean;
};

const Header: React.FC<HeaderProps> = ({ navigation, back }) => {
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backIconContainer}>
          <Image
            style={styles.backIcon}
            source={require('./assets/back.png')}
          />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./assets/duck.png')} />
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Running"
      component={Running}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Record"
      component={Record}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const MyStack = createNativeStackNavigator();

const MyStackScreen = ({ handleLoginSuccess, handleLogoutSuccess, isLogged }: { 
  handleLoginSuccess: () => void, 
  handleLogoutSuccess: () => void, 
  isLogged: boolean }) => (
  <MyStack.Navigator>
     <MyStack.Screen
      name="Mypage"
      options={{ headerShown: false }}
    >
      {props => <Mypage {...props} handleLogoutSuccess={handleLogoutSuccess} />}
    </MyStack.Screen>
    <MyStack.Screen
      name="MyRunning"
      component={MyRunning}
      options={{ headerShown: false }}
    />
    <MyStack.Screen
      name="Input"
      options={{ headerShown: false }}
    >
      {props => <Input {...props} handleLoginSuccess={handleLoginSuccess} isLogged={isLogged} />}
    </MyStack.Screen>
  </MyStack.Navigator>
);

const Calstack = createNativeStackNavigator();

const CalStackScreen = () => (
  <Calstack.Navigator>
    <Calstack.Screen
      name="Calendar"
      component={Calendar}
      options={{ headerShown: false }}
    />
    <Calstack.Screen
      name="CheckRun"
      component={CheckRun}
      options={{ headerShown: false }}
    />
    <Calstack.Screen
      name="CreateRun"
      component={CreateRun}
      options={{ headerShown: false }}
    />
  </Calstack.Navigator>
);

const MainScreen = ({ handleLoginSuccess, handleLogoutSuccess, isLogged}: { 
  handleLoginSuccess: () => void, 
  handleLogoutSuccess: () => void,
  isLogged: boolean
}) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarItemStyle: {
          flex: 1,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image
              style={styles.tabIcon}
              source={require('./assets/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CalStack"
        component={CalStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.tabIcon}
              source={require('./assets/calendar.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Nft"
        component={Nft}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.tabIcon}
              source={require('./assets/nft.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyStack"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image style={styles.tabIcon} source={require('./assets/my.png')} />
          ),
        }}>
          {props => (
          <MyStackScreen 
            {...props} 
            handleLoginSuccess={handleLoginSuccess} 
            handleLogoutSuccess={handleLogoutSuccess} 
            isLogged={isLogged}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = (): React.JSX.Element => {
  const [isLogged, setIsLogged] = useState(false); // true -> 로그인된 상태, false -> 로그인 전 상태
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleLoginSuccess = () => {
    console.log('로그인 성공 - isLogged를 true로 변경');
    setIsLogged(true);
    setIsInitialLoad(false); 
  };

  const handleLogoutSuccess = () => {
    setIsLogged(false);
    setIsInitialLoad(true);
  };

  useEffect(() => {
    console.log('현재 isLogged 상태:', isLogged); // 상태 변경 확인을 위한 로그
  }, [isLogged]);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaView}>
        <Stack.Navigator initialRouteName={isLogged ? 'Main' : 'Login'}>
          {isLogged ? (
            <>
              <Stack.Screen
                name="Main"
                options={({ navigation }) => ({
                  header: () => <Header navigation={navigation} back={true} />,
                })}>
                {props => (
                  <MainScreen
                    {...props}
                    handleLoginSuccess={handleLoginSuccess}
                    handleLogoutSuccess={handleLogoutSuccess}
                    isLogged={isLogged}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginWebview"
                options={{ headerShown: false }}
                component={LoginWebview}
              />
              <Stack.Screen
                name="MetaMaskWebview"  
                component={MetaMaskWebview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginRedirect"
                options={{ headerShown: false }}
              >
                {(props) => (<LoginRedirect {...props} handleLoginSuccess={handleLoginSuccess} />)}
              </Stack.Screen>
              <Stack.Screen
                name="Input"
                options={{ headerShown: false }}
              >
                {(props) => (<Input {...props} handleLoginSuccess={handleLoginSuccess} isLogged={isLogged}/>)}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: -15,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  },
  backIconContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    left: 13,
  },
  placeholder: {
    width: 18,
  },
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default App;

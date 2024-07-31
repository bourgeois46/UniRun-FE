import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from './src/screens/Calendar/Calendar';
import Mypage from './src/screens/My/Mypage';
import Home from './src/screens/Home/Home';
import Nft from './src/screens/NFT/Nft';
import Login from './src/screens/Login/Login';
import Input from './src/screens/Login/Input';
import Running from './src/screens/Home/Running';
import Record from './src/screens/Home/Record';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Input: undefined;
  Home: undefined; 
  Calendar: undefined; 
  Nft: undefined;
  Running: undefined;
  Record: undefined;
};

type HeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  back?: boolean;
};

const Header: React.FC<HeaderProps> = ({ navigation, back }) => {
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity onPress={() => navigation.pop()} style={styles.backIconContainer}>
          <Image style={styles.backIcon} source={require('./assets/back.png')} />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./assets/duck.png')} />
      </View>
      <View style={styles.placeholder} />
    </View>
  );
}


const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarItemStyle: {
          flex: 1,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
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
        name="Calendar"
        component={Calendar}
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
        name="Mypage"
        component={Mypage}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.tabIcon}
              source={require('./assets/my.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = (): React.JSX.Element => {
  const [isLogged, setIsLogged] = useState(true);

  const handleLoginSuccess = () => {
    setIsLogged(true);
  };

  const handleLogoutSuccess = () => {
    setIsLogged(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? "Main" : "Login"}>
      {isLogged ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
             <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
            <Stack.Screen
              name="Calendar"
              component={Calendar}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
            <Stack.Screen
              name="Nft"
              component={Nft}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
             <Stack.Screen
              name="Running"
              component={Running}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
             <Stack.Screen
              name="Record"
              component={Record}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Input"
              component={Input}
              options={{ headerShown: false }}
            />
            {/* 카카오 로그인 연동 후 삭제 */}
             <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                header: () => <Header navigation={navigation} back={true} />,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    resizeMode: "contain",
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    left: 13,
  },
  placeholder: {
    width: 18,
  },
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default App;




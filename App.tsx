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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Input: undefined;
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

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);

const CalendarStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CalendarScreen"
      component={Calendar}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} back={true} />,
      })}
    />
  </Stack.Navigator>
);

const NftStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NftScreen"
      component={Nft}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} back={true} />,
      })}
    />
  </Stack.Navigator>
);

const MypageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MypageScreen"
      component={Mypage}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} back={true} />,
      })}
    />
  </Stack.Navigator>
);

// MainScreen과 독립적
const InputStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="InputScreen"
      component={Input}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} back={true} />,
      })}
    />
  </Stack.Navigator>
);

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          height: 80,
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          flex: 1,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
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
        name="CalendarTab"
        component={CalendarStack}
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
        name="NftTab"
        component={NftStack}
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
        name="MypageTab"
        component={MypageStack}
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
  const [isLogged, setIsLogged] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? "Main" : "Login"}>
        {isLogged ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
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
              component={InputStack}
              options={{ headerShown: false }}
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
    width: 18, // backIcon과 동일한 너비
  },
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default App;



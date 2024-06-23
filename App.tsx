import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Calendar from './src/screens/Calendar/Calendar';
import Mypage from './src/screens/My/Mypage';
import Home from './src/screens/Home/Home';
import Nft from './src/screens/NFT/Nft';
import Login from './src/screens/Login/Login';
import Input from './src/screens/Login/Input';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type HeaderProps = {
  navigation: NativeStackNavigationProp<any, any>;
  back?: boolean;
};

const Header: React.FC<HeaderProps> = ({navigation, back}) => {
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.back}>
          <Image
            style={styles.back}
            source={require('./assets/back.png')} 
          />
        </TouchableOpacity>
      )}
      <View>
        <Image
          style={styles.back}
          source={require('./assets/duck.png')}
        />
      </View>
    </View>
  );
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={({navigation}) => ({
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
      options={({navigation}) => ({
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
      options={({navigation}) => ({
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
      options={({navigation}) => ({
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
          tabBarIcon: () => (
            <Image
              style={styles.back}
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
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.back}
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
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.back}
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
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.back}
              source={require('./assets/my.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? "Main" : "Login"}>
        {isLogged ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Input"
              component={Input}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    // 스타일 정의
  },
  back: {
    width: 30,
    height: 30,
  }
});

export default App;

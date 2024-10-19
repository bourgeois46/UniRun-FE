import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import { logoutKakao } from '../../api/memberAPI';
import { withdrawalKakao } from '../../api/memberAPI';
import {Alert} from 'react-native';

type RootStackParamList = {
  MyRunning: undefined;
  Input: undefined;
  Login: undefined;
};

type MypageNavigationProp = StackNavigationProp<RootStackParamList>;

const Mypage: React.FC<{ handleLogoutSuccess: () => void }> = ({ handleLogoutSuccess }) => {
  const navigation = useNavigation<MypageNavigationProp>();

  const handleButtonClick = () => {
    navigation.navigate('MyRunning');
  };

  const handleFixButtonClick = () => {
    navigation.navigate('Input');
  };

  const handleLogout = async () => {
    try {
      const response = await logoutKakao(); 
      if (response && response.status === 200) { 
        handleLogoutSuccess();
        navigation.navigate('Login');
      }  else if (response && response.status === 500) {
        Alert.alert('로그아웃 오류', response.message || '로그아웃 중 문제가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('로그아웃 오류', '로그아웃 중 문제가 발생했습니다.');
      console.error('Logout Error:', error);
    }
  };
  

  const handleWithdrawal = async () => {
    try {
      const response = await withdrawalKakao(); 
      if (response && response.status === 200) { 
        handleLogoutSuccess();
        navigation.navigate('Login');
      }  else if (response && response.status === 500) {
        Alert.alert('회원탈퇴 오류', response.message || '회원탈퇴 중 문제가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('회원탈퇴 오류', '회원탈퇴 중 문제가 발생했습니다.');
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/myBanner.png')}
        style={styles.banner}
      />
      <Text style={styles.name}>러닝덕</Text>
      <Text style={styles.univ}>동덕여자대학교</Text>

      <TouchableOpacity onPress={handleFixButtonClick}>
        <Image source={require('../../../assets/fix.png')} style={styles.fix} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.myRunningContainer}>
            <Text style={styles.myRunning}>나의 러닝</Text>
            <Image
              source={require('../../../assets/vector.png')}
              style={styles.vector}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>로그아웃</Text>
        </TouchableOpacity>

        <View style={[styles.horizontalLine, {marginTop: -45}]} />

        <TouchableOpacity onPress={handleWithdrawal}>
          <Text style={styles.withdrawal}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#0F2869',
    borderRadius: 10,
    top: 50,
    width: 340,
    height: 170,
  },
  banner: {
    resizeMode: 'cover',
    top: 0,
    width: '102%',
    position: 'absolute',
  },
  fix: {
    top: 20,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
  },
  univ: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8591B3',
    marginTop: 8,
  },
  myRunningContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  myRunning: {
    right: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 100, // 컨테이너 내부 요소 사이 공간
    bottom: 25,
  },
  vector: {
    bottom: 20,
  },
  logout: {
    right: 105,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A7334A',
    bottom: 10,
  },
  withdrawal: {
    right: 105,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D9D9D9',
    top: 20,
  },
  horizontalLine: {
    position: 'absolute',
    width: '90%',
    top: 105,
    height: 1,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    marginVertical: 5,
  },
});

export default Mypage;
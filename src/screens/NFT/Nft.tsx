import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import UnivList from '../../components/UnivList';
import MyList from '../../components/MyList';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddressModal from '../../modal/AddressModal';
import { getRemainToken } from '../../api/blockchainAPI';
import { Alert } from 'react-native';

const Nft: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('마스코트');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [remainToken, setRemainToken] = useState<number>(0); 

  const handleLabelPress = (label: string) => {
    setSelectedLabel(label);
  };

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  // 토큰 잔액 조회 
  useEffect(() => {
    const handleRemainToken = async () => {
      const remainToken = await getRemainToken();
      if (remainToken !== null) {
        setRemainToken(remainToken); 
      } else {
        Alert.alert('잔액 조회 오류', '토큰 잔액을 가져올 수 없습니다.');
      }
    };

    handleRemainToken(); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/nftBanner.png')}
        style={styles.banner}
      />
      
      <View style={styles.rdcontainer}>
        <Text style={styles.rd}>{remainToken}</Text>
        <Text style={styles.rd}> RD</Text>
      </View>

      <TouchableOpacity onPress={onPressModalOpen}>
          <Image
            source={require('../../../assets/addressButton.png')}
            style={styles.addressButton}
          />
      </TouchableOpacity>

      <View style={styles.labelContainer}>
        <TouchableOpacity onPress={() => handleLabelPress('마스코트')}>
          <Text
            style={[
              styles.label,
              {color: selectedLabel === '마스코트' ? '#0F2869' : '#CBCBCB'},
            ]}>
            학교 마스코트
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLabelPress('아이템')}>
          <Text
            style={[
              styles.label,
              {color: selectedLabel === '아이템' ? '#0F2869' : '#CBCBCB'},
            ]}>
            나의 아이템
          </Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />
      </View>

      {selectedLabel === '마스코트' ? <UnivList /> : <MyList />}

      <AddressModal
        visible={isModalVisible}
        onClose={onPressModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    resizeMode: 'cover',
    top: 0,
    width: 393,
    height: 220,
  },
  addressButton: {
    top: -130,
    width: 50,
  },
  msg: {
    resizeMode: 'cover',
    width: '102%',
    position: 'absolute',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
    padding: 0,
    top: -60
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 30,
  },
  horizontalLine: {
    position: 'absolute',
    width: '106%',
    height: 1,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    marginVertical: 5,
    left: -90,
    top: 60,
  },
  rdcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -25,
    left: 10,
    
  },
  rd: {
    fontWeight: 'bold',
  }
});

export default Nft;

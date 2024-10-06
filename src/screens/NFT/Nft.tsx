import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import UnivList from '../../components/UnivList';
import MyList from '../../components/MyList';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddressModal from '../../modal/AddressModal';

const Nft: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('마스코트');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleLabelPress = (label: string) => {
    setSelectedLabel(label);
  };

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/nftBanner.png')}
        style={styles.banner}
      />

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
    // resizeMode: 'cover',
    top: 0,
    width: 393,
    height: 220,
  },
  addressButton: {
    top: -100,
    width: 45,
    height: 45,
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
    top: -40
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
});

export default Nft;

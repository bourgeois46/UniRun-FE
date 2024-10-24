import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import GetItemModal from '../modal/GetItemModal';

type UnivItemProps = {
  universityUrl: string;
  tokenURI: string;
  universityName: string;
  tokenPrice: number;
  tokenId: any;
};

const UnivItem: React.FC<UnivItemProps> = ({universityUrl, tokenURI, universityName, tokenPrice, tokenId}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPressModalOpen}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: tokenURI}} style={styles.mascot} /> 
        </View>

        <View style={styles.univContainer}>
        <Image source={{uri: universityUrl}} style={styles.logo}/>
          <Text style={[styles.name, {marginLeft: 10}]}>{universityName}</Text>
        </View>

        <View>
        <Text style={styles.tokenId}>#{tokenId}</Text>
        </View>

        <Image source={require('../../assets/rd.png')} style={styles.rdImg} />
        <View style={styles.rdContainer}>
          <Text style={styles.rd}>{tokenPrice}</Text>
        </View>
      </TouchableOpacity>

      <GetItemModal visible={isModalVisible} onClose={onPressModalClose} />
    </>
  );
};

const styles = StyleSheet.create({
  tokenId: {
    fontSize: 13,
    backgroundColor: '#EFF3FE', 
    color: '#739DF5', 
    paddingHorizontal: 8, 
    paddingVertical: 2,
    borderRadius: 5, 
    fontWeight: 'bold', 
    top: 20, 
    right: 40, 
  },
  imageWrapper: {
    borderWidth: 0.8,              
    borderColor: '#D9D9D9',      
    borderRadius: 20,             
    padding: 8, 
    justifyContent: 'center',     
    alignItems: 'center',                
    marginLeft: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  univContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -10,
  },
  msg: {
    resizeMode: 'cover',
    width: '102%',
    position: 'absolute',
  },
  mascot: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logo: {
    width: 28,
    height: 28,
    top: -5,
    resizeMode: 'contain',
    marginLeft: 25,
  },
  name: {
    width : 70,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  rdContainer: {
    width: 100,
  },
  rd: {
    color: 'black',
    fontWeight: 'bold',
    left: 38,
    fontSize: 12,
  },
  rdImg: {
    marginLeft: 50,
    left: 30,
    resizeMode: 'contain',
  },
  
});

export default UnivItem;

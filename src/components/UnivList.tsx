import React from 'react';
import {Image, StyleSheet, FlatList} from 'react-native';
import UnivItem from './UnivItem';

const mockData = [
  {
    universityUrl: require('../../assets/m1.png'),
    tokenURI: require('../../assets/l1.png'), // 학교 로고
    universityName: '중앙대학교',
    tokenPrice: 130.25,
    tokenId: 0,
  },
  {
    universityUrl: require('../../assets/m2.png'),
    tokenURI: require('../../assets/l2.png'),
    universityName: '고려대학교',
    tokenPrice: 921.0,
    tokenId: 0,
  },
  {
    universityUrl: require('../../assets/m3.png'),
    tokenURI: require('../../assets/l3.png'),
    universityName: '연세대학교',
    tokenPrice: 1204.6,
    tokenId: 0,
  },
  {
    universityUrl: require('../../assets/m4.png'),
    tokenURI: require('../../assets/l4.png'),
    universityName: '건국대학교',
    tokenPrice: 269.2,
    tokenId: 0,
  },
];

const UnivList: React.FC = () => {
  return (
    <>
      <Image source={require('../../assets/nftMsg.png')} style={styles.msg} />
      <FlatList
        data={mockData}
        renderItem={({item}) => (
          <UnivItem
            universityUrl={item.universityUrl}
            tokenURI={item.tokenURI}
            universityName={item.universityName}
            tokenPrice={item.tokenPrice}
            tokenId={item.tokenId}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    top: 0, 
  },
  msg: {
    resizeMode: 'cover',
    width: '102%',
    position: 'absolute',
    top: 300,
  },
});

export default UnivList;

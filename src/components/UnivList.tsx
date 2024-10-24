import React from 'react';
import {Image, StyleSheet, FlatList} from 'react-native';
import UnivItem from './UnivItem';

const mockData = [
  {
    mascot: require('../../assets/m1.png'),
    logo: require('../../assets/l1.png'),
    name: '중앙대학교',
    rd: 130.25,
  },
  {
    mascot: require('../../assets/m2.png'),
    logo: require('../../assets/l2.png'),
    name: '고려대학교',
    rd: 921.0,
  },
  {
    mascot: require('../../assets/m3.png'),
    logo: require('../../assets/l3.png'),
    name: '연세대학교',
    rd: 1204.6,
  },
  {
    mascot: require('../../assets/m4.png'),
    logo: require('../../assets/l4.png'),
    name: '건국대학교',
    rd: 269.2,
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
            mascot={item.mascot}
            logo={item.logo}
            name={item.name}
            rd={item.rd}
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
    top: 290,
  },
});

export default UnivList;

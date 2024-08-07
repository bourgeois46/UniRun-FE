import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// import MyItem from './MyItem';

const mockData = [
  { mascot: require('../../assets/m1.png'), logo: require('../../assets/l1.png'),  name: '중앙대학교', rd: 130.25 },
  { mascot: require('../../assets/m2.png'), logo: require('../../assets/l2.png'),  name: '고려대학교', rd: 921.00  },
  { mascot: require('../../assets/m3.png'), logo: require('../../assets/l3.png'),  name: '연세대학교', rd: 1204.60  },
  { mascot: require('../../assets/m4.png'), logo: require('../../assets/l4.png'),  name: '건국대학교', rd: 269.20  },
];

const MyList: React.FC = () => {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <MyItem
          mascot={item.mascot}
          logo={item.logo}
          name={item.name}
          rd={item.rd}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default MyList;
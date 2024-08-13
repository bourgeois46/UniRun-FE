import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MyItem from './MyItem';

const mockData = [
  {
    item: require('../../assets/item1.png'),
    logo: require('../../assets/l1.png'),
  },
  {
    item: require('../../assets/item2.png'),
    logo: require('../../assets/l2.png'),
  },
];

const MyList: React.FC = () => {
  return (
    <FlatList
      data={mockData}
      renderItem={({item}) => <MyItem item={item.item} />}
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

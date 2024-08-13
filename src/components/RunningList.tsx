import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import RunningItem from './RunningItem';

const mockData = [
  {date: '2024. 6. 3', title: '공릉천 러닝', distance: '3.5 km', time: '26:06'},
  {
    date: '2024. 5. 2',
    title: '한강 번개 러닝',
    distance: '2.4 km',
    time: '30:11',
  },
  {
    date: '2024. 4. 13',
    title: '대치동 러닝',
    distance: '4.6 km',
    time: '28:58',
  },
  {date: '2024. 4. 8', title: '선릉동 러닝', distance: '2.0 km', time: '10:02'},
];

const RunningList: React.FC = () => {
  return (
    <FlatList
      data={mockData}
      renderItem={({item}) => (
        <RunningItem
          date={item.date}
          title={item.title}
          distance={item.distance}
          time={item.time}
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

export default RunningList;

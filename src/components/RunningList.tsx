import React, { useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import RunningItem from './RunningItem';

const RunningList: React.FC = () => {
  const [data, setData] = useState([
    {
      id: 1,
      date: '2024. 8. 29',
      title: '공릉천 러닝',
      distance: '3.5 km',
      time: '26:06',
    },
    {
      id: 2,
      date: '2024. 8. 15',
      title: '한강 번개 러닝',
      distance: '2.4 km',
      time: '30:11',
    },
    {
      id: 3,
      date: '2024. 7. 3',
      title: '대치동 러닝',
      distance: '4.6 km',
      time: '28:58',
    },
    {
      id: 4,
      date: '2024. 7. 1',
      title: '선릉동 러닝',
      distance: '2.0 km',
      time: '10:02',
    },
  ]);

  const handleDeleteItem = (id: number) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <RunningItem
          id={item.id}
          date={item.date}
          title={item.title}
          distance={item.distance}
          time={item.time}
          onDelete={handleDeleteItem}
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

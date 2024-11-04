import React, { useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ScheduleItem from './ScheduleItem';

const SchedukeList: React.FC = () => {
  const [data, setData] = useState([
    {
      id: 1,
      date: '2024. 9. 3',
      title: '한강런',
      distance: '3.5 km',
      time: '17:00',
      univ: '동덕여자대학교 두런두런',
      location: '월곡역 3번 출구',
    },
    {
      id: 2,
      date: '2024. 9. 7',
      title: '성북천 가볍게',
      distance: '2.4 km',
      time: '20:00',
      univ: '고려대학교 KUTR',
      location: '성북천 입구',
    },
    {
      id: 3,
      date: '2024. 9. 15',
      title: '어대 한바퀴',
      distance: '4.6 km',
      time: '06:00',
      univ: '건국대학교 RIKU',
      location: '어린이대공원 입구',
    },
  ]);

  const handleDeleteItem = (id: number) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <ScheduleItem
          id={item.id}
          date={item.date}
          title={item.title}
          time={item.time}
          univ={item.univ}
          location={item.location}
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

export default SchedukeList;

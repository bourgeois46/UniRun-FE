import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ScheduleItem from './ScheduleItem';

const mockData = [
  { date: '2024. 6. 3', title: '한강런', distance: '3.5 km', time: '17:00', univ: '동덕여자대학교 두런두런', location: '월곡역 3번 출구' },
  { date: '2024. 5. 2', title: '성북천 가볍게', distance: '2.4 km', time: '20:00', univ: '고려대학교 KUTR', location: '성북천 입구'  },
  { date: '2024. 4. 13', title: '어대 한바퀴', distance: '4.6 km', time: '06:00', univ: '건국대학교 RIKU', location: '어린이대공원 입구'  },
];

const SchedukeList: React.FC = () => {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <ScheduleItem
          date={item.date}
          title={item.title}
          time={item.time}
          univ={item.univ}
          location={item.location}
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
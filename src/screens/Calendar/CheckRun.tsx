import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';

const data = [
  {
    id: '1',
    title: '한강런',
    location: '동덕여자대학교 두런두런',
    time: '17:00 - 19:00',
    buttonText: '참여',
  },
  {
    id: '2',
    title: '성북천 가볍게',
    location: '고려대학교 KUTR',
    time: '20:00 - 21:00',
    buttonText: '참여',
  },
  {
    id: '3',
    title: '어대 한바퀴',
    location: '건국대학교 RIKU',
    time: '06:00 - 08:00',
    buttonText: '참여',
  },
  // 필요한 만큼 데이터 추가
];

const Item = ({title, location, time, buttonText}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text>{location}</Text>
    <Text>{time}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const CheckRun: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            title={item.title}
            location={item.location}
            time={item.time}
            buttonText={item.buttonText}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CheckRun;

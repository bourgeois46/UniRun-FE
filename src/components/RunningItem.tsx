import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import DeleteRecordModal from '../modal/DeleteRecordModal';

type RunningItemProps = {
  date: string;
  title: string;
  distance: string;
  time: string;
};

const RunningItem: React.FC<RunningItemProps> = ({ date, title, distance, time }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/my1.png')} style={[styles.icon, {left: 7}]}/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Image source={require('../../assets/my2.png')} style={styles.icon}/>
        </View>
        <Text style={styles.distance}>{distance}</Text>

        <View style={styles.iconContainer}>
          <Image source={require('../../assets/my3.png')} style={styles.icon}/>
        </View>
        <Text style={styles.time}>{time}</Text>

        <TouchableOpacity style={styles.iconContainer} onPress={onPressModalOpen}  >
          <Image source={require('../../assets/my4.png')} style={[styles.icon, {left: 6}]}/>
        </TouchableOpacity>

        <DeleteRecordModal visible={isModalVisible} onClose={onPressModalClose} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
    borderBottomColor: '#D9D9D9',
    paddingVertical: 25, // item 간 간격
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 40, // 아이콘의 고정된 위치를 위해 너비 설정
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1, // 텍스트 컨테이너가 가변적으로 공간 차지
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    color: '#D9D9D9',
  },
  distance: {
    color: 'black',
  },
  time: {
    marginLeft: 3,
    color: 'black',
  },
});

export default RunningItem;

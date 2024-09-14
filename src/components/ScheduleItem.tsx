import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DeleteScheduleModal from '../modal/DeleteScheduleModal';

type ScheduleItemProps = {
  id: number;
  date: string;
  title: string;
  time: string;
  location: string;
  univ: string;
  onDelete: (id: number) => void;
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  date,
  location,
  univ,
  title,
  time,
  onDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    onDelete(id); // id를 사용하여 삭제
    onPressModalClose(); // 모달 닫기
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.univ}>{univ}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={[styles.iconWrapper, {left: 18}]}>
            <Image
              source={require('../../assets/my1.png')}
              style={styles.icon}
            />
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.iconWrapper}>
            <Image
              source={require('../../assets/my3.png')}
              style={[styles.icon, {left: 32}]}
            />
            <Text style={styles.time}>{time}</Text>
          </View>

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={onPressModalOpen}>
            <Image
              source={require('../../assets/my4.png')}
              style={[styles.icon, {left: 32}]}
            />
          </TouchableOpacity>

          <DeleteScheduleModal
            visible={isModalVisible}
            onClose={onPressModalClose}
            onDelete={handleDelete}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: '#D9D9D9',
    paddingVertical: 15, // item 간 간격
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  textContainer: {
    flex: 1, // 텍스트 컨테이너가 더 많은 공간을 차지하도록 설정
    marginRight: 10, // 텍스트와 아이콘 사이의 간격 설정
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    resizeMode: 'contain',
    width: 70, // 각 아이콘과 텍스트가 고정된 위치에 있도록 너비 설정
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5, // 아이콘과 텍스트 사이의 간격 설정
  },
  icon: {
    resizeMode: 'contain',
    marginRight: 5, // 아이콘과 텍스트 사이의 간격 설정
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  univ: {
    color: '#b3b3b3',
    fontSize: 11,
  },
  date: {
    color: '#D9D9D9',
    fontSize: 11,
    fontWeight: '500',
  },
  location: {
    color: 'black',
    width: 120, // 위치 고정시키 위해 길이 고정
  },
  time: {
    color: 'black',
    left: 35,
  },
});

export default ScheduleItem;

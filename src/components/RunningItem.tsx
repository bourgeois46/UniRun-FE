import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DeleteRecordModal from '../modal/DeleteRecordModal';

type RunningItemProps = {
  id: number;
  date: string;
  title: string;
  distance: string;
  time: string;
  onDelete: (id: number) => void;
};

const RunningItem: React.FC<RunningItemProps> = ({
  id,
  date,
  title,
  distance,
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
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/my1.png')}
          style={[styles.icon, {left: 7}]}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Image source={require('../../assets/my2.png')} style={styles.icon} />
      </View>
      <Text style={styles.distance}>{distance}</Text>

      <View style={styles.iconContainer}>
        <Image source={require('../../assets/my3.png')} style={styles.icon} />
      </View>
      <Text style={styles.time}>{time}</Text>

      <TouchableOpacity style={styles.iconContainer} onPress={onPressModalOpen}>
        <Image
          source={require('../../assets/my4.png')}
          style={[styles.icon, {left: 6}]}
        />
      </TouchableOpacity>

      <DeleteRecordModal
        visible={isModalVisible}
        onClose={onPressModalClose}
        onDelete={handleDelete}
      />
    </View>
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
    width: 40, 
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1, 
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  date: {
    color: '#D9D9D9',
    fontWeight: '500',
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

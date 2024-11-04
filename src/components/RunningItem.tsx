import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DeleteRecordModal from '../modal/DeleteRecordModal';
import { deleteRunning } from '../api/runningAPI';

type RunningItemProps = {
  id: number;              
  date: string;         
  title: string;            
  distance: string;       
  time: string;           
  onDelete: (id: number) => void;  
  runningDataId: number | null;    // RunningDoneModal로부터 받아온 runningDataId 추가
};

const RunningItem: React.FC<RunningItemProps> = ({
  id,
  date,
  title,
  distance,
  time,
  onDelete,
  runningDataId,   // RunningDoneModal로부터 받아온 runningDataId 추가
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    if (runningDataId !== null) {   
      try {
        console.log('삭제할 runningDataId:', runningDataId);
        await deleteRunning(runningDataId);  
        onDelete(runningDataId);  // 삭제 후 콜백 함수 호출
      } catch (error) {
        console.error('삭제 오류:', error);
        Alert.alert('삭제 실패', '러닝 기록을 삭제하는 중 오류가 발생했습니다.');
      }
    } else {
      Alert.alert('삭제 불가', '러닝 데이터를 삭제할 수 없습니다.');
    }
    onPressModalClose();
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
    paddingVertical: 25, 
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

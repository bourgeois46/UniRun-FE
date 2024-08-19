import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CalendarModal from '../modal/CalendarModal';

type CalendarItemProps = {
  item: {
    type: string;
    title: string;
    crew: string;
    date: string;
    startTime: string;
    endTime: string;
    place: string;
    audienceType: string;
  };
};

const CalendarItem: React.FC<CalendarItemProps> = ({item}) => {
  // type에 따른 색상 결정
  const typeStyle =
    item.type === '번개'
      ? {backgroundColor: '#FEF5EF', color: '#F5A273'}
      : item.type === '정규'
      ? {backgroundColor: '#E7DEFF', color: '#8E6AF6'}
      : {backgroundColor: '#000', color: '#FFF'};

  // audienceType에 따른 색상 결정
  const audienceStyle =
    item.audienceType === '교내'
      ? {backgroundColor: '#EFF3FE', color: '#739DF5'}
      : item.audienceType === '전체'
      ? {backgroundColor: '#FEEFEF', color: '#F57373'}
      : {backgroundColor: '#000', color: '#FFF'};

  // const navigation = useNavigation();

  const [isParticipated, setIsParticipated] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleButtonClick = () => {
    if (isParticipated) {
      setModalMessage('이미 참여 신청이 완료된 일정입니다.');
    } else {
      setModalMessage('참여 신청이 완료되었습니다.');
      setIsParticipated(true);
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        <Text style={[styles.tag, audienceStyle]}>{item.audienceType}</Text>
        <Text style={[styles.tag, typeStyle]}>{item.type}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.crew}</Text>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/place.png')}
              style={styles.icon}
            />
            <Text style={styles.time}>
              {item.startTime} - {item.endTime}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/clock.png')}
              style={styles.icon}
            />
            <Text style={styles.place}>{item.place}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleButtonClick}>
            <Image
              source={require('../../assets/join_button.png')}
              style={styles.vector}
            />
          </TouchableOpacity>
        </View>

        <CalendarModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message={modalMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 74,
    paddingTop: 12.5,
    paddingLeft: 15,
    paddingBottom: 15,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 3.5,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 3.5,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'column',
    marginBottom: 3.5,
  },
  rightContainer: {
    flexDirection: 'column',
    bottom: 10,
    textAlign: 'right',
  },
  tag: {
    padding: 3,
    marginRight: 4,
    fontSize: 5.5,
    fontWeight: '500',
    paddingHorizontal: 2,
    borderRadius: 2.29,
    width: 16.958,
    height: 11,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  details: {
    fontSize: 8,
    fontWeight: '500',
    marginTop: 3.5,
    color: '#555',
  },
  time: {
    fontSize: 10,
    fontWeight: '500',
  },
  place: {
    fontSize: 10,
    fontWeight: '500',
  },
  buttonContainer: {
    right: 10,
  },
  vector: {
    width: 39,
    height: 24,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});

export default CalendarItem;

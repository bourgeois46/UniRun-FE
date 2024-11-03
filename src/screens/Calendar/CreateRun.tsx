import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Alert} from 'react-native';
import {createCalendar} from '../../api/calendarAPI';

type RootStackParamList = {
  Calendar: {
    newEvent: {
      type: string | null;
      title: string;
      crew: string;
      date: string | undefined;
      startTime: string | undefined;
      endTime: string | undefined;
      place: string;
      audienceType: string | null;
    };
  };
};

const CreateRun: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [crew, setCrew] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [place, setPlace] = useState<string>('');
  const [audienceType, setAudienceType] = useState<string | null>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const [events, setEvents] = useState<any[]>([]);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Calendar'>>();

  const showDatePicker = () => {
    setDatePickerVisibility(true); //모달 열기
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false); //모달 닫기
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker(); //모달 닫기
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true); //모달 열기
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false); //모달 닫기
  };

  const handleConfirmStartTime = (selectedTime: Date) => {
    setStartTime(selectedTime);
    hideStartTimePicker(); //모달 닫기
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true); //모달 열기
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false); //모달 닫기
  };

  const handleConfirmEndTime = (selectedTime: Date) => {
    setEndTime(selectedTime);
    hideEndTimePicker(); //모달 닫기
  };

  const handleSignup = async () => {
    if (!selectedType || !title || !crew || !date || !startTime || !endTime || !place || !audienceType) {
      Alert.alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (startTime >= endTime) {
      Alert.alert('종료 시간이 시작 시간보다 빨라야 합니다.');
      return;
    }

    const newEvent = {
      type: selectedType,
      title,
      crew,
      date: date?.toISOString().split('T')[0].replace(/-/g, '.'), // 날짜 형식 'YYYY.MM.DD'로 변환
      startTime: startTime?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간 형식으로 설정
      }),
      endTime: endTime?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간 형식으로 설정
      }),
      place,
      audienceType,
    };

    console.log('새로운 이벤트 정보:', newEvent);

    try {
      const response = await createCalendar(newEvent);
      console.log(newEvent);
      console.log(response);
      if (response && response.status === 200) {
        console.log('이벤트 생성 성공: ', response.data);

        // 생성된 이벤트 정보를 상태에 저장
        setEvents(prevEvents => [
          ...prevEvents,
          {...newEvent, id: response.data.id},
        ]); // ID 추가 가정

        // 캘린더 메인으로 새로운 이벤트 데이터 전달
        navigation.navigate('Calendar', {newEvent});
      } else {
        console.error('이벤트 생성 후 응답 데이터가 없습니다.');
        Alert.alert('이벤트 생성 오류');
      }
    } catch (error) {
      console.error('이벤트 생성 실패: ', error);
      Alert.alert('이벤트 생성 오류');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>러닝 일정 생성하기</Text>
      <Text style={styles.subtitle}>정보를 입력해 일정을 만들어보세요</Text>

      <View style={styles.formRow}>
        <Text style={styles.label}>유형</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '정규' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('정규')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '정규' && styles.selectedTypeButtonText,
              ]}>
              정규
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === '번개' && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType('번개')}>
            <Text
              style={[
                styles.typeButtonText,
                selectedType === '번개' && styles.selectedTypeButtonText,
              ]}>
              번개
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 한강런, 00런"
          onChangeText={setTitle}
          value={title}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>주최</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 러닝 크루 이름"
          onChangeText={setCrew}
          value={crew}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>날짜</Text>
        <View style={styles.rowlabel}>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={[styles.inputRow, styles.textInput]}
              placeholder="날짜를 선택하세요"
              value={date ? date.toISOString().split('T')[0] : ''}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePicker}>
            <Image
              source={require('../../../assets/calmodal.png')}
              style={styles.modalicon}
            />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>시간</Text>
        <View style={styles.timecolumn}>
          <View style={styles.labelcontainer}>
            <Text style={styles.coloredlabel}>시작 시간</Text>
            <TouchableOpacity onPress={showStartTimePicker}>
              <TextInput
                style={[styles.inputRow, styles.textInput]}
                placeholder="시작 시간 선택 → "
                value={
                  startTime
                    ? startTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={showStartTimePicker}>
              <Image
                source={require('../../../assets/startclock.png')}
                style={styles.timeicon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.labelcontainer}>
            <Text style={styles.coloredlabel}>종료 시간</Text>
            <TouchableOpacity onPress={showEndTimePicker}>
              <TextInput
                style={[styles.inputRow, styles.textInput]}
                placeholder="종료 시간 선택 → "
                value={
                  endTime
                    ? endTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={showEndTimePicker}>
              <Image
                source={require('../../../assets/endclock.png')}
                style={styles.timeicon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hideEndTimePicker}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>장소</Text>
        <TextInput
          style={[styles.inputRow, styles.textInput]}
          placeholder="ex) 홍대입구역 3번 출구"
          onChangeText={setPlace}
          value={place}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>대상</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              audienceType === '교내' && styles.selectedTypeButton,
            ]}
            onPress={() => setAudienceType('교내')}>
            <Text
              style={[
                styles.typeButtonText,
                audienceType === '교내' && styles.selectedTypeButtonText,
              ]}>
              교내
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              audienceType === '전체' && styles.selectedTypeButton,
            ]}
            onPress={() => setAudienceType('전체')}>
            <Text
              style={[
                styles.typeButtonText,
                audienceType === '전체' && styles.selectedTypeButtonText,
              ]}>
              전체
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Image
          source={require('../../../assets/createbtn.png')}
          style={styles.vector}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    top: 28,
    left: 23,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    top: 33,
    left: 23,
    fontSize: 14,
    color: '#CBCBCB',
    marginBottom: 20,
  },
  formRow: {
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
    justifyContent: 'space-between',
  },
  label: {
    left: 23,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    color: 'black',
    minWidth: 80,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    right: 15,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    borderColor: '#0F2869',
  },
  typeButtonText: {
    color: 'black',
  },
  selectedTypeButtonText: {
    color: '#0F2869',
    fontWeight: 'bold',
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#0F2869',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    textAlign: 'center',
    right: 15,
  },
  textInput: {
    color: '#0F2869',
    fontWeight: '500',
    fontSize: 16,
    width: 150,
  },
  timecolumn: {
    flexDirection: 'column',
    height: 50,
    left: -100,
  },
  labelcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    left: 54,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coloredlabel: {
    fontSize: 17,
    fontWeight: 'bold',
    left: -20,
    marginLeft: 7,
    color: '#0F2869',
    minWidth: 80,
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  vector: {
    top: 20,
    width: 350,
    height: 54,
  },
  modalicon: {
    width: 18,
    height: 20,
  },
  rowlabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
  },
  timeicon: {
    width: 18,
    height: 20,
    marginRight: -20,
  },
});

export default CreateRun;

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import RunningItem from './RunningItem';
import { getAllRunning } from '../api/runningAPI';

type RunningData = {
  runningDataId: number;
  runningDate: string;
  runningName: string;
  totalKm: number;
  totalTime: string;
};

const RunningList: React.FC = () => {
  const [data, setData] = useState<RunningData[]>([]);

  useEffect(() => {
    const handleRunningData = async () => {
      try {
        const runningData = await getAllRunning();  
        console.log('받은 러닝 데이터:', runningData);
        if (runningData && Array.isArray(runningData)) {
          //console.log('Setting data with:', runningData);
          setData(runningData); 
        } else {
          console.error('러닝 데이터가 배열이 아닙니다.');
        }
      } catch (error) {
        Alert.alert('데이터 오류', '러닝 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    handleRunningData();  
  }, []);

  const handleDeleteItem = (id: number) => {
    setData(prevData => prevData.filter(item => item.runningDataId !== id));
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
      //console.log('FlatList item:', item);  // 각 아이템 확인
    return (
      <RunningItem
        id={item.runningDataId}
        date={item.runningDate}
        title={item.runningName}
        distance={`${item.totalKm} km`}
        time={item.totalTime}
        onDelete={handleDeleteItem}
      />
    );
  }}
  keyExtractor={(item) => item.runningDataId.toString()}
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

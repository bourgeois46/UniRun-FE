import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type MyItemProps = {
  item: any;
};

const UnivItem: React.FC<MyItemProps> = ({ item }) => {
  return (
    <View style={styles.container} >    
      <Image source={item} style={styles.item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center'
  },
  item: {
    resizeMode: 'cover',
  },
});

export default UnivItem;

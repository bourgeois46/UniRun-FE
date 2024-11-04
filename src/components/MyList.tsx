import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import { geMyNfts } from '../api/blockchainAPI';

const MyList: React.FC = () => {
  const [nfts, setNfts] = useState<string[]>([]);

  useEffect(() => {
    const handleMyNfts = async () => {
      const data = await geMyNfts();
      if (data) {
        setNfts(data.map((item: any) => item.cardUri));
      }
    };
    handleMyNfts();
  }, []);

  return (
    <FlatList
      data={nfts}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <Image source={{uri: item}} style={styles.item} />
        </View>
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
  imageContainer: {
    flex: 1,
    alignItems: 'center',    
    justifyContent: 'center', 
    marginVertical: -30,
  },
  item: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
});

export default MyList;


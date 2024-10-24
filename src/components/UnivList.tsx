import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, FlatList} from 'react-native';
import UnivItem from './UnivItem';
import { getNftItems } from '../api/blockchainAPI';

const UnivList: React.FC = () => {
  const [nftItems, setNftItems] = useState<any[]>([]);

  useEffect(() => {
    const handleNftItems = async () => {
      const items = await getNftItems();
      //console.log('NFT Items:', items); 
      if (items) {
        setNftItems(items);
      }
    };
    
    handleNftItems();
  }, []);

  return (
    <>
      <Image source={require('../../assets/nftMsg.png')} style={styles.msg} />
      <FlatList
        data={nftItems}
        renderItem={({item}) => (
          <UnivItem
            universityUrl={item.universityUrl}
            tokenURI={item.tokenURI}
            universityName={item.universityName}
            tokenPrice={item.tokenPrice}
            tokenId={item.tokenId}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    top: 0, 
  },
  msg: {
    resizeMode: 'cover',
    width: '102%',
    position: 'absolute',
    top: 300,
  },
});

export default UnivList;

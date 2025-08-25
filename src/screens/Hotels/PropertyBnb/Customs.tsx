import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Bnb} from '@assets';
import {RF} from '@theme';
import useStyles from './styles';
import {Text} from '@components';
const dataHotel = [
  {id: 1, name: 'Apartments'},
  {id: 1, name: 'Homes'},
  {id: 1, name: 'Hotels, B&Bs & More'},
];
export default Customs = ({onClick}: {onClick?: any}) => {
  const styles = useStyles();
  return (
    <View style={{marginTop: RF(8)}}>
      <Text center size={12} SFregular color={'#0D47A1'}>
        Book with us, and unlock your dream stay on MediTour!"
      </Text>
      <Text size={14} SFmedium color={'#0D47A1'} center>
        Select Your Comfort Zone On MediTour{' '}
      </Text>
      <FlatList
        data={dataHotel}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.CommonStyle}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onClick(item.name)}
            style={styles.propertyStyle}>
            <Image source={Bnb} style={styles.ImgV} />
            <Text center size={16} SFregular color={'#0D47A1'}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

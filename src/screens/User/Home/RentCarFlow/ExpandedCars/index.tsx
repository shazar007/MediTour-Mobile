import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  CarFlatList,
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {Heart_Outlined, UserBell, backIcon, fill_favourite} from '@assets';
import {colors, navigate} from '@services';
import {RF} from '@theme';

const ExpandedCars = ({navigation, route}: any) => {
  const [toggle, setToggle] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const {allCars} = route.params;
  const {rentACarName} = route.params;
  const handleToggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={rentACarName}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={{marginHorizontal: RF(16), marginTop: RF(16)}}>
        <Text size={18} SFsemiBold color={colors.primary}>
          Top Rental Cars
        </Text>
      </View>

      <FlatList
        horizontal={false}
        data={allCars}
        contentContainerStyle={{
          paddingBottom: 150,
          marginHorizontal: RF(16),
          marginTop: RF(16),
        }}
        renderItem={({item}) => (
          // Render each item horizontally
          <CarFlatList
            onPress={() => navigate('CarDetails', {item: item})}
            item={item}
            width={'100%'}
            Bgclr={'#EBFAFC'}
          />
        )}
      />
    </View>
  );
};

export default ExpandedCars;

const styles = StyleSheet.create({});

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
import {UserBell, backIcon} from '@assets';
import {colors, margin, navigate, rs} from '@services';
import {RF} from '@theme';

const AllCars = ({navigation, route}: any) => {
  const [toggle, setToggle] = useState(false);
  const {cars} = route.params;
  const {rentACarName} = route.params;
  const [isFavorited, setIsFavorited] = useState(false);
  const handleToggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <CustomHeader
        title={rentACarName}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <Text
        size={18}
        SFsemiBold
        color={colors.primary}
        style={{margin: rs(16)}}>
        All Cars
      </Text>
      <FlatList
        horizontal={false}
        data={cars}
        contentContainerStyle={{
          paddingBottom: 150,
          marginHorizontal: RF(16),
        }}
        renderItem={({item}) => (
          // Render each item horizontally
          <CarFlatList
            onPress={() => navigate('CarDetails', {item: item})}
            item={item}
            width={'100%'}
            Bgclr={'#fff'}
          />
        )}
      />
    </Wrapper>
  );
};

export default AllCars;

const styles = StyleSheet.create({});

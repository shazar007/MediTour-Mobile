import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../text';
import {
  globalStyles,
  margin,
  padding,
  symptomCardsData,
} from '@services';
import SquareCards from '../SquareCards';
import {useTheme} from '@react-navigation/native';
import {RF, SCREEN_WIDTH} from '@theme';
import {
  Aesthetic,
  Bariatric,
  Cosmetic,
  Erectile,
  Fertility,
  Hair,
  Selction,
  STEM,
} from '@assets';

interface Props {
  title?: any;
  onPress?: any;
}
const data = [
  {id: 1, specialityTitle: 'Fertility', specialityLogo: Fertility},
  {id: 2, specialityTitle: 'Aesthetic Treatments', specialityLogo: Aesthetic},
  {id: 3, specialityTitle: 'Cosmetic Surgery', specialityLogo: Cosmetic},
  {id: 4, specialityTitle: 'Gender Selection', specialityLogo: Selction},
  {id: 5, specialityTitle: 'Stem Cell', specialityLogo: STEM},
  {id: 6, specialityTitle: 'Hair Transplant', specialityLogo: Hair},
  {id: 7, specialityTitle: 'Bariatric Surgery', specialityLogo: Bariatric},
  {id: 8, specialityTitle: 'Erectile Dysfunction', specialityLogo: Erectile},
];
const Symptomes_Disease = (props: Props) => {
  const {title, onPress} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
 
  return (
    <View style={margin.top_24}>
      <View style={globalStyles.row}>
        <Text size={18} SFsemiBold color={colors.primary}>
          {title}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text color={colors.primary} size={12} SFregular style={{textDecorationLine:'underline'}}>
           All Treatments
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{width: SCREEN_WIDTH}}
        contentContainerStyle={{
          paddingRight: RF(24),
        }}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <SquareCards item={item} />}
      />
    </View>
  );
};

export default Symptomes_Disease;

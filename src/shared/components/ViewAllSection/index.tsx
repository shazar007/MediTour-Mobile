import {FlatList, Image, Pressable, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Text} from '@components';
import {star} from '@assets';
import {useSelector} from 'react-redux';
import {RF} from '@theme';

const ViewAllSection = ({
  user,
  colors,
  styles,
  onPress,
  totalRating,
}: {
  user?: any;
  colors?: any;
  styles?: any;
  onPress?: any;
  totalRating?: any;
}) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <View style={styles.review}>
      <Text
        size={16}
        SFmedium
        color={colors.blueText}
        numberOfLines={1}
        style={{width: '60%'}}>
        {['Reviews For ', user]}
      </Text>
      {totalRating == 0 ? null : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={star}
            style={{
              height: 12,
              width: 12,
              marginRight: 5,
              resizeMode: 'contain',
            }}
          />
          <Text size={12} SFregular>
            {totalRating}
          </Text>
        </View>
      )}
      {totalRating == 0 ? null : (
        <Pressable
          onPress={onPress}
          style={{
            height: RF(30),
            width: RF(60),
            justifyContent: 'center',
          }}>
          <Text size={12} SFregular center>
            View All
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ViewAllSection;

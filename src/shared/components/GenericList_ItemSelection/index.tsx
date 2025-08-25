import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {FlatList, Pressable, View} from 'react-native';

const Generic_List_Item_Selection = ({
  data,
  mt,
  bgClr,
  lineClr,
  onPressItem,
}: {
  mt?: any;
  data?: any;
  bgClr?: any;
  lineClr?: any;
  onPressItem?: any;
}) => {
  return (
    <FlatList
    scrollEnabled={false}
      data={data}
      style={{backgroundColor: bgClr ? bgClr : '#D2CFCE', marginTop: mt}}
      renderItem={({item, index}: any) => {
        return (
          <Pressable onPress={() => onPressItem(item, index)}>
            <Text SFregular size={14} style={{margin: RF(5)}}>
              {item?.title}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: lineClr ? lineClr : '#000',
                marginTop: RF(10),
              }}
            />
          </Pressable>
        );
      }}
    />
  );
};

export default Generic_List_Item_Selection;

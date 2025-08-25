import {FlatList, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {navigate} from '@services';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CustomFlatTab = ({
  initialState,
  data,
  handlePress,
  contentContainerStyle,
}: {
  initialState?: any;
  data?: any;
  handlePress?: any;
  contentContainerStyle?: any;
}) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <Pressable
          onPress={() => {
            if (item?.move) {
              navigate(item.move);
            } else if (handlePress) {
              handlePress(item?.card1);
            }
          }}
          style={[
            styles.main,
            {
              backgroundColor:
                initialState == item.card1 ? changeColor : '#fff',
            },
          ]}>
          <Text
            SFmedium
            color={initialState == item?.card1 ? '#fff' : colors.grey}>
            {item?.card1}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default CustomFlatTab;

const styles = StyleSheet.create({
  main: {
    marginVertical: RF(4),
    marginHorizontal: RF(4),
    marginLeft: 2,
    marginRight: RF(8),
    borderRadius: RF(8),
    paddingVertical: RF(8),
    paddingHorizontal: RF(12),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});

import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import CardComponent from '../CardComponent';
interface Props {
  data?: any;
  onPress?: any;
}
const FlatListHome = ({onPress, data}: Props) => {
  const [distance, setDistance] = useState<any>('');
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text size={18} SFmedium color={colors.blueText}>
          {distance ? 'Under the Area of ' : 'Near Your Location'}
        </Text>
        {distance && (
          <Text size={18} SFmedium color={colors.blueText}>
            {distance.toString()} Km
          </Text>
        )}
      </View>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => (
          <CardComponent
            showValues
            color={colors.blueText}
            item={item}
            onPress={onPress}
            RatingTrue
            Size={9}
            style={{justifyContent: 'center'}}
          />
        )}
      />
    </View>
  );
};

export default FlatListHome;

import {FlatList, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
interface Props {
  Subtitle?: any;
  title?: any;
  data?: any;
}
const MedicineDetail = (props: Props) => {
  const {title, data} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={{marginTop: RF(8)}}>
      {title && (
        <Text size={16} SFbold color={colors.blueText}>
          {title}
        </Text>
      )}
      <FlatList
        // horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={{marginTop: RF(4), }}
        renderItem={({item}: any) => {
          return (
            <Text size={12} SFregular color={colors.blueText}>
              {item?.medicineId?.productName
                ? item?.medicineId?.productName
                : item}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default MedicineDetail;

import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import MeditourButton from '../MeditourButon';

interface Props {
  marginTop?: any;
  titleName?: any;
  dataArray?: any;
  SeeAll?:any;
}
const DiseasesCategory = ({marginTop, titleName, dataArray, SeeAll}: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={{marginTop: marginTop}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: RF(24),
        }}>
        <Text size={16} SFmedium color={colors.blueText}>
          {titleName}
        </Text>
        <TouchableOpacity onPress={SeeAll}>
          <Text size={12} SFregular color={colors.blueText}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginLeft: RF(24),
          marginTop: RF(8),
        }}>
        <MeditourButton
          back={'rgba(223, 216, 226, 1)'}
          size={12}
          data={dataArray}
          horizontal
          borderRadius={8}
          p_Vertical={RF(8)}
          marginRight={RF(8)}
          justifyContent={'flex-start'}
        />
      </View>
    </View>
  );
};

export default DiseasesCategory;

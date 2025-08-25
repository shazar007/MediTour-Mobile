import {View} from 'react-native';
import React from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {globalStyles, margin, padding} from '@services';
import {useTheme} from '@react-navigation/native';

const B2BDetailScreen = ({route}: any) => {
  const {item} = route?.params;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const style = margin?.top_8;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Test Detail'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={padding?.all_24}>
        <Text size={16} SFbold color={colors?.primary}>
          Test Detail
        </Text>
        <View style={margin?.Vertical_16}>
          <View style={globalStyles?.row}>
            <Text size={16} color={colors?.primary}>
              Test Code
            </Text>
            <Text size={16} color={colors?.primary}>
              {item?.testCode}
            </Text>
          </View>
          <View style={globalStyles?.row}>
            <Text size={16} color={colors?.primary}>
              Category Name
            </Text>
            <Text size={16} color={colors?.primary}>
              {item?.testNameId?.categoryName}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text size={16} color={colors?.primary} style={{width: '50%'}}>
              Test Name
            </Text>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                size={16}
                color={colors?.primary}
                style={{textAlign: 'right'}}>
                {item?.testNameId?.name}
              </Text>
            </View>
          </View>
          <View style={globalStyles?.row} {...style}>
            <Text size={16} color={colors?.primary}>
              Meditour Price
            </Text>
            <Text size={16} color={colors?.primary}>
              {item?.priceForMeditour}/-
            </Text>
          </View>
          <View style={{...globalStyles?.row}} {...style}>
            <Text size={16} color={colors?.primary}>
              Test Price
            </Text>
            <Text size={16} color={colors?.primary}>
              {item?.price}/-
            </Text>
          </View>
        </View>
        <Text size={16} SFbold color={colors?.primary}>
          Test Description
        </Text>

        <Text color={colors?.primary} style={margin?.top_16}>
          {item?.testDescription}
        </Text>
      </View>
    </Wrapper>
  );
};

export default B2BDetailScreen;

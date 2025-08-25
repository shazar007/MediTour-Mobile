import {StyleSheet, View} from 'react-native';
import React from 'react';
import {HeaderCard, UserHeaderContent, Wrapper} from '@components';
import { RF } from '@theme';

const InsuranceCompanyDet = () => {
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <HeaderCard notify numberOfIcons={'2'}>
          <UserHeaderContent ScreenTitle={response} />
        </HeaderCard>
        <View style={{height: RF(268)}}>
          {/* <Image source={item.} style={{width:'100%',height:'100%',}} /> */}
        </View>
      </View>
    </Wrapper>
  );
};

export default InsuranceCompanyDet;

const styles = StyleSheet.create({});

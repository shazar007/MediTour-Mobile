import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeaderCard, UserHeaderContent, Wrapper} from '@components';

const Overview = () => {
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard numberOfIcons={'3'} userName={false}>
        <UserHeaderContent ScreenTitle={'Order History'} />
      </HeaderCard>
    </Wrapper>
  );
};

export default Overview;

const styles = StyleSheet.create({});

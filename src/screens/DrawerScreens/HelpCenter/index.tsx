import {View} from 'react-native';
import React from 'react';
import {ComingSoon, HeaderCard, UserHeaderContent} from '@components';

const HelpCenter = () => {
  return (
    <View style={{flex: 1}}>
      <HeaderCard iconFlase numberOfIcons={'2'} title={'Hi, Wajahat Khan!'}>
        <UserHeaderContent ScreenTitle={'Help Center'} />
      </HeaderCard>
      <ComingSoon />
    </View>
  );
};

export default HelpCenter;

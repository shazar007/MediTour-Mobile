import {View} from 'react-native';
import React from 'react';
import {
  SectionHome,
  SectionHome1,
  SectionHome2,
  SectionHome3,
} from '@components';

const HomeSections = () => {
  return (
    <View>
      <SectionHome />
      <SectionHome1 />
      <SectionHome2 />
      <SectionHome3 />
    </View>
  );
};

export default HomeSections;

import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Section1, Section2, Section3} from '../SectionCards';
import * as Animatable from 'react-native-animatable';
import {rv} from '@services';

const ios = Platform.OS === 'ios';
const UserFlowCard = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.container}>
      <Text
        color={colors.primary}
        size={16}
        style={{
          marginBottom: rv(16),
        }}>
        How may we assist you?
      </Text>

      {/* DOCTORS - LABORATORY - PHARMACY */}

      <Section1 />

      {/* TRAVEL - HOME SERVICE - OPD */}
      <Section2 />

      {/* INSURANCE - DONATION */}
      <Section3 />
    </View>
  );
};

export default UserFlowCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

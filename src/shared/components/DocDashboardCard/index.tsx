import {arrowDown, arrowup} from '@assets';
import {margin} from '@services';
import {RF} from '@theme';
import React from 'react';
import {View, StyleSheet, TextProps, Image} from 'react-native';
import Text from '../text';
interface Props extends TextProps {
  text?: any;
  IconTrue?: any;
  bgColor?: any;
  headertitle?: any;
  BackgroundCOLOR?: any;
  title?: any;
  name?: any;
  percentage?: any;
}

const DocDashboardCard = (props: Props) => {
  const {IconTrue, title, name, percentage} = props;
  return (
    <View style={styles.card}>
      <Text size={11} SFsemiBold>
        {title}
      </Text>
      <Text color={'#FF842F'} style={margin?.top_8} size={16}>
        {name}
      </Text>
      {/* <View style={styles.rowContainer}>
        <View
          style={{
            height: RF(16),
            width: RF(16),
            borderRadius: 16,
            backgroundColor: '#FFEDD6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={arrowDown} style={styles.icon} />
        </View>
        <Text color={'#497E5A'} SFmedium size={9}>
          {percentage}
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: RF(95),
    borderRadius: RF(8),
    marginLeft: RF(5),
    elevation: 5,
    paddingHorizontal: RF(8),
    paddingVertical: RF(8),
    backgroundColor: '#fff',
    marginVertical: RF(8),
  },
  rowContainer: {
    marginTop: RF(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontSize: RF(8),
    // color: defaultTheme.colors.blueText,
  },
  icon: {
    width: RF(8),
    height: RF(8),
    resizeMode: 'contain',
    tintColor: '#FF842F',
  },
  text: {
    fontSize: RF(16),
    // color: defaultTheme.colors.blueText,
    fontWeight: '500',
  },
});

export default DocDashboardCard;

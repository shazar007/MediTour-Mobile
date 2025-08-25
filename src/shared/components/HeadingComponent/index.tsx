import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {Title} from '@assets';
interface Props {
  NameType?: any;
  Description?: any;
}
const HeadingComponent = (props: Props) => {
  const {NameType, Description} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View>
      <View style={styles.RowDirection}>
        <Image source={Title} style={styles.ImageView} />
        <Text size={16} SFmedium color={colors.blueText}>
          {NameType}
        </Text>
      </View>
      <Text size={12} SFregular color={colors.blueText} style={styles.disStyle}>
        {Description}
      </Text>
    </View>
  );
};

export default HeadingComponent;

const styles = StyleSheet.create({
  RowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RF(24),
    gap: RF(16),
  },
  ImageView: {width: RF(24), height: RF(24), resizeMode: 'contain'},
  disStyle: {marginTop: RF(16)},
});

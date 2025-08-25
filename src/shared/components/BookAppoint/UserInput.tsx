import React from 'react';
import Text from '../text';
import Line from '../Line';
import {LAYOUT, RF} from '@theme';
import {useSelector} from 'react-redux';
import {UserIcon, phone} from '@assets';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Image} from 'react-native';

interface Props {
  title?: any;
  m_Vertical?: any;
}

const UserInput = (props: Props) => {
  const {m_Vertical, title} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {user} = useSelector((state: any) => state.root.user);

  return (
    <View>
      <Text SFmedium size={18} color={colors.blueText} style={styles.line}>
        {title}
      </Text>

      <View style={[styles.container, {marginVertical: m_Vertical}]}>
        <Section colors={colors} title={user?.name} src={UserIcon} />
        <Section colors={colors} title={user?.phone} src={phone} />
      </View>

      <Text
        size={18}
        SFregular
        color={colors.orange}
        style={{lineHeight: RF(19), marginTop: LAYOUT.MARGIN.VERYHIGH}}>
        Book now to received the clinic's address and phone
      </Text>
    </View>
  );
};

export default UserInput;

const Section = ({
  src,
  title,
  colors,
}: {
  src?: any;
  title?: any;
  colors?: any;
}) => {
  return (
    <>
      <View style={styles.view}>
        <Image
          source={src}
          style={styles.img}
          resizeMode={'contain'}
          tintColor={colors.blueText}
        />
        <Text size={16} SFregular color={colors.blueText} style={styles.txt}>
          {title}
        </Text>
      </View>

      <Line colors={'#BDB8B8'} />
    </>
  );
};

const styles = StyleSheet.create({
  line: {lineHeight: RF(19)},
  container: {
    marginTop: LAYOUT.MARGIN.NORMAL,
  },
  img: {width: RF(20), height: RF(20)},
  txt: {lineHeight: RF(19.09), marginLeft: RF(16)},
  view: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
});

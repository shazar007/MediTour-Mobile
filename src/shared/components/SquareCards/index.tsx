import {Pressable, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {Image} from 'react-native';
import {margin, navigate} from '@services';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import randomcolor from 'randomcolor';
import {RF} from '@theme';
interface Props {
  item?: any;
}

const SquareCards = (props: Props) => {
  const {item} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const randomBackgroundColor = randomcolor();
  return (
    <Pressable
      onPress={() =>
        navigate('SymptomsAll', {
          type: 'speciality',
          specialityTitle: item?.specialityTitle,
        })
      }
      style={styles.mainView}>
      <View style={styles.cardContainer}>
        {/* <LinearGradient
        colors={[randomBackgroundColor, 'rgba(255, 255, 255, 0.04)']}
        start={{x: 0, y: 0}}
        end={{x: 1.5, y: 0}}
        style={styles.cardContainer}>
      </LinearGradient> */}
        <Image source={item.specialityLogo} style={styles.icon} />
      </View>
      <Text
        SFmedium
        color={'rgba(0, 39, 109, 1)'}
        style={{...margin.top_8, width: 96}}
        center>
        {item.specialityTitle}
      </Text>
    </Pressable>
  );
};

export default SquareCards;

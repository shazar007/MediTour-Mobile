import {
  View,
  ImageBackground,
  Pressable,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {LAYOUT} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';

interface Props extends TouchableOpacityProps {
  colors?: any;
  item?: any;
  onPress: (itemName: any) => void;
}

export default function SelectCard(props: Props) {
  const {colors, item, onPress} = props;
  const styles = useStyles(colors);
  const theme: any = useTheme();
  const handlePress = () => {
    onPress(item.name);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={item.image}
        style={styles.Image}
        imageStyle={{borderRadius: 20}}>
        <View style={styles.HeaderTextContainer}>
          <View
            style={[
              styles.avatarView,
              {
                backgroundColor: item.name == 'User' ? colors.primary : 'white',
              },
            ]}>
            <Image source={item.Avatar} style={styles.Icon} />
          </View>
          <View style={styles.SubTextContainer}>
            <Text size={14} SFsemiBold color={colors.primary}>
              {item.name}
            </Text>
            <Text
              size={12}
              SFmedium
              color={colors.primary}
              style={{paddingRight: LAYOUT.PADDING.NORMAL}}>
              {item.description}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

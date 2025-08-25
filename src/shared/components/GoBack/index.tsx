import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {backIcon} from '@assets';
import Text from '../text';
import {colors, margin, navigationRef} from '@services';

interface Props {
  navigation?: any;
  tintColor?: any;
  onPress?: any;
  title?: any;
  containerStyle?: any;
  disabled?: any;
}

const GoBack = (props: Props) => {
  const {containerStyle, tintColor, onPress, title, disabled} = props;
  const handleOnPress = () => {
    navigationRef.current.goBack();
  };
  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress ? onPress : handleOnPress}
        style={styles.pressStyle}>
        <Image
          source={backIcon}
          style={styles.userIcon}
          tintColor={tintColor ? tintColor : colors?.primary}
        />
        <Text size={20} SFmedium color={colors.primary} style={margin.left_8}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  userIcon: {
    width: 24,
    height: 24,
  },
  pressStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

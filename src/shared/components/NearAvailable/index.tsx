import {StyleSheet, View, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
interface Props {
  item?: any;
  onPress?: any;
}
const NearAvailable = (props: Props) => {
  const {item, onPress} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <TouchableOpacity style={styles.Lab_S} onPress={onPress}>
      <Image
        source={{
          uri:
            item?.logo ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
        }}
        style={styles.Chugtai_S}
      />
      <View style={styles.Margin_S}>
        <Text
          size={12}
          style={{width: RF(150)}}
          SFregular
          color={colors.blueText}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearAvailable;

const styles = StyleSheet.create({
  Margin_S: {marginLeft: RF(8), marginTop: RF(8)},
  Lab_S: {
    width: RF(218),
    height: RF(64),
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: RF(16),
    marginVertical: RF(8),
    marginHorizontal: RF(1),
    marginTop: RF(16),
    marginLeft: RF(23),
    elevation: 5,
    overflow: 'hidden',
  },
  Chugtai_S: {
    width: RF(64),
    height: RF(60),
    resizeMode: 'contain',
    borderRadius: RF(16),
  },
});

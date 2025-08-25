import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {favourite, fill_favourite, starfilter} from '@assets';
interface Props {
  item?: any;
}
const RelevantCar = (props: Props) => {
  const {item} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [isFavourite, setIsFavourite] = useState(false);
  const handleToggleFavourite = () => {
    setIsFavourite(prevState => !prevState);
  };
  return (
    <TouchableOpacity style={styles.MainContainerCard}>
      <View style={styles.ViewRow}>
        <Text size={16} SFmedium color={colors.blueText}>
          {item.CarName}
        </Text>
        <TouchableOpacity onPress={handleToggleFavourite}>
          <Image
            source={isFavourite ? fill_favourite : favourite}
            tintColor={isFavourite ? colors.blueText : colors.blueText}
            style={styles.ImageViewStyle}
          />
        </TouchableOpacity>
      </View>
      <Image source={item.CarImage} style={styles.CarView} />
      <View style={styles.ViewRow}>
        <Text size={12} SFmedium color={colors.blueText}>
          {item.ChargesCar}
        </Text>
        <View style={styles.TextView}>
          <Image source={starfilter} style={styles.ImgStyle} />
          <Text size={14} SFmedium color={colors.blueText}>
            4.9
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RelevantCar;

const styles = StyleSheet.create({
  CarView: {
    width: RF(110),
    alignSelf: 'center',
    height: RF(47),
    resizeMode: 'contain',
    marginVertical: RF(16),
  },

  TextView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(4),
  },
  MainContainerCard: {
    marginVertical: RF(4),
    elevation: 1,
    width: '49%',
    backgroundColor: '#F5EFF7',
    borderRadius: RF(16),
    paddingHorizontal: RF(8),
    paddingVertical: RF(8),
  },
  ImgStyle: {width: RF(12), height: RF(12), resizeMode: 'contain'},
  ViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageViewStyle: {width: RF(16), height: RF(16), resizeMode: 'contain'},
});

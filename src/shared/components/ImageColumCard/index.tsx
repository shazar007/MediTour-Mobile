import {RF} from '@theme';
import Text from '../text';
import React, {useState} from 'react';
import {accept, crossIcon} from '@assets';
import {useTheme} from '@react-navigation/native';
import {View, Image, StyleSheet, Pressable} from 'react-native';

interface CardProps {
  date: any;
  label: any;
  imageSource: any;
}

const ImageColumCard: React.FC<CardProps> = ({date, label, imageSource}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [isActive, setIsActive] = useState(false);

  const handleCardPress = () => {
    setIsActive(!isActive);
  };

  return (
    <Pressable onPress={handleCardPress} style={[styles.cardContainer]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text size={16} SFmedium color={colors.dimPurple}>
            {label}
          </Text>
          <Text size={12} SFregular style={styles.mT}>
            {date}
          </Text>
        </View>
        {/* <View style={styles.textRowContainer}>
          <Pressable style={styles.mR}>
            <Image source={accept} style={styles.img} />
          </Pressable>
          <Pressable>
            <Image source={crossIcon} style={styles.img} />
          </Pressable>
        </View> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mT: {marginTop: RF(5)},
  mR: {marginRight: 10},
  img: {width: RF(24), height: RF(24)},
  cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: RF(16),
    paddingHorizontal: RF(12),
    paddingVertical: RF(16),
    elevation: 5,
    marginHorizontal: RF(5),
    marginTop: RF(10),
  },
  imageContainer: {
    marginRight: 10,
    width: RF(48),
    height: RF(48),
  },
  image: {
    width: RF(48),
    height: RF(48),
    borderRadius: RF(100),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: RF(220),
  },
  textRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: RF(12),
    marginBottom: 4,
    color: '#00276D',
    fontWeight: '500',
  },
});

export default ImageColumCard;

import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {favourite, fill_favourite, location} from '@assets';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
interface Props {
  item?: any;
  onPress?: any;
  width?: any;
  filled?: any;
  handleFavoritePress?: any;
}
const TourFlatlist = (props: Props) => {
  const {item, width, onPress, handleFavoritePress} = props;
  const {favorites} = useSelector((state: any) => state.root.user);
  const theme: any = useTheme();
  const colors = theme.colors;
  const isFavorite = favorites?.some(
    (fav: any) => fav.itemId === item?._id && fav.favModel === 'tour',
  );
  return (
    <View style={{marginVertical: RF(4), marginHorizontal: RF(4)}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.MainContainerCard,
          {
            width: width ? width : '100%',
            marginRight: RF(8),
          },
        ]}>
        <View style={styles.ViewRow}>
          <ImageBackground
            source={{
              uri:
                item.images?.[0] ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
            }}
            style={styles.CarView}
            imageStyle={{borderRadius: RF(16)}}>
            <TouchableOpacity onPress={handleFavoritePress}>
              <Image
                source={isFavorite ? fill_favourite : favourite}
                style={styles.ImageViewStyle}
              />
            </TouchableOpacity>
            <View style={styles.Container}>
              <Text size={10} color={'#4D4E8D'} SFsemiBold>
                {item.pricePerHead} PKR
              </Text>
            </View>
          </ImageBackground>
        </View>
        <Text
          size={14}
          SFmedium
          color={colors.blueText}
          style={{marginHorizontal: RF(8), bottom: 4}}>
          {item.packageName}
        </Text>
        <View style={styles.ViewRow}>
          <View style={styles.TextView}>
            <Image source={location} style={styles.ImgView} />
            <Text size={10} SFmedium color={'#7d7d7d'}>
              {item.from}
            </Text>
          </View>
          <View style={styles.TextView}>
            <Text size={10} SFmedium color={'#7d7d7d'}>
              {item.packageDuration}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TourFlatlist;

const styles = StyleSheet.create({
  MainContainerCard: {
    // marginVertical: RF(16),
    elevation: 1,
    height: RF(200),
    backgroundColor: '#Ffff',
    borderRadius: RF(16),
    paddingRight: RF(16),
  },
  ViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CarView: {
    width: '100%',
    height: RF(135),
    resizeMode: 'contain',
    marginVertical: RF(12),
    marginHorizontal: RF(6),
    alignSelf: 'center',
  },
  TextView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(10),
  },
  ImgStyle: {width: RF(12), height: RF(12), resizeMode: 'contain'},
  ImageViewStyle: {
    marginTop: RF(16),
    marginRight: RF(8),
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  Container: {
    width: RF(75),
    height: RF(22),
    backgroundColor: '#fff',
    opacity: 0.8,
    borderRadius: RF(8),
    paddingHorizontal: RF(8),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: RF(8),
    top: '50%',
  },
  ImgView: {
    width: RF(16),
    height: RF(16),
    marginLeft: RF(8),
    tintColor: '#00276D',
  },
});

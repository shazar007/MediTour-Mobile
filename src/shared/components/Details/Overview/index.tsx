import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {Text} from '@components';
import {useSelector} from 'react-redux';
import {RF, SCREEN_HEIGHT} from '@theme';
import DetailsInfo from '../DetailsInfo';
import {favourite, fill_favourite} from '@assets';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  View,
} from 'react-native';
import {getAll_Ratings_Reviews} from '@services';

interface Props {
  uri?: any;
  fav?: any;
  item?: any;
  type?: any;
  distance?: any;
  colors?: any;
  favLoading?: any;
  reviews?: any;
  onFavorite?: any;
  handleFav?: any;
  onEndEditing?: (i: any) => void;
}

const Details = (props: Props) => {
  const {item, colors, reviews, uri, onEndEditing, distance} = props;
  const styles = useStyles(colors);

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user, favorites} = useSelector((state: any) => state.root.user);
  const isFavorite = favorites?.some(
    (fav: any) => fav.itemId === item?._id && fav.favModel === 'laboratory',
  );

  return (
    <>
      {item ? (
        <>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.img}
              resizeMode={'contain'}
              imageStyle={{borderRadius: 15}}
              source={{uri: uri}}
            />
            {/* <Pressable style={styles.favView} onPress={onFavorite}>
              {favLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <>
                  {isFavorite ? (
                    <Image
                      source={fill_favourite}
                      style={[
                        styles.icon,
                        {tintColor: changeColor, height: RF(16), width: RF(16)},
                      ]}
                    />
                  ) : (
                    <Image
                      source={favourite}
                      style={[styles.icon, {tintColor: changeColor}]}
                    />
                  )}
                </>
              )}
            </Pressable> */}
          </View>
          <DetailsInfo
            item={item}
            colors={colors}
            reviews={reviews}
            distance={distance}
            onEndEditing={onEndEditing}
          />
        </>
      ) : (
        <View style={styles.txtView}>
          <Text size={22}>No Data Found!</Text>
        </View>
      )}
    </>
  );
};

export default Details;

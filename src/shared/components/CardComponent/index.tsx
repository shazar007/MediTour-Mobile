import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {
  verify,
  experience,
  tickVerified,
  location,
  clock,
  outline,
  fill_favourite,
  favourite,
} from '@assets';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {RF} from '@theme';
import {AirbnbRating} from 'react-native-ratings';
import CustomLoader from '../CustomLoader';
import {useSelector} from 'react-redux';
import {rs, rv} from '@services';

interface Props {
  item?: any;
  onPress?: any;
  marginRight?: any;
  style?: any;
  styleText?: any;
  RatingTrue?: any;
  showImg?: any;
  showLocation?: any;
  color?: any;
  showOutlined?: any;
  overAll?: any;
  height?: any;
  width?: any;
  showValues?: any;
  width2?: any;
  marginLeft?: any;
  Size?: any;
  name?: any;
  title2?: any;
  bgColor?: any;
  title3?: any;
  logo?: any;
  noRating?: any;
  showValues2?: any;
  doctorquantity?: any;
  title4?: any;
  isVerify?: any;
  disable?: any;
  fvrt?: any;
  selectedItems?: any;
  handleFavoritePress?: any;
  yrsExp?: any;
  loading?: any;
  container?: any;
  indicator?: any;
  requested?: any;
  rate?: any;
}

const CardComponent = (props: Props) => {
  const {
    item,
    onPress,
    styleText,
    Size,
    style,
    showImg,
    showLocation,
    color,
    showOutlined,
    overAll,
    handleFavoritePress,
    height,
    width,
    marginRight,
    showValues,
    showValues2,
    width2,
    marginLeft,
    name,
    title2,
    title3,
    noRating,
    bgColor,
    fvrt,
    selectedItems,
    logo,
    doctorquantity,
    title4,
    isVerify,
    loading,
    disable,
    yrsExp,
    container,
    indicator,
    requested,
    rate,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;

  const styles = useStyles(colors);
  const {user, favorites} = useSelector((state: any) => state.root.user);
  const isFavorite = favorites?.some(
    (fav: any) => fav.itemId === item?._id && fav.favModel === 'doctor',
  );

  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bgColor ? bgColor : colors.white,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            height: rs(80),
            width: rs(80),
            borderRadius: rs(40),
            borderWidth: 2,
            borderColor: colors.mediumGray,
            overflow: 'hidden',
          }}>
          <Image source={logo} style={styles.image} />
        </View>

        <View style={[styles.Container2, style]}>
          <Text
            size={14}
            SFsemiBold
            numberOfLines={1}
            style={[styles.TextStyle, styleText, {lineHeight: rv(22)}]}>
            {name ? name : item?.name}
          </Text>

          <View style={[styles.viewContainer]}>
            {showImg && <Image style={styles.ViewImage} source={clock} />}
            <Text
              size={10}
              numberOfLines={2}
              SFregular
              color={colors.LightText}
              style={{
                width: rs(200),
                lineHeight: rv(16),
                marginLeft: marginLeft ? marginLeft : RF(0),
              }}>
              {title2 ? title2 : item?.header ? item?.header : item?.openTime}
            </Text>
          </View>
          {showOutlined && (
            <View
              style={[styles.viewContainer, {marginTop: showImg ? rv(4) : 0}]}>
              <Image style={styles.ViewImage} source={outline} />
              <Text
                size={10}
                SFregular
                color={colors.LightText}
                style={{
                  lineHeight: RF(12),
                  marginLeft: marginLeft ? marginLeft : RF(0),
                }}>
                {doctorquantity}
              </Text>
            </View>
          )}
          <View style={styles.viewContainer}>
            {showLocation && (
              <Image
                style={{
                  width: RF(10),
                  height: RF(10),
                  tintColor: colors.blueText,
                  marginRight: RF(8),
                }}
                source={location}
              />
            )}
            {showValues && (
              <Text
                numberOfLines={2}
                size={8}
                SFsemiBold
                color={colors.text}
                style={{
                  lineHeight: RF(16),
                  width: rs(200),
                  marginLeft: marginLeft ? marginLeft : RF(0),
                }}>
                {title3 ? title3 : item?.Dis}
              </Text>
            )}
          </View>
          {showValues2 == true && (
            <Text
              size={Size}
              SFregular
              color={color}
              style={{
                lineHeight: RF(12),
                marginTop: RF(4),
                width: '70%',
              }}>
              {title4 ? title4 : ''}
            </Text>
          )}

          {noRating ? null : (
            <View
              style={[
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: rv(4),
                  gap: rs(8),
                },
              ]}>
              <AirbnbRating
                size={12}
                showRating={false}
                isDisabled={true}
                defaultRating={
                  rate ? rate : item?.averageRating ? item?.averageRating : 0
                }
              />
              <Text style={{alignSelf: 'flex-end'}}>
                {item?.averageRating ? item?.averageRating : 0}
              </Text>
            </View>
          )}
          {item?.totalAmount && (
            <Text size={14} SFmedium>
              Package Price:{' '}
              <Text size={14} SFmedium>
                {item?.totalAmount}/-
              </Text>
            </Text>
          )}
        </View>

        {requested ||
          (item?.isRecommended == true && (
            <View style={styles.recommendedContainer}>
              <Text size={8} color={colors.orange}>
                {item?.isRecommended == true
                  ? 'Recommended'
                  : requested && 'requested'}
              </Text>
            </View>
          ))}

        {/* {isVerify && (
          <>
            <Image
              source={tickVerified}
              style={[
                styles.TickViewStyle,
                {tintColor: item?.isVerified ? 'green' : 'grey'},
              ]}
            />
          </>
        )} */}

        {indicator && (
          <ActivityIndicator
            animating={indicator}
            size={'small'}
            style={styles.FvrtStyle}
          />
        )}
      </View>
      {overAll && (
        <View style={styles.view}>
          <View style={{flexDirection: 'row'}}>
            <Image source={verify} style={{width: RF(16), height: RF(16)}} />
            <Text
              size={10}
              SFregular
              center
              color={colors.LightText}
              style={{marginLeft: RF(4)}}>
              Verified Doctors
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={experience}
              style={{width: RF(16), height: RF(16)}}
            />
            <Text
              size={10}
              SFregular
              color={colors.LightText}
              style={{marginLeft: RF(4)}}>
              {yrsExp}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CardComponent;

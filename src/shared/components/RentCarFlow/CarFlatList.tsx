import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {RF, globalStyle} from '@theme';
import {favourite, fill_favourite, starfilter} from '@assets';
import {useTheme} from '@react-navigation/native';
interface Props {
  item?: any;
  onPress?: any;
  width?: any;
  filled?: any;
  Bgclr?: any;
  description?: any;
}
const CarFlatList = (props: Props) => {
  const {item, width, onPress, Bgclr, description} = props;
  const [isFavourite, setIsFavourite] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const isDetailScreenOpen = width === '100%';
  const handleToggleFavourite = () => {
    setIsFavourite(prevState => !prevState);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.MainContainerCard,
          {
            width: width ? width : '100%',
            marginRight: RF(10),
            backgroundColor: Bgclr,
          },
        ]}>
        {item?.requestSent === true && (
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <View
              style={{
                padding: 5,
                margin: 10,
                backgroundColor:
                  item?.requestSent == true ? '#00B69B' : '#FDCB2E',
                opacity: 0.8,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                color={item?.requestSent == true ? '#fff' : '#393A44'}
                size={10}
                SFsemiBold>
                {item?.requestSent == true ? 'Booked' : 'Requested'}
              </Text>
            </View>
          </View>
        )}

        <Image source={{uri: item?.vehicleImages[0]}} style={styles.CarView} />
      </TouchableOpacity>
      <View style={[isDetailScreenOpen && styles.detailScreenOpen]}>
        <Text size={14} SFmedium color={colors.blueText}>
          {item?.vehicleName}
        </Text>
        <Text size={14} SFmedium color={colors.blueText}>
          {`${item?.actualPricePerDay} per day`}
        </Text>
        {/* Add any additional text or components here */}
      </View>
    </View>
  );
};

export default CarFlatList;

const styles = StyleSheet.create({
  MainContainerCard: {
    marginVertical: RF(8),
    elevation: 0.3,
    height: RF(150),
    overflow: 'hidden',
    // backgroundColor: '#EBFAFC',
    borderRadius: RF(8),
    // paddingHorizontal: RF(8),
    // paddingVertical: RF(8),
  },
  ViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CarView: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: RF(8),
    alignSelf: 'center',
  },
  TextView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(10),
  },
  ImgStyle: {width: RF(12), height: RF(12), resizeMode: 'contain'},
  ImageViewStyle: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  detailScreenOpen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

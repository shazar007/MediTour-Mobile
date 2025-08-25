import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-snap-carousel';
import EmptyList from '../emptyComponent';

interface Props {
  data?: any;
  loading?: any;
}
const DonateCard = (props: Props) => {
  const {data, loading} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {width} = Dimensions.get('window');
  return (
    <View style={{justifyContent: 'center'}}>
      <Carousel
        data={data}
        ListEmptyComponent={
          <EmptyList
            height
            description={loading ? 'Loading.....' : 'No Packages found'}
          />
        }
        renderItem={({item}: any) => (
          <View style={styles.Container}>
            <Image
              source={{
                uri:
                  item?.packageInfo?.images[0] ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
              style={styles.ImageStyle}
            />
            <View style={styles.rowStyle}>
              <Image
                source={{
                  uri:
                    item?.donors?.[0]?.userId?.userImage ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
                style={styles.image}
              />
              <Text center size={RF(12)} SFregular color={colors.blueText}>
                {item?.userCount} People Donated
              </Text>
            </View>
            <View style={{paddingTop: RF(16), paddingHorizontal: RF(20)}}>
              <Text
                size={14}
                SFmedium
                color={colors.blueText}
                numberOfLines={1}>
                {item.donationPurposes[0]}
              </Text>
              <Progress.Bar
                progress={0.6}
                width={RF(230)}
                height={RF(6)}
                color="rgba(226, 93, 93, 1)"
                borderColor="#FFF"
                unfilledColor="#FFF"
                style={styles.ProgressBAR}
              />
            </View>
          </View>
        )}
        firstItem={0}
        loop={true}
        autoplay
        autoplayInterval={2000}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={2}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default DonateCard;
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    borderRadius: RF(16),
    backgroundColor: 'rgba(245, 245, 245, 1)',
    marginVertical: RF(16),
  },
  ImageStyle: {
    width: '100%',
    height: RF(181),
    resizeMode: 'cover',
    borderTopLeftRadius: RF(16),
    borderTopRightRadius: RF(16),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RF(8),
    alignSelf: 'center',
    gap: RF(16),
  },
  image: {
    width: RF(24),
    height: RF(24),
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: RF(100),
  },
  ProgressBAR: {marginBottom: RF(24), marginTop: RF(16)},
});

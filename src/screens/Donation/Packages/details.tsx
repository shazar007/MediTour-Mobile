import useStyles from './styles';
import {View} from 'react-native';
import {Image} from 'react-native';
import {RF, SCREEN_WIDTH} from '@theme';
import {LabBell, backIcon} from '@assets';
import Carousel from 'react-native-snap-carousel';
import React, {useCallback, useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  DelSave_Modal,
  CustomHeader,
} from '@components';
import {
  donationPackageDelete,
  donationPackageEdit,
  navigate,
  navigationRef,
} from '@services';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
    };
  }>;
}

const Donation_Package_Detail = (props: Props, navigation: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {item} = props.route?.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [delModal, setDelModal] = useState(false);
  const [del, setDel] = useState(false);
  const [loading, setLoading] = useState<any>(false);

  const handleSnap = useCallback(
    (index: any) => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );

  const onEdit = () => {
    navigate('Donation_Add_Packages', {item: item, type: 'edit'});
  };

  const onDelete = () => {
    setLoading(true);
    let id = item?._id;
    donationPackageDelete(id)
      .then((res: any) => {
        navigate('DonationPackages');
        setDelModal(false);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleClick = () => {
    setDel(true);
    setDelModal(true);
  };

  const handleDelete = () => {
    if (delModal) {
      onDelete();
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Package Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={{height: RF(220)}}>
        <Carousel
          data={item?.images}
          onSnapToItem={handleSnap}
          renderItem={({item}: any) => {
            return (
              <View style={styles.ImageContainer}>
                <Image source={{uri: item}} style={styles.ImageStyle} />
              </View>
            );
          }}
          autoplay
          loop={true}
          firstItem={0}
          itemHeight={RF(220)}
          autoplayInterval={2000}
          inactiveSlideOpacity={2}
          inactiveSlideScale={0.9}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.7}
          slideStyle={styles.slideStyles}
        />
      </View>

      <View style={{marginHorizontal: RF(20)}}>
        <Text size={16} color={colors?.bluE} SFmedium>
          {item?.donationTitle}
        </Text>
        <Text color={colors?.bluE} size={14} SFregular>
          Target Audience: {item?.targetAudience}
        </Text>
        <Text> Amount: {item?.requiredAmount}</Text>
        <Text>Days: {item?.totalDays}</Text>
        <View style={styles.button}>
          {/* <AppButton
            title="Edit"
            width={RF(65)}
            bgClr={'green'}
            height={RF(35)}
            onPress={onEdit}
            textcolor={'white'}
            containerStyle={{marginRight: RF(10)}}
          /> */}

          <AppButton
            width={RF(86)}
            title="Delete"
            height={RF(35)}
            bgClr={'#FB2047'}
            onPress={handleClick}
            textcolor={'white'}
          />
        </View>
      </View>

      {del && (
        <DelSave_Modal
          title={'Packages'}
          simpleModal={delModal}
          handleDelete={handleDelete}
          setSimpleModal={setDelModal}
        />
      )}

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default Donation_Package_Detail;

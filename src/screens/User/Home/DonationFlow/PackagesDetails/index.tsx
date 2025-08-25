import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppButton,
  AppTextInput,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  LoginReminder,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  PKR,
  cross,
  donateAmount,
  framing,
  helpPackage,
  location,
} from '@assets';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  getDonation_Package,
  navigate,
  postDonationAmount,
  showToast,
} from '@services';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setAmount, setStripeObj} from '@redux';

const PackagesDetails = ({route}: any) => {
  const {item} = route.params;
  //
  const dispatch: any = useDispatch();
  const styles: any = useStyles();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const {user} = useSelector((state: any) => state.root.user);

  const {width} = Dimensions.get('window');
  const theme: any = useTheme();
  const colors = theme.colors;

  const handleSnap = useCallback(
    (index: any) => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );

  useEffect(() => {
    Packages_Details();
    //
  }, []);
  const Packages_Details = () => {
    setLoading(true);
    let params = {
      packageId: item?._id,
    };
    getDonation_Package(params)
      .then((res: any) => {
        setData(res.data.package);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  //

  const handleModal = () => {
    setModalVisible(true);
  };

  const donatePayment = () => {
    if (donationAmount.trim() === '') {
      ToastAndroid.show('Please Enter Amount', ToastAndroid.SHORT);
    } else if (donationAmount.trim() === '0') {
      ToastAndroid.show('Minimum amount is 1', ToastAndroid.SHORT);
    } else {
      dispatch(
        setStripeObj({
          amount: data?.requiredAmount,
          name: data?.donationTitle,
          packageId: item?._id,
          companyId: item?.donationId?._id,
          donationAmount: donationAmount,
          totalDays: item?.totalDays,
          description: item?.description,
        }),
      );
      dispatch(setAmount(donationAmount));
      setModalVisible(false);
      navigate('StripeAlFalah', {
        type: 'donation',
        actualAmount: Number(donationAmount),
      });
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Package Detail'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View style={{paddingBottom: RF(250)}}>
            <View style={styles.justifyStyle}>
              <Carousel
                onSnapToItem={handleSnap}
                data={item?.images}
                renderItem={({item}: any) => (
                  <View style={styles.ImageContainer}>
                    <Image source={{uri: item}} style={styles.ImageStyle} />
                  </View>
                )}
                firstItem={0}
                loop={true}
                autoplay
                autoplayInterval={2000}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={2}
                sliderWidth={width}
                itemWidth={width * 0.7}
                slideStyle={styles.slideStyles}
              />
              <Pagination
                dotsLength={item?.images?.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationStyles}
                inactiveDotStyle={styles.bgStyles}
                dotStyle={styles.dotStyles}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
            <View style={styles.RowView}>
              <View style={styles.ContainerImage}>
                <Image
                  source={{uri: item?.donationId?.logo}}
                  style={styles.Image}
                />
              </View>
              <View style={{gap: RF(8)}}>
                <Text size={14} SFmedium color={colors.blueText}>
                  {item?.donationId?.name}
                </Text>
                <View style={styles.ViewC}>
                  <Image source={location} style={styles.ImageLocation_S} />
                  <Text
                    size={12}
                    color={colors.blueText}
                    SFregular
                    style={{width: RF(200)}}>
                    {`${item?.donationId?.location?.address}`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.MarStyles}>
              <Text size={RF(20)} color={colors.blueText} SFmedium>
                {item?.donationTitle}
              </Text>
              <View style={styles.ViewData}>
                <Text size={14} SFmedium color={colors.blueText}>
                  Target Audience:{' '}
                  <Text size={12} SFregular color={colors.blueText}>
                    {data?.targetAudience}
                  </Text>
                </Text>
                <Text size={14} SFmedium color={colors.blueText}>
                  Amount:{' '}
                  <Text size={12} SFregular color={colors.blueText}>
                    {data?.requiredAmount}
                  </Text>
                </Text>
                <Text size={14} SFmedium color={colors.blueText}>
                  Days:{' '}
                  <Text size={12} SFregular color={colors.blueText}>
                    {data?.totalDays}
                  </Text>
                </Text>
              </View>
              <View style={{marginTop: RF(16), gap: RF(8)}}>
                <Text size={20} SFsemiBold color={colors.blueText}>
                  Description
                </Text>
                <Text size={14} SFlight color={colors.blueText}>
                  {data?.description}
                </Text>
              </View>

              <TouchableOpacity style={styles.TouchStyle} onPress={handleModal}>
                <Text size={14} SFmedium color={'#E25D5D'}>
                  Donate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>

      {user === null ? (
        <Modal transparent animationType="slide" visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{flexGrow: 1}}>
              <LoginReminder />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.ModalStyle}>
            <View style={styles.VisibleStyle}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{alignSelf: 'flex-end'}}>
                <Image source={cross} style={styles.crossIcon} />
              </TouchableOpacity>
              <Image source={donateAmount} style={styles.ImgStyle} />

              <AppTextInput
                placeholder={'Enter Amount'}
                endIcon={PKR}
                keyboardType="number-pad"
                value={donationAmount}
                onChangeText={setDonationAmount}
              />
              <TouchableOpacity
                style={styles.TouchStyle}
                onPress={donatePayment}>
                <Text size={14} SFmedium color={'#E25D5D'}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </Wrapper>
  );
};

export default PackagesDetails;

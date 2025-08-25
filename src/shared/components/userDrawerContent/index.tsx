import React, {useState} from 'react';
import {getColorCode, RF} from '@theme';
import Text from '../text';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoggedIn, setUser} from '@redux';
import {Right, logOut, LabPhone, userAvatar} from '@assets';
import {
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {
  blockUser,
  logoutAll,
  navigate,
  navigationRef,
  showToast,
} from '@services';
import CustomLoader from '../CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteModal from '../ModalComponent/DeleteModal';
import {Alert} from '@utils';

interface Props {
  img?: any;
  data?: any;
  name?: any;
  phone?: any;
  textColor?: any;
  sourceBG?: any;
  colorExit?: any;
  showdelete?: any;
}

const UserDrawerContent = (props: Props) => {
  const {data, name, phone, img, textColor, colorExit, sourceBG, showdelete} =
    props;
  const theme: any = useTheme();
  const [Showmodel, setShowModel] = useState(false);
  const colors = theme.colors;
  const [showLoader, setshowLoader] = useState(false);
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation(); // Use the useNavigation hook
  const {user, cart} = useSelector((state: any) => state.root.user);
  const [loading, setLoading] = useState(false);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);
  const {logOutAllSight, deleteType, id_noti} = getColorCode();
  //

  const openPrivacyPolicy = () => {
    const url = 'https://meditour.global/privactpolicys';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const cartLength = cart?.length;

  const check = changeStack !== 'Pharmaceutical' && true;

  const handleLogin = async () => {
    setLoading(true);
    logoutAll(logOutAllSight)
      .then(async (res: any) => {
        // await navigation.dispatch(DrawerActions.closeDrawer());
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        AsyncStorage.clear();
        Alert.showSuccess('Successfully Logout');
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteUser = () => {
    setshowLoader(true);
    let data = {
      vendorType: deleteType,
      vendorId: id_noti,
      blocked: true,
    };
    blockUser(data)
      .then((res: any) => {
        dispatch(setIsLoggedIn(false));
      })
      .catch((err: any) => {})
      .finally(() => {
        setshowLoader(false);
      });
  };
  return (
    <ImageBackground
      source={sourceBG}
      style={{
        height: '100%',
        width: '100%',
      }}
      imageStyle={{width: '100%', height: '100%'}}>
      <>
        <View style={styles.view}>
          <View style={styles.inner}>
            <Image
              source={
                user?.userImage
                  ? {uri: user?.userImage}
                  : user?.logo
                  ? {uri: user?.logo}
                  : userAvatar
              }
              style={[
                styles.img,
                {borderColor: colorExit ? colors.white : textColor},
              ]}
            />
            <View style={styles.txt}>
              <Text
                color={colorExit ? colors.white : textColor}
                size={14}
                SFmedium
                numberOfLines={2}
                style={{width: RF(150)}}>
                {user?.name ? user?.name : name}
              </Text>
              <View style={styles.image}>
                <Image
                  source={LabPhone}
                  style={styles.lab}
                  tintColor={colorExit ? colors.white : textColor}
                />
                <Text
                  size={11}
                  SFmedium
                  color={colorExit ? colors.white : textColor}>
                  {user?.phone
                    ? user?.phone
                    : user?.phoneNumber
                    ? user?.phoneNumber
                    : phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          center
          SFmedium
          size={14}
          color={colorExit ? colors.white : textColor}
        />
        {check && (
          <View style={styles.main}>
            <FlatList
              data={data}
              scrollEnabled={false}
              renderItem={({item}: any) => (
                <Pressable
                  onPress={
                    item?.move == true
                      ? openPrivacyPolicy
                      : () => navigate(item?.OnNavigate)
                  }
                  style={styles.carLengthStyle}>
                  {item?.cart && cartLength ? (
                    <View style={styles.cartView}>
                      <Text
                        size={10}
                        color={colorExit ? colors.white : textColor}>
                        {cartLength}
                      </Text>
                    </View>
                  ) : null}
                  <View style={styles.imgTxt}>
                    <Image
                      style={styles._img}
                      source={item?.ScreenLogo}
                      tintColor={
                        item?.cart && cartLength
                          ? colors.orange
                          : colorExit
                          ? colors.white
                          : textColor
                      }
                    />

                    <Text
                      SFmedium
                      size={14}
                      color={colorExit ? colors.white : textColor}>
                      {item?.ScreenName}
                    </Text>
                  </View>
                  <Image
                    source={Right}
                    tintColor={colorExit ? colors.white : textColor}
                    style={styles._img}
                  />
                </Pressable>
              )}
            />
          </View>
        )}
      </>
      <TouchableOpacity
        onPress={() => {
          handleLogin();
        }}
        style={{...styles._view, marginTop: check ? 0 : 100, top: RF(20)}}>
        <Image
          source={logOut}
          style={styles._img}
          tintColor={colorExit ? colors.white : textColor}
        />
        <Text color={colorExit ? colors.white : textColor} size={14} SFmedium>
          LogOut
        </Text>
      </TouchableOpacity>
      {showdelete && (
        <>
          <Text
            style={{marginTop: RF(59), marginLeft: RF(16)}}
            color={'#fff'}
            size={14}
            SFmedium>
            Want to leave MediTour?
          </Text>
          <TouchableOpacity
            style={{
              padding: RF(12),
              backgroundColor: 'red',
              width: RF(120),
              alignItems: 'center',
              marginTop: RF(16),
              justifyContent: 'center',
              borderRadius: RF(12),
              alignSelf: 'center',
              elevation: 5,
              marginVertical: RF(4),
              // marginLeft: RF(16),
            }}
            onPress={() => setShowModel(true)}>
            <Text size={12} SFbold color={'#fff'}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </>
      )}
      <DeleteModal
        Visible={Showmodel}
        cancelPress={() => setShowModel(false)}
        deletePress={() => deleteUser()}
        loading={showLoader}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            borderColor: '#fff',
            bottom: RF(150),
            alignSelf: 'center',
          }}>
          <CustomLoader color={colors?.white} />
        </View>
      )}
    </ImageBackground>
  );
};

export default UserDrawerContent;

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(32),
  },
  imgTxt: {
    gap: RF(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {marginHorizontal: RF(16), marginVertical: RF(16)},
  _img: {width: RF(24), height: RF(24), resizeMode: 'contain'},
  _view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(18),
    marginHorizontal: RF(16),
  },
  image: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},
  lab: {width: RF(14), height: RF(14), tintColor: '#fff'},
  txt: {
    flexDirection: 'column',
    marginHorizontal: RF(16),
    gap: RF(4),
    flexGrow: 1,
  },
  view: {
    marginHorizontal: RF(16),
    marginTop: RF(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inner: {flexDirection: 'row', alignItems: 'center', marginTop: RF(16)},
  carLengthStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(32),
  },
  cartView: {
    height: 16,
    width: 16,
    backgroundColor: '#EE7E37',
    borderRadius: 13,
    position: 'absolute',
    zIndex: 100,
    // left: RF(160),
    left: RF(10),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: RF(12),
  },
  img: {
    width: RF(48),
    height: RF(48),
    borderWidth: 2,
    borderRadius: 100,
    resizeMode: 'contain',
    // borderColor: 'white',
  },
});

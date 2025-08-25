import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppButton,
  CustomAccordion,
  CustomLoader,
  Line,
  Text,
  Wrapper,
  InputData,
  HeaderCard,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {UserIcon, circum, cnc, del, live, paper, phone} from '@assets';
import {add_File, confirmInsurance, navigate, rs, showToast} from '@services';
import ImagePicker from 'react-native-image-crop-picker';
import {setAmount, setStripeObj} from '@redux';
import {Alert} from '@utils';

const SECTIONS = [
  {
    title: 'Package Details',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Personal Details',
    content: 'Lorem ipsum...',
  },
];

const BuyInsurance = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const [url, setUrl] = useState<any>('');
  const [fileName, setFileName] = useState<string>('');
  const [open, setOpen] = useState<any>(false);
  const [cncValue, setCncValue] = useState('');
  const {item, type} = route.params;
  const [loading, setLoading] = useState<any>(false);
  const [indicator, setIndicator] = useState<any>(false);

  const [activeSections, setActiveSections] = useState<string[]>([]);
  const {user, selectedAddress, city, paymentID} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const deleteFile = () => {
    setUrl(null);
    setFileName('');
  };
  const confirmBooking = () => {
    if (!cncValue) {
      Alert?.showError('Please enter your CNIC');

      return;
    }
    if (!url) {
      Alert?.showError('Please upload your valid CNIC');

      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          setStripeObj({
            item: item,
            insurance: {
              packageName: item?.insuranceId?.name,
              perYear: item?.perYear,
              cnic: cncValue,
              type: type,
              url: url,
              amount: item?.actualPrice,
            },
          }),
        );
        dispatch(setAmount(Number(item?.actualPrice)));
        setLoading(false);
        navigate('StripeAlFalah', {
          type: 'Insurance',
          actualAmount: Number(item?.actualPrice),
        });
      }, 1000);
    }
  };

  const onUploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setIndicator(true);
      const formData = new FormData();
      let name: any = image.path.split('/').pop();
      formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: name,
      });
      add_File(formData)
        .then(response => {
          setUrl(response.data.fileUrl);
          setFileName(name);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => setIndicator(false));
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Buy Now'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View style={styles.TopView}>
            <CustomAccordion
              data={SECTIONS}
              open={open}
              setOpen={setOpen}
              style={styles.accordion}
              setActiveSections={setActiveSections}
              activeSections={activeSections}
              renderindex1={() => (
                <>
                  <Line />
                  <View style={styles.mt}>
                    <Text size={14} SFregular color={colors.blueText}>
                      {item?.insuranceId?.name}
                    </Text>
                    <View style={styles.viewRow}>
                      <View style={styles.ImageBackGround}>
                        <Image
                          source={{uri: item?.insuranceId?.logo}}
                          style={styles.ImgView}
                        />
                      </View>
                      <View>
                        <Text size={16} SFmedium color={colors.blueText}>
                          {item?.packageName}
                        </Text>
                        <View style={styles.ImgDev}>
                          <Text
                            size={12}
                            SFregular
                            color={colors.blueText}
                            style={{width: RF(120)}}>
                            {item?.description}
                          </Text>
                          <Text size={14} SFmedium color={colors.blueText}>
                            {item?.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.Container}>
                      <Text size={14} SFsemiBold color={colors.blueText}>
                        1-
                      </Text>
                      <View style={{flexDirection: 'column'}}>
                        <Text size={14} SFsemiBold color={colors.blueText}>
                          Medical Benefits
                        </Text>
                        <View style={{marginTop: RF(8)}}>
                          {item?.icuCcuLimits && (
                            <View>
                              <Text SFbold color={'#00276D'}>
                                ICU/CCU Coverage Limits
                              </Text>
                              <Text size={14} SFlight color={'#00276D'}>
                                {item?.icuCcuLimits}
                              </Text>
                            </View>
                          )}
                          {item?.accidentalEmergencyLimits && (
                            <View>
                              <Text SFbold color={'#00276D'}>
                                Accidental Emergency Coverage
                              </Text>
                              <Text size={14} SFlight color={'#00276D'}>
                                {item?.accidentalEmergencyLimits}
                              </Text>
                            </View>
                          )}
                          {item?.specializedInvestigationCoverage && (
                            <View>
                              <Text SFbold color={'#00276D'}>
                                Specialized Investigation Coverage
                              </Text>
                              <Text size={14} SFlight color={'#00276D'}>
                                {item?.specializedInvestigationCoverage}
                              </Text>
                            </View>
                          )}
                          {item?.maternity && (
                            <View>
                              <Text SFbold color={'#00276D'}>
                                Maternity Coverage
                              </Text>
                              <Text size={14} SFlight color={'#00276D'}>
                                {item?.maternity}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.ContentCr}>
                      <View style={styles.gap}>
                        <Text size={14} SFsemiBold color={colors.blueText}>
                          2-
                        </Text>
                        <Text size={14} SFsemiBold color={'#00276D'}>
                          More Features
                        </Text>
                      </View>
                      <Text size={14} SFmedium color={'#00276D'}>
                        {item?.heading}
                      </Text>
                      <Text size={12} SFregular color={'#00276D'}>
                        {item?.description}
                      </Text>
                    </View>
                    <Text
                      size={16}
                      SFsemiBold
                      color={'#00276D'}
                      style={{marginTop: RF(16)}}>
                      About
                    </Text>
                    <Text size={14} SFregular color={'#00276D'}>
                      {item?.description}
                    </Text>
                    <View style={{marginTop: RF(16), gap: RF(4)}}>
                      <Text size={16} SFmedium color={'#00276D'}>
                        Address
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {item?.insuranceId?.location?.address}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              renderindex2={() => (
                <>
                  <Line />
                  <View style={styles.mt}>
                    <InputData UserName={user?.name} source={UserIcon} />
                    <InputData UserName={user?.mrNo} source={circum} />
                    <InputData UserName={user?.phone} source={phone} />
                    <InputData
                      UserName={selectedAddress?.address}
                      source={live}
                    />
                    <View style={styles.InputView}>
                      <Image source={cnc} style={styles.ViewImage} />
                      <TextInput
                        placeholder="Enter Your CNC"
                        keyboardType="number-pad"
                        value={cncValue}
                        placeholderTextColor={'#0D47A1'}
                        onChangeText={setCncValue}
                        style={{width: RF(200), color: '#00276D'}}
                      />
                    </View>
                    <View style={{marginTop: RF(16)}}>
                      <Text size={14} SFmedium color={'#00276D'}>
                        ID Card Image
                      </Text>
                      <Text size={12} SFregular color={'#7D7D7D'}>
                        To proceed, please upload or take a picture of the
                        Insurance person’ passports.{' '}
                      </Text>
                    </View>
                    {!url && (
                      <TouchableOpacity
                        style={styles.UpLoad_S}
                        onPress={onUploadImage}>
                        {indicator ? (
                          <CustomLoader />
                        ) : (
                          <>
                            <Image source={paper} style={styles.Upload_Image} />
                            <View style={styles.Gap_styles}>
                              <Text size={12} SFmedium color={colors.blueText}>
                                choose ID Card to upload
                              </Text>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    )}

                    {url ? (
                      <View>
                        <View style={styles.File_S}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: RF(8),
                            }}>
                            <View style={styles.ImageShow}>
                              <Image
                                source={{uri: url}}
                                style={styles.contentView}
                              />
                            </View>
                            <Text
                              size={12}
                              SFlight
                              color={'#00276D'}
                              style={{width: RF(140)}}>
                              {fileName}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={deleteFile}
                            hitSlop={styles.hitSlop}>
                            <Image source={del} style={styles.crossStyle} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </>
              )}
            />

            <Text SFmedium size={18}>
              Price: {item?.actualPrice}
            </Text>

            <View>
              <AppButton
                title="Confirm"
                m_Top={RF(32)}
                bgClr={changeColor}
                onPress={() => confirmBooking()}
              />
            </View>
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default BuyInsurance;

const styles = StyleSheet.create({
  File_S: {
    flexDirection: 'row',
    height: RF(74),
    backgroundColor: '#F6F7F9',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: RF(8),
    width: '100%',
    paddingHorizontal: RF(12),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#00276D',
    paddingVertical: RF(12),

    marginTop: RF(16),
    borderRadius: RF(16),
  },
  ImageShow: {
    width: RF(32),
    height: RF(32),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(32),
    elevation: 5,
    overflow: 'hidden',
  },
  contentView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  hitSlop: {
    top: RF(8),
    right: RF(8),
    left: RF(8),
    bottom: RF(8),
  },
  crossStyle: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: 'red',
  },
  mt: {paddingHorizontal: RF(10), paddingBottom: RF(8)},
  MainContainer: {
    paddingHorizontal: RF(16),
    paddingVertical: RF(16),
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: RF(16),
    elevation: 1,
  },
  accordion: {
    padding: RF(10),
    marginVertical: RF(10),
    overflow: 'hidden',
    borderRadius: RF(16),
    backgroundColor: '#D9D9D9',
  },
  MainContainer2: {
    paddingHorizontal: RF(16),
    paddingVertical: RF(16),
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: RF(16),
    elevation: 1,
    marginTop: RF(16),
  },
  Container: {flexDirection: 'row', gap: RF(8), marginTop: RF(16)},
  contentStyle: {
    marginHorizontal: RF(24),
    marginTop: RF(24),
    paddingBottom: RF(80),
  },
  Gap_styles: {gap: RF(4), alignItems: 'center', marginTop: RF(16)},
  viewRow: {
    flexDirection: 'row',
    gap: RF(16),
    marginTop: RF(16),
  },
  ImageBackGround: {
    width: RF(48),
    height: RF(48),
    borderRadius: RF(100),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: '#fff',
  },
  ImgView: {
    width: RF(24),
    height: RF(24),
    resizeMode: 'contain',
  },
  Upload_Image: {width: RF(22), height: RF(26), resizeMode: 'contain'},
  ImgDev: {
    flexDirection: 'row',
    gap: RF(8),
  },
  DOT: {
    flexDirection: 'row',
    gap: RF(16),
    width: '88%',
  },
  ContentCr: {
    flexDirection: 'column',
    gap: RF(8),
    width: '90%',
    marginTop: RF(16),
  },
  gap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
  },
  InputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#00276D',
    gap: RF(12),
    width: '100%',
  },
  ViewImage: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  TopView: {
    margin: rs(16),
    marginTop: rs(8),
    paddingBottom: RF(80),
  },
  UpLoad_S: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: RF(149),
    borderRadius: RF(16),
    marginTop: RF(16),
    borderColor: '#00276D',
    padding: RF(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

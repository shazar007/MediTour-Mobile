import useStyles from './styles';
import {backIcon, cloudImg, documents1} from '@assets';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  CustomDropDown,
  Generic_List_Item_Selection,
  CustomFloatingLabelInput,
  CustomHeader,
} from '@components';
import {RF, SCREEN_HEIGHT, getColorCode} from '@theme';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {
  margin,
  _gender,
  navigate,
  navigationRef,
  SECTION_Travel,
  BASE_URL,
  showToast,
} from '@services';
import axios from 'axios';
import {setTravel} from '@redux';
import {Alert} from '@utils';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      pckg?: any;
    };
  }>;
}

const Travel_Benefits = (props: Props, navigation: any) => {
  const {pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {endPoints} = getColorCode();

  //....states....//
  const [logo, setLogo] = useState('');
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [policy, setPolicy] = useState<any>(false);
  const [loss_title, setLoss_title] = useState<any>('');
  const [delay_title, setdelay_title] = useState<any>('');
  const [flight_title, setFlight_title] = useState<any>('');
  const [baggage_title, setbaggage_title] = useState<any>('');
  const {travel} = useSelector((state: any) => state.root.b2b);

  //....functions....//
  const openDrawer = () => {
    navigationRef.current?.goBack();
  };
  const onNext = () => {
    if (policy) {
      if (!logo) {
        showToast('Error', 'Please upload a policy document', true);
        return;
      }

      dispatch(
        setTravel({
          ...travel,
          policyDocument: logo,
        }),
      );
      navigate('Category_Price', {pckg: pckg});
    } else {
      if (!flight_title || !loss_title || !delay_title || !baggage_title) {
        showToast('Error', 'Please fill all fields', true);
        return;
      }

      dispatch(
        setTravel({
          ...travel,
          luggageArrivalDelay: delay_title,
          passportLoss: loss_title,
          baggageLoss: baggage_title,
          flightDelay: flight_title,
        }),
      );

      setPolicy(true);
    }
  };

  const onPressItem = (item: any, index?: any, type?: any) => {
    if (type == 'med') {
      setFlight_title(`Delivery of medicine (${item?.title})`);
      // clone.limits = item.title;
    } else if (type == 'child') {
      setLoss_title(`Return of dependent children (${item?.title})`);
      // clone.limits = item.title;
    } else if (type == 'mort') {
      setdelay_title(`Repatriation of mortal remains (${item?.title})`);
      // clone.limits = item.title;
    } else if (type == 'ill') {
      setbaggage_title(
        `Repatriation in case of illness/injury (${item?.title})`,
      );
      // clone.limits = item.title;
    }
    // setObj(clone);
  };
  const onSelectImage = async (index: any) => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'image/jpeg',
        name: name,
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          setLogo(response?.data?.fileUrl);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            Alert.showError('Server');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoading(false);
      }
    }
  };
  const handleChange = (text: string, type: any) => {
    if (type == 'f') {
      setFlight_title(text);
    } else if (type == 'l') {
      setLoss_title(text);
    } else if (type == 'd') {
      setdelay_title(text);
    } else if (type == 'b') {
      setbaggage_title(text);
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

      <View style={{marginHorizontal: RF(16), marginTop: RF(20)}}>
        <Text size={18} SFsemiBold color={colors?.bluE}>
          {policy ? 'Policy' : '  Travel Benefits'}
        </Text>
      </View>

      {policy ? (
        <View
          style={{
            height: RF(SCREEN_HEIGHT / 2.5),
          }}>
          <Pressable style={styles.vImg} onPress={onSelectImage}>
            <Image style={styles.image} source={logo ? documents1 : cloudImg} />
            <Text
              size={16}
              SFregular
              color={colors?.bluE}
              numberOfLines={1}
              style={{width: RF(200)}}>
              {logo ? logo : 'Drop your image here, or browse'}
            </Text>
            {!logo && (
              <Text size={14} SFregular>
                Supports PNG,JPG,Webp
              </Text>
            )}
          </Pressable>
        </View>
      ) : (
        <View style={{marginHorizontal: RF(20)}}>
          <ScrollView
            style={{height: RF(370)}}
            contentContainerStyle={styles.content}>
            <>
              <CustomFloatingLabelInput
                m_Top={RF(20)}
                bdClr={'black'}
                inputClr={'black'}
                labelClr={'black'}
                eyeIconClr={'black'}
                value={flight_title}
                label={'Flight delay'}
                tintColorStart={'black'}
                keyboardType={'default'}
                placeholderTextColor={'black'}
                onChangeText={(text: any) => handleChange(text, 'f')}
              />
              <CustomFloatingLabelInput
                m_Top={RF(20)}
                bdClr={'black'}
                inputClr={'black'}
                labelClr={'black'}
                eyeIconClr={'black'}
                value={loss_title}
                label={'Loss of Passport'}
                tintColorStart={'black'}
                keyboardType={'default'}
                placeholderTextColor={'black'}
                onChangeText={(text: any) => handleChange(text, 'l')}
              />
              <CustomFloatingLabelInput
                m_Top={RF(20)}
                bdClr={'black'}
                inputClr={'black'}
                labelClr={'black'}
                eyeIconClr={'black'}
                value={delay_title}
                label={'Delay in the arrival of luggage'}
                tintColorStart={'black'}
                keyboardType={'default'}
                placeholderTextColor={'black'}
                onChangeText={(text: any) => handleChange(text, 'd')}
              />
              <CustomFloatingLabelInput
                m_Top={RF(20)}
                bdClr={'black'}
                inputClr={'black'}
                labelClr={'black'}
                eyeIconClr={'black'}
                value={baggage_title}
                tintColorStart={'black'}
                keyboardType={'default'}
                label={'Loss of Baggage'}
                placeholderTextColor={'black'}
                onChangeText={(text: any) => handleChange(text, 'b')}
              />
            </>
          </ScrollView>
        </View>
      )}

      <View style={styles.view}>
        <AppButton
          size={14}
          title="Next"
          onPress={onNext}
          // textcolor={colors.bluE}
          // bgClr={colors.Insurance}
        />
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default Travel_Benefits;

{
  // const [medical_Expenses, setMedicalExpenses] = useState<any>([
  //   {
  //     title: 'Start Amount',
  //     value: '',
  //   },
  //   {
  //     title: 'End Amount',
  //     value: '',
  //   },
  // ]);
  // const [illness, setIllness] = useState<any>([
  //   {
  //     title: 'On Actual',
  //   },
  //   {
  //     title: 'No',
  //   },
  // ]);
  // const [medicines, setMedicines] = useState<any>([
  //   {
  //     title: 'On Actual',
  //   },
  //   {
  //     title: 'No',
  //   },
  // ]);
  // const [mortal, setMortal] = useState<any>([
  //   {
  //     title: 'On Actual',
  //   },
  //   {
  //     title: 'No',
  //   },
  // ]);
  // const [children, setChildren] = useState<any>([
  //   {
  //     title: 'On Actual',
  //   },
  //   {
  //     title: 'No',
  //   },
  // ]);
  // const [array, setArray] = useState<any>([
  //   {
  //     title: 'Medical Expenses & Hospitalization',
  //     content: '',
  //   },
  // ]);
  /* <CustomAccordion
                  open={open}
                  size={RF(12)}
                  setOpen={setOpen}
                  clr={colors?.fadeGray}
                  data={array}
                  activeSections={activeSections}
                  setActiveSections={setActiveSections}
                  content={(item: any, index: any) => {
                    return (
                      <>
                        <Generic_List
                          mt={5}
                          index={index}
                          style={styles.pressBtn}
                          data={medical_Expenses}
                          setData={setMedicalExpenses}
                          handleDone={(index: any) => onClick(index)}
                        />
                      </>
                    );
                  }}
                /> */
}
{
  /* <View style={styles.line} /> */
}

{
  /* <View style={margin.top_16} />
              <CustomDropDown
                size={RF(12)}
                open={med}
                clicked={med}
                setClicked={setMed}
                title={flight_title}
                clr={colors?.fadeGray}>
                <Generic_List_Item_Selection
                  data={medicines}
                  onPressItem={(item: any, index: any) =>
                    onPressItem(item, index, 'med')
                  }
                />
              </CustomDropDown>
              <View style={styles.line} />

              <View style={margin.top_16} />
              <CustomDropDown
                size={RF(12)}
                open={child}
                clicked={child}
                title={loss_title}
                setClicked={setChild}
                clr={colors?.fadeGray}>
                <Generic_List_Item_Selection
                  data={children}
                  onPressItem={(item: any, index: any) =>
                    onPressItem(item, index, 'child')
                  }
                />
              </CustomDropDown>

              <View style={styles.line} />

              <View style={margin.top_16} />
              <CustomDropDown
                size={RF(12)}
                open={mort}
                clicked={mort}
                setClicked={setMort}
                title={delay_title}
                clr={colors?.fadeGray}>
                <Generic_List_Item_Selection
                  data={mortal}
                  onPressItem={(item: any, index: any) =>
                    onPressItem(item, index, 'mort')
                  }
                />
              </CustomDropDown>
              <View style={styles.line} />

              <View style={margin.top_16} />
              <CustomDropDown
                size={RF(12)}
                open={ill}
                clicked={ill}
                setClicked={setIll}
                title={baggage_title}
                clr={colors?.fadeGray}>
                <Generic_List_Item_Selection
                  data={illness}
                  onPressItem={(item: any, index: any) =>
                    onPressItem(item, index, 'ill')
                  }
                />
              </CustomDropDown>
              <View style={styles.line} /> */
}

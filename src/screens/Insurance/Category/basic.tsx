import useStyles from './styles';
import React, {useEffect, useState} from 'react';
import {RF, getColorCode} from '@theme';
import {UploadIconFirst, backIcon} from '@assets';
import {RouteProp, useTheme} from '@react-navigation/native';
import {FlatList, Pressable, ScrollView, TextInput, View} from 'react-native';
import {
  margin,
  _gender,
  navigate,
  BASE_URL,
  showToast,
  pkg_category,
  navigationRef,
  SECTION_Travel,
} from '@services';
import {
  Text,
  Wrapper,
  CheckBox,
  AppButton,
  Generic_List,
  CustomLoader,
  CustomDropDown,
  CustomAccordion,
  Custom_Imput_Component,
  Generic_List_Item_Selection,
  CustomHeader,
} from '@components';
import axios from 'axios';
import {setHealth, setTravel} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Category_Basic = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {endPoints} = getColorCode();
  const [pkg, setPkg] = useState('');
  const dispatch: any = useDispatch();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [days, setDays] = useState('');
  const [limit, setLimit] = useState('');
  const [claim, setClaim] = useState('');
  const [imageName, setImageName] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState('');
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');
  const [countryName, setCountryName] = useState('');
  const [packge, setPackage] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [medical, setMedical] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [activeSections, setActiveSections] = useState<any>([]);
  const [pkg_title, setPkg_Title] = useState<any>('Package Category');
  const [item_selected, setItemSelected] = useState<any>('');
  const {health, travel} = useSelector((state: any) => state.root.b2b);
  const [medical_Covering, setMedicalCovering] = useState<any>([
    {
      title: 'Start Amount',
      value: '',
    },
    {
      title: 'End Amount',
      value: '',
    },
  ]);
  const [medical_Covering_Array, setMedical_Covering_Array] = useState<any>([
    {
      title: 'Medical Covering',
      content: 'Insurance Age Start',
    },
  ]);

  useEffect(() => {
    if (
      pckg == 'Travel Single Trip Individual' ||
      pckg == 'Travel Single Trip Family'
    ) {
      setPackage('singleTrip');
    } else if (
      pckg == 'Travel Multi - Trip Family' ||
      pckg == 'Travel Multi - Trip Individual'
    ) {
      setPackage('multipleTrips');
    }
  }, [pckg]);

  const onNext = () => {
    // Validation for Travel packages
    if (
      (pckg == 'Travel Single Trip Individual' ||
        pckg == 'Travel Single Trip Family' ||
        pckg == 'Travel Multi - Trip Family' ||
        pckg == 'Travel Multi - Trip Individual') &&
      (name === '' ||
        logo === '' ||
        days === '' ||
        pkg === '' ||
        medical_Covering[0].value === '' ||
        medical_Covering[1].value === '' ||
        (selected2 && countryName === '') ||
        item_selected === '')
    ) {
      showToast(
        'Error',
        'Please fill all the required fields before proceeding.',
        false,
      );
      return;
    }

    // Validation for Health packages
    if (
      !(
        pckg == 'Travel Single Trip Individual' ||
        pckg == 'Travel Single Trip Family' ||
        pckg == 'Travel Multi - Trip Family' ||
        pckg == 'Travel Multi - Trip Individual'
      ) &&
      (name === '' ||
        logo === '' ||
        person === '' ||
        limit === '' ||
        claim === '' ||
        pkg === '')
    ) {
      showToast('Error', 'Please fill all fields', false);
      return;
    }

    if (
      pckg == 'Travel Single Trip Individual' ||
      pckg == 'Travel Single Trip Family' ||
      pckg == 'Travel Multi - Trip Family' ||
      pckg == 'Travel Multi - Trip Individual'
    ) {
      dispatch(
        setTravel({
          ...travel,
          pkgDesc: pkg,
          packgName: name,
          tripType: packge,
          packgLogo: logo,
          coveringUpto: days,
          packageCategory: item_selected,
          countrySelection: countryName ? countryName : selected1,
          medicalCover: `${medical_Covering[0].value} - ${medical_Covering[1].value}`,
        }),
      );
      navigate('Medical_Benefits', {pckg: pckg});
    } else {
      dispatch(
        setHealth({
          ...health,
          packgName: name,
          packgLogo: logo,
          person: person,
          DailyRoom_limit: limit,
          claimRatio: claim,
          pkgDesc: pkg,
        }),
      );
      navigate('Haelth_Category_Hos_Lab', {
        pckg: pckg,
      });
    }
  };

  const handleChange = (text: string, type: any) => {
    if (type == 'name') {
      setName(text);
    } else if (type == 'days') {
      setDays(text);
    } else if (type == 'pkg') {
      setPkg(text);
    } else if (type == 'claim') {
      setClaim(text);
    } else if (type == 'limit') {
      setLimit(text);
    } else if (type == 'person') {
      setPerson(text);
    }
  };
  const uploadImage = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();

      // Check if the file type is an image
      if (result[0].type.startsWith('image/')) {
        const headers = {
          'Content-Type': 'multipart/form-data',
        };
        const formData = new FormData();
        formData.append('file', {
          uri: imageUrl,
          type: result[0].type,
          name: name,
        });

        axios
          .post(BASE_URL + endPoints, formData, {
            headers: headers,
          })
          .then(response => {
            setLogo(response?.data?.fileUrl);
            setImageName(name); // Update image name state
          })
          .catch(error => {
            if (error?.response?.data?.message == undefined) {
              showToast('Error', 'Server error', false);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        showToast('Error', 'Please select an image file.', false);
        setLoading(false);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoading(false);
      }
    }
  };

  const onPressItem = (item: any, index?: any, type?: any) => {
    if (type == 'pkg') {
      setCategory(false);
      setPkg_Title(`Package Category ${item?.title}`);
      setItemSelected(item?.title);
      // clone.limits = item.title;
    }
    // setObj(clone);
  };
  const onClick = (index: any) => {
    let clone = JSON.parse(JSON.stringify(SECTION_Travel));
    // let clone = {...obj};
    clone[
      index
    ].title = `Medical Covering (${medical_Covering[0].value} - ${medical_Covering[1].value})`;
    setActiveSections([]);
    setMedical_Covering_Array(clone);
    // clone.icu = item.title;
  };
  const onButton = (i: any) => {
    setSelected2('');
    setSelected1(i?.title);
  };
  const onButton2 = (i: any) => {
    setSelected1('');
    setSelected2(i?.title);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />
      <ScrollView>
        <View style={{marginHorizontal: RF(20), marginTop: RF(16)}}>
          <Text size={18} SFmedium color={colors?.bluE}>
            Basic Info & Covering
          </Text>
          <Custom_Imput_Component
            value={name}
            type={'name'}
            mt={RF(12)}
            label={'Package Name'}
            handleChange={handleChange}
          />
          <Custom_Imput_Component
            value={imageName}
            type={'name'}
            mt={RF(12)}
            editable={false}
            label={'Package Logo'}
            endIcon={UploadIconFirst}
            onPressEnd={uploadImage}
          />

          <Custom_Imput_Component
            value={days}
            type={'days'}
            mt={RF(12)}
            handleChange={handleChange}
            label={'Covering up to (Days)'}
          />

          {pckg == 'Travel Single Trip Individual' ||
          pckg == 'Travel Single Trip Family' ||
          pckg == 'Travel Multi - Trip Family' ||
          pckg == 'Travel Multi - Trip Individual' ? null : (
            <>
              <Custom_Imput_Component
                value={person}
                type={'person'}
                mt={RF(12)}
                handleChange={handleChange}
                label={'Hospitalization Per person'}
              />
              <Custom_Imput_Component
                value={limit}
                type={'limit'}
                mt={RF(12)}
                handleChange={handleChange}
                label={'Daily Room & Board Limit'}
              />
              <Custom_Imput_Component
                value={claim}
                mt={RF(12)}
                type={'claim'}
                label={'Claim Payout Ratio'}
                handleChange={handleChange}
              />
            </>
          )}

          {/* <Custom_Imput_Component
            value={pkg}
            type={'pkg'}
            mt={RF(12)}
            handleChange={handleChange}
            label={'Package Description'}
          /> */}
          <Text size={14} SFmedium color={'#0D47A1'} style={{marginTop: RF(8)}}>
            Package Description
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write Description"
              placeholderTextColor="#6c757d"
              value={pkg}
              onChangeText={text => handleChange(text, 'pkg')}
              multiline={true}
              scrollEnabled={true}
              textAlignVertical="top"
            />
          </View>
          {pckg == 'Travel Single Trip Individual' ||
          pckg == 'Travel Single Trip Family' ||
          pckg == 'Travel Multi - Trip Family' ||
          pckg == 'Travel Multi - Trip Individual' ? (
            <>
              <CustomAccordion
                open={open}
                size={RF(12)}
                setOpen={setOpen}
                clr={colors?.fadeGray}
                data={medical_Covering_Array}
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                style={styles.accStyle}
                content={(item: any, index: any) => {
                  return (
                    <>
                      <Generic_List
                        index={index}
                        styles={styles}
                        data={medical_Covering}
                        setData={setMedicalCovering}
                        handleDone={(index: any) => onClick(index)}
                      />
                    </>
                  );
                }}
              />

              <View style={margin.top_16} />
              <CustomDropDown
                size={RF(12)}
                open={category}
                title={pkg_title}
                clicked={category}
                clr={colors?.fadeGray}
                setClicked={setCategory}>
                <Generic_List_Item_Selection
                  data={pkg_category}
                  bgClr={'#fff'}
                  onPressItem={(item: any, index: any) =>
                    onPressItem(item, index, 'pkg')
                  }
                />
              </CustomDropDown>
              <View style={{marginTop: RF(16)}} />

              <CheckBox
                onPress={onButton}
                selected={selected1}
                colorMid={colors?.bluE}
                title={'Package for Worldwide'}
              />
              <View style={{marginTop: RF(4)}} />
              <CheckBox
                onPress={onButton2}
                selected={selected2}
                colorMid={colors?.bluE}
                title={'Specific Country'}
              />
              {selected2 && (
                <Custom_Imput_Component
                  mt={5}
                  value={countryName}
                  label={'Country Name'}
                  handleChange={(txt: any) => setCountryName(txt)}
                />
              )}
            </>
          ) : null}
        </View>
      </ScrollView>

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

// const List = ({data, onPressItem}: {data?: any; onPressItem?: any}) => {
//   return (
//     <FlatList
//       data={data}
//       style={{backgroundColor: '#D2CFCE'}}
//       renderItem={({item, index}: any) => {
//         return (
//           <Pressable onPress={() => onPressItem(item, index)}>
//             <Text SFregular size={14} style={{margin: RF(5)}}>
//               {item?.title}
//             </Text>
//             <View
//               style={{
//                 height: 1,
//                 backgroundColor: '#000',
//                 marginTop: RF(10),
//               }}
//             />
//           </Pressable>
//         );
//       }}
//     />
//   );
// };

export default Category_Basic;

import {RF, getColorCode} from '@theme';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  CustomDropDown,
  CustomAccordion,
  Custom_Imput_Component,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import React, {useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  backIcon,
  cloudImg,
  documents1,
  drImg,
  upload,
  uploadIcon,
  UploadIconFirst,
  uploadImageUrl,
} from '@assets';
import {FlatList, Image, Pressable, ScrollView, View} from 'react-native';
import {
  BASE_URL,
  _gender,
  icu_Data,
  navigate,
  showToast,
  limit_Data,
  period_Data,
  service_Data,
  coverage_Data,
  maternity_Data,
} from '@services';
import axios from 'axios';
import {setHealth} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {Alert} from '@utils';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Category_Benefits = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {endPoints} = getColorCode();
  const dispatch: any = useDispatch();
  const [logo, setLogo] = useState('');
  const [desc, setDesc] = useState('');
  const [icu, setICU] = useState<any>();
  const [obj, setObj] = useState<any>();
  const [heading, setHeading] = useState('');
  const [period, setPeriod] = useState<any>();
  const [limits, setLimits] = useState<any>();
  const [open, setOpen] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<any>();
  const [claimLogo, setClaimLogo] = useState('');
  const [coverage, setCoverage] = useState<any>();
  const [maternity, setMaternity] = useState<any>();
  const [imageName, setImageName] = useState<any>('');
  const [nameImage, setnameImage] = useState<any>('');
  const {health} = useSelector((state: any) => state.root.b2b);
  const [activeSections, setActiveSections] = useState<any>([]);
  const [selectedICU, setSelectedICU] = useState<string>('ICU / CCU');
  const [selectedLimits, setSelectedLimits] = useState<string>(
    'Additional Limits for Accidental Emergencies',
  );
  const [selectedService, setSelectedService] = useState<string>(
    'Ambulance Service Coverage',
  );
  const [selectedCoverage, setSelectedCoverage] = useState<string>(
    'Coverage of Specialized Investigations',
  );
  const [selectedPeriod, setSelectedPeriod] =
    useState<string>('Waiting Period');
  const [selectedMaternity, setSelectedMaternity] =
    useState<string>('Maternity');
  const [SECTION_MySelf, set_SECTION_MySelf] = useState([
    {
      title: 'Medical Benefits',
      content: 'Insurance Age Start 25',
    },
    {
      title: 'Policy Documents',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Claim Process',
      content: 'Lorem ipsum...',
    },
    {
      title: 'More Features',
      content: 'Lorem ipsum...',
    },
  ]);

  const onNext = () => {
    if (
      !selectedICU ||
      !selectedLimits ||
      !selectedService ||
      !selectedCoverage ||
      !selectedPeriod ||
      (pckg !== 'Health Family' && !selectedMaternity) ||
      !heading ||
      !desc ||
      !logo ||
      !claimLogo
    ) {
      Alert.showError('Please fill in all required fields before saving.');
      return;
    }
    navigate('Category_Price', {
      pckg: `${pckg}`,
    });
  };
  const handleChange = (text: string, type: any) => {
    if (type == 'heading') {
      setHeading(text);
    } else if (type == 'desc') {
      setDesc(text);
    }
  };
  const onSelectImage = async (index: any) => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Restrict to PDF files only
      });
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'application/pdf',
        name: name,
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          setLogo(response?.data?.fileUrl);
          setImageName(name);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            Alert.showError('Server error');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  const onSelct = async (index: any) => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Restrict to PDF files only
      });
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'application/pdf',
        name: name,
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          setClaimLogo(response?.data?.fileUrl);
          setnameImage(name);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('error', 'Server error', false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  const onSave = (type: any) => {
    if (type === 'benefits') {
      if (
        !selectedICU ||
        !selectedLimits ||
        !selectedService ||
        !selectedCoverage ||
        !selectedPeriod ||
        (pckg !== 'Health Family' && !selectedMaternity)
      ) {
        showToast('Error', 'Please fill all Fields', false);
        return;
      }
    } else if (type === 'more') {
      if (!heading || !desc) {
        showToast('Error', 'Please fill all fields', false);
        return;
      }
    }

    dispatch(
      setHealth({
        ...health,
        maternity: obj?.maternity,
        accidentalEmergencyLimits: obj?.limits,
        moreDesc: desc,
        moreheading: heading,
        claimLogo: claimLogo,
        policyLogo: logo,
        icuCcuLimits: obj?.icu,
        ambulanceCoverage: obj?.service,
        specializedInvestigationCoverage: obj?.coverage,
        waitingPeriod: obj?.period,
      }),
    );
    setActiveSections([]);
  };
  const onPressItem = (item: any, index?: any, type?: any) => {
    let clone = {...obj};
    if (type == 'icu') {
      setICU(false);
      clone.icu = item.title;
      setSelectedICU(item.title);
    } else if (type == 'lim') {
      setLimits(false);
      clone.limits = item.title;
      setSelectedLimits(item.title);
    } else if (type == 'ser') {
      setService(false);
      clone.service = item.title;
      setSelectedService(item.title);
    } else if (type == 'cov') {
      setCoverage(false);
      clone.coverage = item.title;
      setSelectedCoverage(item.title);
    } else if (type == 'per') {
      setPeriod(false);
      clone.period = item.title;
      setSelectedPeriod(item.title);
    } else if (type == 'mat') {
      setMaternity(false);
      clone.maternity = item.title;
      setSelectedMaternity(item.title);
    }
    setObj(clone);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

      <ScrollView>
        <View
          style={{
            marginHorizontal: RF(8),
            marginTop: RF(16),
            paddingBottom: RF(80),
          }}>
          <Text
            size={18}
            SFsemiBold
            color={colors?.bluE}
            style={{marginLeft: RF(8)}}>
            Benefits & Policies
          </Text>
          <CustomAccordion
            open={open}
            setOpen={setOpen}
            data={SECTION_MySelf}
            style={styles.accordianValue}
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            content={(item: any, index: any) => {
              return (
                <>
                  {index == 0 ? (
                    <View style={styles.main}>
                      <CustomDropDown
                        open={icu}
                        clicked={icu}
                        clr={colors?.bluE}
                        setClicked={setICU}
                        title={selectedICU}
                        style={{marginBottom: 20}}>
                        <List
                          data={icu_Data}
                          selected={selectedICU}
                          onPressItem={(item: any, index: any) =>
                            onPressItem(item, index, 'icu')
                          }
                        />
                      </CustomDropDown>

                      <CustomDropDown
                        clr={colors?.bluE}
                        open={limits}
                        clicked={limits}
                        setClicked={setLimits}
                        style={{marginBottom: 20}}
                        title={selectedLimits}>
                        <List
                          data={limit_Data}
                          selected={selectedLimits}
                          onPressItem={(item: any, index: any) =>
                            onPressItem(item, index, 'lim')
                          }
                        />
                      </CustomDropDown>

                      <CustomDropDown
                        open={service}
                        clicked={service}
                        clr={colors?.bluE}
                        setClicked={setService}
                        style={{marginBottom: 20}}
                        title={selectedService}>
                        <List
                          data={service_Data}
                          selected={selectedService}
                          onPressItem={(item: any, index: any) =>
                            onPressItem(item, index, 'ser')
                          }
                        />
                      </CustomDropDown>

                      <CustomDropDown
                        open={coverage}
                        clicked={coverage}
                        clr={colors?.bluE}
                        setClicked={setCoverage}
                        style={{marginBottom: 20}}
                        title={selectedCoverage}>
                        <List
                          data={coverage_Data}
                          selected={selectedCoverage}
                          onPressItem={(item: any, index: any) =>
                            onPressItem(item, index, 'cov')
                          }
                        />
                      </CustomDropDown>

                      <CustomDropDown
                        open={period}
                        clicked={period}
                        clr={colors?.bluE}
                        setClicked={setPeriod}
                        title={selectedPeriod}
                        style={{marginBottom: 20}}>
                        <List
                          data={period_Data}
                          selected={selectedPeriod}
                          onPressItem={(item: any, index: any) =>
                            onPressItem(item, index, 'per')
                          }
                        />
                      </CustomDropDown>

                      {pckg !== 'Health Family' && (
                        <CustomDropDown
                          open={maternity}
                          clicked={maternity}
                          clr={colors?.bluE}
                          title={selectedMaternity}
                          setClicked={setMaternity}
                          style={{marginBottom: 20}}>
                          <List
                            data={maternity_Data}
                            selected={selectedMaternity}
                            onPressItem={(item: any, index: any) =>
                              onPressItem(item, index, 'mat')
                            }
                          />
                        </CustomDropDown>
                      )}

                      <AppButton
                        size={14}
                        title="Save"
                        bgClr={'green'}
                        width={RF(110)}
                        height={RF(25)}
                        textcolor={'white'}
                        onPress={() => onSave('benefits')}
                        containerStyle={{marginVertical: RF(10)}}
                      />
                    </View>
                  ) : index == 1 ? (
                    <Pressable
                      style={{marginHorizontal: RF(8), marginVertical: RF(8)}}
                      onPress={() => onSelectImage(index)}>
                      <View style={styles.vImg}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            size={12}
                            SFregular
                            color={colors?.bluE}
                            numberOfLines={1}
                            style={{width: RF(200)}}>
                            {imageName ? imageName : 'Upload Policy Documents'}
                          </Text>
                          <Image style={styles.image} source={uploadImageUrl} />
                        </View>
                      </View>
                    </Pressable>
                  ) : index == 2 ? (
                    <Pressable
                      style={{marginHorizontal: RF(8), marginVertical: RF(8)}}
                      onPress={() => onSelct(index)}>
                      <View style={styles.vImg}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            size={12}
                            SFregular
                            color={colors?.bluE}
                            numberOfLines={1}
                            style={{width: RF(200)}}>
                            {nameImage ? nameImage : 'Upload Documents'}
                          </Text>
                          <Image style={styles.image} source={uploadImageUrl} />
                        </View>
                      </View>
                    </Pressable>
                  ) : (
                    <>
                      <Custom_Imput_Component
                        type={'heading'}
                        value={heading}
                        mt={RF(8)}
                        label={'Haading'}
                        handleChange={(text: any) =>
                          handleChange(text, 'heading')
                        }
                      />
                      <Custom_Imput_Component
                        type={'desc'}
                        value={desc}
                        mt={RF(8)}
                        label={'Description'}
                        handleChange={(text: any) => handleChange(text, 'desc')}
                      />

                      <AppButton
                        size={14}
                        title="Save"
                        bgClr={'green'}
                        onPress={() => onSave('more')}
                        width={RF(100)}
                        height={RF(30)}
                        textcolor={'white'}
                        containerStyle={{marginVertical: RF(16)}}
                      />
                    </>
                  )}
                </>
              );
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.view}>
        <AppButton size={14} title="Next" onPress={onNext} />
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const List = ({
  data,
  onPressItem,
  selected,
}: {
  data?: any;
  onPressItem?: any;
  selected?: any;
}) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({item, index}: any) => {
        return (
          <Pressable
            onPress={() => onPressItem(item, index)}
            style={{
              backgroundColor: selected === item?.title ? '#0D47A1' : '#fff',
              elevation: 5,
              shadowColor: '#fff',
            }}>
            <Text
              SFregular
              size={14}
              color={selected === item?.title ? '#fff' : '#0D47A1'}
              style={{
                margin: RF(5),
              }}>
              {item?.title}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};
export default Category_Benefits;

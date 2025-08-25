import {RF} from '@theme';
import useStyles from './styles';
import {backIcon, dropIcon} from '@assets';
import React, {useState} from 'react';
import {_gender, navigate, navigationRef, showToast} from '@services';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Text,
  Line,
  Wrapper,
  AppButton,
  CustomLoader,
  CustomAccordion,
  CustomFloatingLabelInput,
  CustomHeader,
} from '@components';
import {setHealth} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Category = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [open, setOpen] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const [activeSections, setActiveSections] = useState<any>([]);
  const {health} = useSelector((state: any) => state.root.b2b);
  const [genderData, setGenderData] = useState('');
  const [SECTION_MySelf, set_SECTION_MySelf] = useState([
    {
      title: 'Age Criteria',
      content: 'Insurance Age Start',
    },
    {
      title: 'Select Hospitalization Limit (PKR)',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Gender',
      content: 'Lorem ipsum...',
    },
  ]);
  const [SECTION_Family, set_SECTION_Family] = useState([
    {
      title: 'Your Age Criteria',
      content: 'Insurance Age Start',
    },
    {
      title: 'Spouse Age Criteria',
      content: 'Insurance Age Start',
    },
    {
      title: 'Kid Age',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Select Hospitalization Limit (PKR)',
      content: 'Lorem ipsum...',
    },
  ]);
  const [SECTION_Parents, set_SECTION_Parents] = useState([
    {
      title: 'Their age criteria',
      content: 'Insurance Age Start',
    },
    {
      title: 'Select Hospitalization Limit (PKR)',
      content: 'Lorem ipsum...',
    },
  ]);
  // const [genderData, setGenderData] = useState([
  //   {
  //     title: 'Mail',
  //     value: '',
  //   },
  //   {
  //     title: 'Femail',
  //     value: '',
  //   },
  // ]);
  const [ageData, setAgeData] = useState([
    {
      title: 'Insurance Start Age',
      value: '',
    },
    {
      title: 'Insurance End Age',
      value: '',
    },
  ]);
  const [ageSpouse, setAgeSpouse] = useState([
    {
      title: 'Insurance Start Age',
      value: '',
    },
    {
      title: 'Insurance End Age',
      value: '',
    },
  ]);
  const [ageKid, setAgeKid] = useState([
    {
      title: 'Insurance Start Age',
      value: '',
    },
    {
      title: 'Insurance End Age',
      value: '',
    },
  ]);
  const [hospitalizationLimit, setHospitalizationLimit] = useState([
    {
      title: 'Start Limit',
      value: '',
    },
    {
      title: 'End Limit',
      value: '',
    },
  ]);
  const openDrawer = () => {
    navigationRef.current?.goBack();
  };
  const onSave = () => {
    let isValid = false;

    if (pckg === 'Health Myself') {
      isValid =
        ageData.every(d => d.value !== '') &&
        hospitalizationLimit.every(d => d.value !== '') &&
        genderData !== '';
    } else if (pckg === 'Health Family') {
      isValid =
        ageData.every(d => d.value !== '') &&
        ageSpouse.every(d => d.value !== '') &&
        ageKid.every(d => d.value !== '') &&
        hospitalizationLimit.every(d => d.value !== '');
    } else if (pckg === 'Health Parents') {
      isValid =
        ageData.every(d => d.value !== '') &&
        hospitalizationLimit.every(d => d.value !== '');
    }

    if (!isValid) {
      showToast('Error', 'Please fill all required fields.', true);
      return;
    }

    // Dispatch the appropriate data based on the selected package
    dispatch(
      setHealth({
        endAge: ageData[1].value,
        startAge: ageData[0].value,
        spouseEndAge: ageSpouse[1].value,
        spouseStartAge: ageSpouse[0].value,
        kidEndAge: ageKid[1].value,
        kidStartAge: ageKid[0].value,
        gender: genderData,
        endLimit: hospitalizationLimit[1].value,
        startLimit: hospitalizationLimit[0].value,
      }),
    );

    // Navigate to the next screen
    navigate('Category_Basic', {
      item: {
        limit: `${hospitalizationLimit[0].value}k - ${hospitalizationLimit[1].value}k`,
      },
      pckg: pckg,
    });
  };

  const onClick = async (index?: any) => {
    let clone = JSON.parse(JSON.stringify(SECTION_MySelf));
    if (index === 0) {
      clone[
        index
      ].title = `${ageData[0].value} years - ${ageData[1].value} years`;
    } else if (index === 1) {
      clone[
        index
      ].title = `${hospitalizationLimit[0].value}k - ${hospitalizationLimit[1].value}k`;
    } else if (index === 2) {
      clone[index].title = genderData;
    }
    setActiveSections([]);
    set_SECTION_MySelf(clone);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

        <ScrollView>
          <View style={styles.scroll}>
            <Text size={18} SFmedium color={colors?.bluE}>
              Insurance Category
            </Text>
            <CustomAccordion
              open={open}
              setOpen={setOpen}
              data={
                pckg == 'Health Myself'
                  ? SECTION_MySelf
                  : pckg == 'Health Family'
                  ? SECTION_Family
                  : pckg == 'Health Parents' && SECTION_Parents
              }
              style={[styles.accordion, {top: RF(4)}]}
              activeSections={activeSections}
              setActiveSections={setActiveSections}
              content={(item: any, index: any) => {
                return (
                  <View style={{backgroundColor: '#fff'}}>
                    <Line />
                    {index == 0 ? (
                      <List
                        index={index}
                        data={ageData}
                        styles={styles}
                        handleDone={onClick}
                        keyboardType={'numeric'}
                        setData={setAgeData}
                      />
                    ) : index == 1 ? (
                      <List
                        index={index}
                        styles={styles}
                        handleDone={onClick}
                        keyboardType={'numeric'}
                        data={
                          pckg == 'Health Family'
                            ? ageSpouse
                            : hospitalizationLimit
                        }
                        setData={
                          pckg == 'Health Family'
                            ? setAgeSpouse
                            : setHospitalizationLimit
                        }
                      />
                    ) : index == 2 ? (
                      pckg == 'Health Family' ? (
                        <List
                          index={index}
                          keyboardType={'numeric'}
                          styles={styles}
                          data={pckg == 'Health Family' ? ageKid : genderData}
                          handleDone={onClick}
                          setData={
                            pckg == 'Health Family' ? setAgeKid : setGenderData
                          }
                        />
                      ) : (
                        <DropList
                          styles={styles}
                          FormData={[{title: 'Male'}, {title: 'Female'}]}
                          FormName={'Select Gender'}
                          selected={genderData}
                          stateField={setGenderData}
                        />
                      )
                    ) : (
                      index == 3 && (
                        <List
                          index={index}
                          styles={styles}
                          keyboardType={'numeric'}
                          data={
                            pckg == 'Health Family'
                              ? hospitalizationLimit
                              : genderData
                          }
                          handleDone={onClick}
                          setData={
                            pckg == 'Health Family'
                              ? setHospitalizationLimit
                              : setGenderData
                          }
                        />
                      )
                    )}
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        <View style={styles.view}>
          <AppButton
            size={14}
            onPress={onSave}
            title="Save & Continue"
            width={RF(200)}
            height={RF(30)}
            // textcolor={colors.bluE}
            // bgClr={colors.Insurance}
          />
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const List = ({
  data,
  index,
  styles,
  setData,
  handleDone,
  keyboardType,
}: {
  styles?: any;
  data?: any;
  index?: any;
  setData?: any;
  handleDone?: any;
  keyboardType?: any;
}) => {
  const handleChange = (text: string, index: any) => {
    let clone = JSON.parse(JSON.stringify(data));
    clone[index].value = text;
    setData(clone);
  };
  const onDoneClick = () => {
    const isValid = data.every((d: any) => d.value !== '');
    if (!isValid) {
      showToast('Success', 'Please fill fields before proceed.', true);
      return;
    }
    handleDone(index);
  };
  return (
    <>
      {data?.map((d: any, ind: any) => (
        <CustomFloatingLabelInput
          value={d.value}
          m_Top={RF(16)}
          bdClr={'black'}
          label={d.title}
          inputClr={'black'}
          labelClr={'black'}
          eyeIconClr={'black'}
          tintColorStart={'black'}
          keyboardType={keyboardType}
          placeholderTextColor={'black'}
          onChangeText={(text: any) => handleChange(text, ind)}
        />
      ))}

      <TouchableOpacity onPress={onDoneClick} style={styles.press}>
        <Text size={15} color={'white'}>
          Done
        </Text>
      </TouchableOpacity>
    </>
  );
};

interface Props {
  FormName?: any;
  Name?: any;
  FormData?: any;
  selected: any;
  stateField: any;
  top?: any;
  custom?: any;
  onPress?: any;
  styles?: any;
}
interface Props {
  FormName?: any;
  FormData?: any;
  selected: any;
  stateField: any;
  styles?: any;
}

const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {FormName, FormData, selected, stateField, styles} = props;
  const [clicked, setClicked] = useState(false);

  const handleSelect = (item: any) => {
    stateField(item.title);
    setClicked(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {selected === '' ? FormName : selected}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <FlatList
          data={FormData}
          scrollEnabled={false}
          style={{
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableStyle,
                {
                  backgroundColor: selected === item.title ? '#00276D' : '#fff',
                },
              ]}
              onPress={() => handleSelect(item)}>
              <Text
                SFmedium
                size={14}
                color={selected === item.title ? '#fff' : colors.blueText}
                style={{marginHorizontal: 10}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </>
  );
};

export default Category;

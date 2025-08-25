import {
  Pressable,
  StyleSheet,
  View,
  Animated,
  TextInput,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppButton, CustomHeader, Text, Wrapper} from '@components';
import {
  addTreatmentCost,
  getHospitals,
  getTreatmentList,
  margin,
  navigate,
  navigationRef,
  rs,
  rv,
  TreatmentData,
} from '@services';
import {Alert} from '@utils';
import {getColorCode} from '@theme';
import {dropIcon, search} from '@assets';
import {useTheme} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const keyMapping: any = {
  AppointmentCharges: 'appointmentCharges',
  Medicine: 'medicines',
  'Lab Test': 'labService',
  Hospitalization: 'hospitalization',
  Others: 'other',
};

const AddUpdateTreatment = ({route}: any) => {
  const {item, type} = route?.params || '';
  const {colorCode} = getColorCode();
  const [apiData, setApiData] = useState<any>([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [selected, setSelected] = useState(
    item && item?.isPersonal !== true ? 'hospital' : 'clinic',
  );

  const [hospitalList, setHospitalList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [categoryTreatment, setCategoryTreatment] = useState([]);
  const [hospitalTreatment, setHospitalTreatment] = useState([]);

  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [packageCost, setPackageCost] = useState<any>(
    item?.totalAmount?.toString() || '',
  );
  console.log('🚀 ~ item......:', item);
  const [loading, setLoading] = useState(false);

  const indices = selected === 'hospital' ? [0, 1] : [0, 1]?.slice(1, 2);

  const theme: any = useTheme();
  const colors = theme?.colors;

  useEffect(() => {
    if (type === 'edit') {
      handleValueChange('Appointment Charges', true);
    } else {
      setApiData({});
      setSelectedHospital(null);
    }
  }, [selected]);

  useEffect(() => {
    get_Hospitals();
    if (categoryTreatment?.length === 0) {
      treatmentList();
    } else {
      return;
    }
  }, []);

  const treatmentList = (id?: any) => {
    getTreatmentList(id)
      .then((res: any) => {
        if (selected === 'clinic') {
          setCategoryTreatment(res?.data?.data);
        } else {
          setHospitalTreatment(res?.data?.data);
        }
        return;
      })
      .catch((err: any) => {
        console.log('🚀 ~ treatmentList ~ err:', err);
        return;
      });
  };

  const get_Hospitals = () => {
    getHospitals()
      .then((res: any) => {
        setHospitalList(res?.data?.hospitals);
        return;
      })
      .catch((err: any) => {
        console.log('🚀 ~ treatmentList ~ err:', err);
        return;
      });
  };

  const handleToggle = (title: any) => {
    if (type === 'edit') {
      return;
    } else {
      setOpenIndex(null);
      setSelected(title);
    }
  };

  const openDropDown = (index: any) => {
    if (index === 1 && !selectedHospital && selected === 'hospital') {
      Alert.showError('Please select hospital');
    } else if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const onSelectHospital = (item?: any) => {
    setSelectedHospital(item);
    setOpenIndex(null);
    treatmentList(item?._id);
  };

  const handleValueChange = (key: any, value: any) => {
    setSelectedOptions((prev: any) => {
      const keyParts = key.split(' > ');
      const mainKeyTitle: any = keyParts[0];
      const subKeyTitles = keyParts.slice(1);

      // Map the main key to the desired tempArray key
      const mappedKey = keyMapping[mainKeyTitle] || mainKeyTitle;

      // Use a helper function to update nested state immutably
      const updated = updateNestedState(
        prev,
        [mappedKey, ...subKeyTitles],
        value,
      );

      return updated;
    });
  };

  const updateNestedState: any = (obj: any, keys: string[], value: any) => {
    if (keys.length === 0) return obj;

    const [firstKey, ...restKeys] = keys;
    const existingValue = obj ? obj[firstKey] : undefined;

    let newValue;
    if (restKeys.length === 0) {
      if (value) {
        newValue = value;
      } else {
        newValue = undefined;
      }
    } else {
      newValue = updateNestedState(existingValue || {}, restKeys, value);
    }
    if (newValue !== undefined) {
      return {...obj, [firstKey]: newValue};
    } else {
      const {[firstKey]: _, ...rest} = obj || {};
      return rest;
    }
  };

  const handleContinue = () => {
    const appointmentChargesSelection = selectedOptions['Appointment Charges'];

    const roomNonAc =
      selectedOptions?.hospitalization?.Room &&
      selectedOptions?.hospitalization?.Room['Non-Ac'];
    const roomAc =
      selectedOptions?.hospitalization?.Room &&
      selectedOptions?.hospitalization?.Room['Ac'];
    const ward = selectedOptions?.hospitalization?.Ward;

    const appointChargesYes = appointmentChargesSelection?.Yes ? true : false;
    const appointChargesNo = appointmentChargesSelection?.No ? true : false;

    if (!apiData?.treatmentId) {
      Alert?.showError('Treatment is required');
      return;
    }

    if (appointmentChargesSelection) {
      if (!appointChargesYes && !appointChargesNo) {
        Alert?.showError('Select Appointment Yes/No');
        return;
      }
    }

    if (
      selectedOptions?.hospitalization &&
      !selectedOptions?.hospitalization?.Room &&
      !selectedOptions?.hospitalization?.Ward
    ) {
      Alert?.showError('Select Hospitalization Room/Ward');
      return;
    }

    if (
      selectedOptions?.hospitalization &&
      selectedOptions?.hospitalization?.Room &&
      !roomAc &&
      !roomNonAc
    ) {
      Alert?.showError('Select Hospitalization Ac/Non-Ac');
      return;
    }

    if (!packageCost) {
      Alert?.showError('Please add package cost');
      return;
    }

    if (selectedOptions?.other && !selectedOptions?.othersText) {
      Alert?.showError('Please add description');
      return;
    }

    let body = {
      categoryFound: false,
      treatmentId: apiData?.treatmentId,
      treatment: {
        ...((appointmentChargesSelection?.Yes ||
          appointmentChargesSelection?.No) && {
          appointmentCharges: appointmentChargesSelection?.Yes ? true : false,
        }),
        ...(selectedOptions?.medicines && {medicines: true}),
        ...(selectedOptions?.labService && {labService: true}),
        ...(ward
          ? {hospitalization: 'ward'}
          : roomNonAc
          ? {hospitalization: {nonAc: true}}
          : roomAc
          ? {hospitalization: {ac: true}}
          : ''),
        ...(selectedOptions?.othersText && {
          other: selectedOptions?.othersText,
        }),
      },
      totalAmount: packageCost,
      categoryId: apiData?.categoryId,
      subCategory: apiData?.subCategory,
      isPersonal: selectedHospital?._id ? false : true,
      ...(selectedHospital?._id && {hospitalId: selectedHospital?._id}),
    };

    addTreatmentCost(body)
      .then((res: any) => {
        setLoading(true);
        Alert?.showSuccess('Treatment added successfuly');
        navigationRef?.current?.goBack({title: 'Reload'});
      })
      .catch((err: any) => {
        console.log('🚀 ~ handleContinue ~ err:', err?.response);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Add Treatments'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView contentContainerStyle={{paddingBottom: rv(80)}}>
        <View style={styles.container}>
          <Text style={margin.top_8}>
            Where would you like to treat your pateint?
          </Text>
          <ToggleButtons
            onToggle={handleToggle}
            selected={selected}
            colorCode={colorCode}
          />

          <Text style={margin.bottom_8}>Available Treatments?</Text>

          <View
            style={{
              height: openIndex == 0 || openIndex === 1 ? rv(300) : '100%',
              paddingBottom: 50,
            }}>
            {indices?.map(index => (
              <View
                key={index}
                style={[
                  openIndex === index
                    ? styles.indexContainerOpen
                    : styles.indexContainerClose,
                  {
                    borderColor: colorCode,
                    position: openIndex == 0 ? 'absolute' : 'relative',
                    marginTop: index === 1 ? rv(16) : 0,
                  },
                ]}>
                <Pressable
                  onPress={() => openDropDown(index)}
                  style={{
                    ...styles.dropDownBar,
                    borderBottomWidth: openIndex === index ? 0.5 : 0,
                  }}>
                  <Text
                    style={styles.input}
                    color={
                      apiData?.subCategory ||
                      item?.treatmentId?.subCategory ||
                      selectedHospital?.name ||
                      item?.hospitalId?.name
                        ? colors?.primary
                        : '#7D7D7D'
                    }>
                    {index === 1
                      ? apiData?.subCategory ||
                        item?.treatmentId?.subCategory ||
                        'Select Treatment'
                      : (index === 0 && selectedHospital?.name) ||
                        item?.hospitalId?.name ||
                        'Select Hospital'}
                  </Text>
                  <Image
                    source={dropIcon}
                    style={[
                      styles.icon,
                      {
                        transform: [
                          {rotate: openIndex === index ? '180deg' : '0deg'},
                        ],
                      },
                    ]}
                  />
                </Pressable>
                <SelectTreatments
                  index={index}
                  openIndex={openIndex}
                  open={openIndex === index}
                  colorCode={colorCode}
                  onSelectHospital={onSelectHospital}
                  setApiData={setApiData}
                  data={
                    openIndex === 1 && selected === 'clinic'
                      ? categoryTreatment
                      : openIndex === 1 && selected === 'hospital'
                      ? hospitalTreatment
                      : hospitalList
                  }
                  selectIndex={selectIndex}
                  setSelectIndex={setSelectIndex}
                  setOpenIndex={setOpenIndex}
                />
              </View>
            ))}
            <ScrollView>
              {/* {openIndex !== 1 && ( */}
              <View style={{marginTop: rv(24)}}>
                <Text style={margin?.bottom_16}>What's Included</Text>
                <>
                  {TreatmentData?.map(item => (
                    <CheckboxItem
                      key={item.id}
                      item={item}
                      onValueChange={handleValueChange}
                    />
                  ))}
                  <View
                    style={{
                      ...styles.packageCostView,
                      borderColor: colors?.primary,
                    }}>
                    <TextInput
                      placeholder="Rs. Set package cost"
                      keyboardType="number-pad"
                      maxLength={10}
                      value={packageCost}
                      onChangeText={(val: any) => setPackageCost(val)}
                      style={styles?.insideTextInput}
                    />
                  </View>
                  <AppButton
                    disabled={loading}
                    lodingColor={'#fff'}
                    title="Continue"
                    m_Top={24}
                    loading={loading}
                    onPress={handleContinue}
                  />
                </>
              </View>
              {/* )} */}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AddUpdateTreatment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: rs(16),
  },
  toggleView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 48,
    overflow: 'hidden',
    marginTop: rv(12),
    marginBottom: rv(32),
  },
  toggleButton: {
    width: '50%',
    paddingVertical: rv(16),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: rs(48),
    zIndex: 0,
  },
  indexContainerClose: {
    borderWidth: 1,
    borderRadius: 48,
    overflow: 'hidden',
  },
  indexContainerOpen: {
    borderWidth: 1,
    borderRadius: rs(24),
    flexGrow: 1,
    position: 'absolute',
    overflow: 'hidden',

    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  input: {
    maxWidth: '88%',
    marginLeft: rs(12),
  },
  icon: {
    height: rv(24),
    width: rs(24),
    right: 12,
    resizeMode: 'contain',
    tintColor: '#7D7D7D',
  },
  icon_2: {
    height: rv(16),
    width: rv(16),
    tintColor: '#7D7D7D',
  },
  accordion: {
    backgroundColor: '#fff',
  },
  accordionHeader: {
    gap: rs(16),
    paddingVertical: rv(16),
    paddingLeft: rv(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  childCheckboxMain: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: rv(16),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rv(8),
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#7D7D7D',
    borderRadius: 100,
  },
  dropDownBar: {
    height: rv(48),
    borderBlockColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    // width: Platform.OS === 'ios' ? rs(33) : rs(24),
    // height: Platform.OS === 'ios' ? rv(33) : rv(24),
    marginRight: rs(6),
    transform: [
      {scaleX: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
      {scaleY: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
    ],
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#1a4b8a',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: rv(8),
  },
  textInput: {
    height: 100,
    fontSize: 16,
    color: '#000',
    paddingTop: 0,
  },

  packageCostView: {
    borderWidth: 1,
    paddingHorizontal: rs(16),
    height: rv(48),
    alignItems: 'center',
    borderRadius: rs(24),
    marginTop: rv(16),
    flexDirection: 'row',
    overflow: 'hidden',
  },

  insideTextInput: {
    flexGrow: 1,
    padding: 0,
    paddingLeft: rs(8),
  },
});

const CheckboxItem = ({item, onValueChange, level = 0}: any) => {
  const {title, subOptions} = item;
  const [isChecked, setIsChecked] = useState(false);
  const [selectedSubOptionId, setSelectedSubOptionId] = useState(null);
  const [selectedRoomOption, setSelectedRoomOption] = useState(null);
  const [othersText, setOthersText] = useState('');

  const handleCheckChange = (value: any) => {
    setIsChecked(value);
    onValueChange(title, value);

    if (!value) {
      setSelectedSubOptionId(null);
      setSelectedRoomOption(null);
      if (title === 'Others') {
        setOthersText('');
        onValueChange('othersText', '');
      }
    }
  };

  const handleSubOptionChange = (subItem: any) => {
    setSelectedSubOptionId(subItem.id);
    onValueChange(`${title} > ${subItem.title}`, true);

    // Deselect other sub-options
    if (subOptions) {
      subOptions.forEach((sub: any) => {
        if (sub.id !== subItem.id) {
          onValueChange(`${title} > ${sub.title}`, false);
        }
      });
    }

    // Reset room options if not selecting "Room"
    if (subItem.title !== 'Room') {
      setSelectedRoomOption(null);
    }
  };

  const handleOthersTextChange = (text: any) => {
    setOthersText(text);
    onValueChange('othersText', text);
  };

  return (
    <View style={{marginLeft: level * 20}}>
      {/* Main Checkbox */}
      <View style={styles.row}>
        <CheckBox
          value={isChecked}
          onValueChange={handleCheckChange}
          tintColors={{true: '#007BFF', false: '#007BFF'}}
          boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
        />
        <Text style={{color: '#7D7D7D', marginLeft: 8}}>{title}</Text>
      </View>

      {/* Sub-Options */}
      {isChecked && subOptions && subOptions.length > 0 && (
        <View>
          {subOptions.map((subItem: any) => (
            <View key={subItem.id}>
              <View style={[styles.row, {marginLeft: 20}]}>
                <CheckBox
                  value={selectedSubOptionId === subItem.id}
                  onValueChange={() => handleSubOptionChange(subItem)}
                  tintColors={{true: '#007BFF', false: '#007BFF'}}
                  boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
                />
                <Text style={{color: '#7D7D7D', marginLeft: 8}}>
                  {subItem.title}
                </Text>
              </View>

              {/* Render "Ac" and "Non-Ac" options under "Room" */}
              {selectedSubOptionId === subItem.id &&
                subItem.title === 'Room' && (
                  <View style={{marginLeft: 20}}>
                    {['Ac', 'Non-Ac'].map((d: any) => (
                      <View key={d} style={[styles.row, {marginLeft: 20}]}>
                        <CheckBox
                          value={selectedRoomOption === d}
                          onValueChange={() => {
                            setSelectedRoomOption(d);
                            onValueChange(
                              `${title} > ${subItem.title} > ${d}`,
                              true,
                            );

                            // Deselect other room options
                            ['Ac', 'Non-Ac'].forEach(roomOption => {
                              if (roomOption !== d) {
                                onValueChange(
                                  `${title} > ${subItem.title} > ${roomOption}`,
                                  false,
                                );
                              }
                            });
                          }}
                          tintColors={{true: '#007BFF', false: '#007BFF'}}
                          boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
                        />
                        <Text style={{color: '#7D7D7D', marginLeft: 8}}>
                          {d}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          ))}
        </View>
      )}
      {isChecked && title === 'Others' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Description about patient"
            placeholderTextColor="#6c757d"
            value={othersText}
            onChangeText={handleOthersTextChange}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
          />
        </View>
      )}
    </View>
  );
};

const ToggleButtons = ({onToggle, selected, colorCode}: any) => {
  const animation = useRef(
    new Animated.Value(selected === 'clinic' ? 0 : 1),
  ).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: selected === 'clinic' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const slideAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });
  return (
    <View
      style={{
        ...styles?.toggleView,
        backgroundColor: 'rgba(13, 71, 161, 0.2)',
      }}>
      <Animated.View
        style={[
          styles.slider,
          {left: slideAnimation, backgroundColor: colorCode},
        ]}
      />
      <Pressable style={styles.toggleButton} onPress={() => onToggle('clinic')}>
        <Text style={{color: selected === 'clinic' ? '#fff' : colorCode}}>
          CLINIC
        </Text>
      </Pressable>
      <Pressable
        style={styles.toggleButton}
        onPress={() => onToggle('hospital')}>
        <Text style={{color: selected === 'hospital' ? '#fff' : colorCode}}>
          HOSPITAL
        </Text>
      </Pressable>
    </View>
  );
};

const SelectTreatments = ({
  open,
  openIndex,
  data,
  onSelectHospital,
  setApiData,
  selectIndex,
  setSelectIndex,
  setOpenIndex,
}: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterSubcategory = (subcategory: any) => {
    return data?.filter((item: any) =>
      item?.treatments?.some((treatment: any) =>
        treatment?.subCategory
          ?.toLowerCase()
          ?.includes(subcategory?.toLowerCase()),
      ),
    );
  };

  const filteredData = filterSubcategory(searchTerm);
  return (
    <>
      {open && (
        <ScrollView>
          <NewSearch setSearchTerm={setSearchTerm} />
          {openIndex === 1 ? (
            filteredData?.map((category: any, index: any) => (
              <Category
                ind={index}
                setApiData={setApiData}
                item={category}
                selectIndex={selectIndex}
                setSelectIndex={setSelectIndex}
                setOpenIndex={setOpenIndex}
              />
            ))
          ) : (
            <View style={{paddingLeft: rv(12), marginTop: rv(16)}}>
              {data?.map((ite: any, index: any) => (
                <Text
                  onPress={() => onSelectHospital(ite)}
                  key={index}
                  color={'#7D7D7D'}
                  style={{paddingBottom: rv(16)}}>
                  {ite?.name}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};

const NewSearch = ({setSearchTerm}: any) => {
  const handleSearch = (input: any) => {
    setSearchTerm(input);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        height: rv(48),
        alignItems: 'center',
        paddingHorizontal: rs(12),
        borderBottomWidth: 0.5,
        borderColor: '#D9D9D9',
        gap: rs(12),
      }}>
      <Image style={styles.icon_2} source={search} />
      <TextInput
        placeholder="What are you looking for"
        placeholderTextColor={'#7D7D7D'}
        style={{padding: 0, paddingVertical: 0, paddingTop: 0}}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const Category = ({
  ind,
  item,
  selectIndex,
  setSelectIndex,
  setApiData,
  setOpenIndex,
}: any) => {
  const onPressTreatment = (indx: number) => {
    if (selectIndex === indx) {
      setSelectIndex(null);
      // setApiData({});
    } else {
      setSelectIndex(indx);
      setApiData((prevState: any) => ({
        ...prevState,
        categoryId: item?._id?._id,
      }));
    }
  };

  return (
    <>
      <Pressable
        key={ind}
        onPress={() => onPressTreatment(ind)}
        style={styles.accordionHeader}>
        <Image
          source={dropIcon}
          style={[
            styles.icon_2,
            {transform: [{rotate: selectIndex === ind ? '0deg' : '-90deg'}]},
          ]}
        />
        <Text color={'#7D7D7D'}>{item?._id?.categoryName}</Text>
      </Pressable>
      {selectIndex === ind &&
        item?.treatments?.map((i: any, index: any) => {
          console.log('🚀 ~ item?.treatments?.map ~ i:', i);
          return (
            <RenderTreatment
              data={i}
              key={index}
              setApiData={setApiData}
              setOpenIndex={setOpenIndex}
              setSelectIndex={setSelectIndex}
            />
          );
        })}
    </>
  );
};

const RenderTreatment = ({
  data,
  index,
  setApiData,
  setOpenIndex,
  setSelectIndex,
}: any) => {
  const onPressTreatment = () => {
    setOpenIndex(null);
    setSelectIndex(null);
    setApiData((prevState: any) => ({
      ...prevState,
      treatmentId: data?.treatmentId,
      subCategory: data?.subCategory,
    }));
  };

  return (
    <Pressable
      onPress={onPressTreatment}
      key={index}
      style={[styles?.accordionHeader, {paddingLeft: rv(36)}]}>
      <View style={styles.dot} />
      <Text color={'#7D7D7D'}>{data?.subCategory}</Text>
    </Pressable>
  );
};

import useStyles from './styles';
import {backIcon} from '@assets';
import {
  Text,
  Wrapper,
  AppButton,
  Generic_List,
  CustomLoader,
  CustomDropDown,
  CustomAccordion,
  Custom_Imput_Component,
  Generic_List_Item_Selection,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  margin,
  _gender,
  navigate,
  navigationRef,
  SECTION_Travel,
  showToast,
} from '@services';
import {setTravel} from '@redux';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      pckg?: any;
    };
  }>;
}

const Medical_Benefits = (props: Props, navigation: any) => {
  const {pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  //....states....//
  const dispatch: any = useDispatch();
  const [name, setName] = useState('');
  const [days, setDays] = useState('');
  const [obj, setObj] = useState<any>();
  const [open, setOpen] = useState(false);
  const [med, setMed] = useState<any>(false);
  const [ill, setIll] = useState<any>(false);
  const [mort, setMort] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [child, setChild] = useState<any>(false);
  const [activeSections, setActiveSections] = useState<any>([]);
  const {health, travel} = useSelector((state: any) => state.root.b2b);
  const [medicine_title, setMedicine_Title] = useState<any>(
    'Delivery of medicine',
  );
  const [child_title, setChild_Title] = useState<any>(
    'Return of dependent children',
  );
  const [mortal_title, setMortal_Title] = useState<any>(
    'Repatriation of mortal remains',
  );
  const [illness_title, setIllness_Title] = useState<any>(
    'Repatriation in case of illness/injury',
  );
  const [medical_Expenses, setMedicalExpenses] = useState<any>([
    {
      title: 'Start Amount',
      value: '',
    },
    {
      title: 'End Amount',
      value: '',
    },
  ]);
  const [illness, setIllness] = useState<any>([
    {
      title: 'Yes',
    },
    {
      title: 'No',
    },
  ]);
  const [medicines, setMedicines] = useState<any>([
    {
      title: 'Yes',
    },
    {
      title: 'No',
    },
  ]);
  const [mortal, setMortal] = useState<any>([
    {
      title: 'Yes',
    },
    {
      title: 'No',
    },
  ]);
  const [children, setChildren] = useState<any>([
    {
      title: 'Yes',
    },
    {
      title: 'No',
    },
  ]);
  const [array, setArray] = useState<any>([
    {
      title: 'Medical Expenses & Hospitalization',
      content: '',
    },
  ]);

  const openDrawer = () => {
    navigationRef.current?.goBack();
  };
  const onNext = () => {
    if (
      !medical_Expenses[0].value ||
      !medical_Expenses[1].value ||
      !days ||
      !obj?.medicineDeliveryCoverage ||
      !obj?.returnOfDependentChildrenCoverage ||
      !obj?.repatriationCoverage ||
      !obj?.repatriationIllnessInjuryCoverage
    ) {
      showToast('Error', 'Please fill All fields.', false);
      return;
    }

    dispatch(
      setTravel({
        ...travel,
        medExpensesHospitalizationCoverage: `${medical_Expenses[0].value} - ${medical_Expenses[1].value}`,
        emergencyReturnHomeCoverage: days,
        obj,
      }),
    );
    navigate('Travel_Benefits', {
      pckg: pckg,
    });
  };

  const handleChange = (text: string, type: any) => {
    if (type == 'name') {
      setName(text);
    } else if (type == 'days') {
      setDays(text);
    }
  };
  const onClick = (index: any) => {
    let clone = JSON.parse(JSON.stringify(SECTION_Travel));
    clone[
      index
    ].title = `Medical Covering (${medical_Expenses[0].value} - ${medical_Expenses[1].value})`;
    setActiveSections([]);
  };
  const onPressItem = (item: any, index?: any, type?: any) => {
    let clone = {...obj};
    if (type == 'med') {
      setMed(false);
      setMedicine_Title(`Delivery of medicine (${item?.title})`);
      clone.medicineDeliveryCoverage = item.title;
    } else if (type == 'child') {
      setChild(false);
      setChild_Title(`Return of dependent children (${item?.title})`);
      clone.returnOfDependentChildrenCoverage = item.title;
    } else if (type == 'mort') {
      setMort(false);
      setMortal_Title(`Repatriation of mortal remains (${item?.title})`);
      clone.repatriationCoverage = item.title;
    } else if (type == 'ill') {
      setIll(false);
      setIllness_Title(
        `Repatriation in case of illness/injury (${item?.title})`,
      );
      clone.repatriationIllnessInjuryCoverage = item.title;
    }
    setObj(clone);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

      <ScrollView>
        <>
          <View style={{marginHorizontal: RF(20), marginTop: RF(20)}}>
            <Text size={18} SFmedium color={colors?.bluE}>
              Medical Benefits
            </Text>
            <CustomAccordion
              open={open}
              data={array}
              size={RF(12)}
              setOpen={setOpen}
              style={styles.vsCode}
              clr={colors?.fadeGray}
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
            />

            <View style={{marginTop: RF(8)}} />
            <CustomDropDown
              size={RF(11)}
              open={ill}
              clicked={ill}
              setClicked={setIll}
              title={illness_title}
              clr={colors?.fadeGray}>
              <Generic_List_Item_Selection
                data={illness}
                bgClr={'#fff'}
                onPressItem={(item: any, index: any) =>
                  onPressItem(item, index, 'ill')
                }
              />
            </CustomDropDown>

            <View style={margin.top_16} />
            <CustomDropDown
              size={RF(12)}
              open={med}
              clicked={med}
              setClicked={setMed}
              title={medicine_title}
              clr={colors?.fadeGray}>
              <Generic_List_Item_Selection
                data={medicines}
                bgClr={'#fff'}
                onPressItem={(item: any, index: any) =>
                  onPressItem(item, index, 'med')
                }
              />
            </CustomDropDown>

            <View style={margin.top_16} />
            <CustomDropDown
              size={RF(12)}
              open={mort}
              clicked={mort}
              setClicked={setMort}
              title={mortal_title}
              clr={colors?.fadeGray}>
              <Generic_List_Item_Selection
                data={mortal}
                bgClr={'#fff'}
                onPressItem={(item: any, index: any) =>
                  onPressItem(item, index, 'mort')
                }
              />
            </CustomDropDown>

            <View style={margin.top_16} />
            <CustomDropDown
              size={RF(12)}
              open={child}
              clicked={child}
              title={child_title}
              setClicked={setChild}
              clr={colors?.fadeGray}>
              <Generic_List_Item_Selection
                data={children}
                bgClr={'#fff'}
                onPressItem={(item: any, index: any) =>
                  onPressItem(item, index, 'child')
                }
              />
            </CustomDropDown>

            <Custom_Imput_Component
              mt={10}
              value={days}
              type={'days'}
              handleChange={handleChange}
              label={'Emergency return home'}
            />
          </View>
        </>
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

export default Medical_Benefits;

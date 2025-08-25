import React, {useState} from 'react';
import Inputdropdown from '../../../shared/components/Inputdropdown';
import {ScrollView, View} from 'react-native';
import {
  AppButton,
  AppTextInput,
  B2BCustomCheckbox,
  CheckBox,
  HeaderCard,
  Line,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {Ambulance, backIcon, checkbox} from '@assets';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {RF} from '@theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {navigate} from '@services';
import FilePicker from '../../../shared/components/FilePicker';
interface Props {
  renderTopSection?: any;
  selectCheckBox: (title: any) => void;
  selected?: any;
  onClose?: () => void;
}
const TravelPackage = (props: Props, {navigation}: any) => {
  const {selectCheckBox, selected, renderTopSection, onClose} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);

  const prices = [
    {label: '10k', value: '10k'},
    {label: '20k', value: '20k'},
    {label: '30k', value: '30k'},
    {label: '40k', value: '40k'},
    {label: '50k', value: '50k'},
    {label: '60k', value: '60k'},
    {label: '70k', value: '70k'},
    {label: '80k', value: '80k'},
    {label: '90k', value: '90k'},
    {label: '100k', value: '100k'},
    {label: '110k', value: '110k'},
    {label: '120k', value: '120k'},
    {label: '130k', value: '130k'},
    {label: '140k', value: '140k'},
    {label: '150k', value: '150k'},
    {label: '160k', value: '160k'},
    {label: '170k', value: '170k'},
    {label: '180k', value: '180k'},
  ];
  const [isOpenPecentages, setIsOpenPecentages] = useState(false);
  const [currentValuePercentages, setCurrentValuePercentages] = useState([]);
  const percentages = [
    {label: '10%', value: '10%'},
    {label: '20%', value: '20%'},
    {label: '30%', value: '30%'},
    {label: '40%', value: '40%'},
    {label: '50%', value: '50%'},
    {label: '60%', value: '60%'},
    {label: '70%', value: '70%'},
    {label: '80%', value: '80%'},
    {label: '90%', value: '90%'},
    {label: '100%', value: '100%'},
  ];
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const TravelPackage = () => {
    navigate('HospitalPackage');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        cardColor={colors.Insurance}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon1={backIcon}
        tintColor={colors.primary}>
        <UserHeaderContent
          ScreenTitle={'Basic Info & Limit'}
          ColorScreenTitle={colors.primary}
          searhIconTrue
          tintColor={colors.primary}
          searhIconTr
          tintTr={colors.primary}
          onlySearchIcon
        />
      </HeaderCard>
      <View style={{marginHorizontal: RF(16), marginVertical: RF(8)}}>
        <AppTextInput
          m_Vertical={18}
          placeholder="Company Name"
          //   startIcon={Ambulance}
          tintColorStart={colors}
        />
        <FilePicker
          placeholder="Package Logo"
          //   source={Ambulance}
          tintColorstart={colors}
          tintColor={colors}
        />
        <DropDownPicker
          items={prices}
          dropDownContainerStyle={{
            backgroundColor: colors.DoctorButton,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomColor: 'black',
            // bottom: 20,
          }}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={val => setCurrentValue(val)}
          maxHeight={500}
          autoScroll
          placeholder="Hospitalization Per person "
          placeholderStyle={{
            color: colors.Doctor,
            fontWeight: '400',
            fontSize: 14,
            marginLeft: RF(14),
          }}
          mode="SIMPLE"
          showArrowIcon={true}
          showTickIcon={true}
          style={{
            // backgroundColor: colors.DoctorButton,
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomColor: 'black', // You can customize the border color
          }}
        />
        <AppTextInput
          m_Vertical={18}
          placeholder="Daily Room & Board Limit "
          //   startIcon={Ambulance}
          tintColorStart={colors}
        />
        <DropDownPicker
          items={percentages}
          dropDownContainerStyle={{
            backgroundColor: colors.DoctorButton,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomColor: 'black',
          }}
          open={isOpenPecentages}
          setOpen={() => setIsOpenPecentages(!isOpenPecentages)}
          value={currentValuePercentages}
          setValue={val => setCurrentValuePercentages(val)}
          maxHeight={500}
          autoScroll
          placeholder="Claim Payout Ratio"
          placeholderStyle={{
            color: colors.primary,
            fontWeight: '400',
            fontSize: 14,
            marginLeft: RF(12),
          }}
          mode="SIMPLE"
          showArrowIcon={true}
          showTickIcon={true}
          style={{
            // backgroundColor: colors.DoctorButton,
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomColor: 'black', // You can customize the border color
          }}
        />
      </View>
      <View style={{marginHorizontal: RF(16), top: '20%'}}>
        <AppButton
          m_Top={56}
          title="Save & Continue"
          bgColor={colors.Insurance}
          textcolor={colors.primary}
          onPress={TravelPackage}
        />
      </View>
    </Wrapper>
  );
};

export default TravelPackage;

import {Image, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {globalStyles, margin, padding} from '@services';
import Text from '../text';
import {
  LabDropDown,
  LabMediTour,
  LabTaxRegistered,
  LabTestCode,
  LabTestPrice,
  LabTestTime,
  TestLab1,
  dropIcon,
} from '@assets';
import {RF} from '@theme';
import Line from '../Line';
import CheckBox from '../CheckBox';
import RnRangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Ratings from '../Ratings';
import ModalButton from '../ModalButton';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import {useTheme} from '@react-navigation/native';
interface Props {
  colors?: any;
}
const distance = [
  {dis: '2'},
  {dis: '8'},
  {dis: '16'},
  {dis: '32'},
  {dis: '34'},
  {dis: '128'},
];
const LabInputModal = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  //   const {colors} = props;
  const [low, setLow] = useState();
  const [high, setHigh] = useState();

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const [selectedStarIndex, setSelectedStarIndex] = useState(-1);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const handleValueChange = useCallback(({low, high}: any) => {
    setLow(low);
    setHigh(high);
  }, []);
  const handleStarPress = (index: any) => {
    setSelectedStarIndex(index);
  };
  return (
    <View style={(padding.Vertical_16, padding.bottom_16)}>
      <View style={[{alignItems: 'center'}, margin.top_16]}>
        <Text size={16} SFbold color={colors.LabOrange} style={margin.left_8}>
          Test Info
        </Text>
      </View>
      <AppTextInput
        m_Vertical={32}
        placeholder="Test Name"
        startIcon={TestLab1}
      />
      <AppTextInput
        // m_Vertical={32}
        placeholder="Test Code"
        startIcon={LabTestCode}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Test Description"
        startIcon={TestLab1}
      />
      <AppTextInput m_Top={32} placeholder="Price" startIcon={LabTestPrice} />
      <AppTextInput
        m_Top={32}
        placeholder="Duration"
        startIcon={LabTestTime}
        endIcon={LabDropDown}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Price for Meditour"
        startIcon={LabMediTour}
      />
    </View>
  );
};

export default LabInputModal;

const styles = StyleSheet.create({
  icon: {
    height: RF(16),
    width: RF(16),
    resizeMode: 'contain',
  },
  slider: {
    width: '100%',
    marginTop: RF(8),
  },
  distanceView: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 1,
    marginTop: RF(8),
    opacity: 20,
    paddingVertical: RF(4),
    paddingHorizontal: RF(8),
    alignSelf: 'flex-start', // Align the view at the start of the parent view (left-most position)
    borderRadius: 5, // Optionally, add border radius for styling
    overflow: 'hidden', // Ensure content does not overflow if it's larger than the container
  },
  extra: {width: '85%', alignSelf: 'center', marginTop: RF(40)},
});

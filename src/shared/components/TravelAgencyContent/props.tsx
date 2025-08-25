import {AirplaneLanding, AirplaneTakeoff, Avatar1, appointment} from '@assets';
import {RF} from '@theme';

/ ....................Arry Data........................... /;

const buttecTxt = [
  {id: 0, title: 'One way'},
  {id: 1, title: 'Round'},
  {id: 2, title: 'Multicity'},
];

/ ....................Props Function........................... /;

export const topCard_props = (selected: any) => ({
  p_Vertical: RF(8),
  p_Horizontal: RF(12),
  data: buttecTxt,
  borderRadius: RF(8),
  isActive: selected,
  back: 'rgba(217, 217, 217, 1)',
});

export const arrival_props = (
  colors: any,
  arrivalValue: any,
  changeColor: any,
) => ({
  startIcon: AirplaneTakeoff,
  tintColorStart: changeColor,
  fontSize: RF(14),
  color: changeColor,
  value: arrivalValue,
  placeholder: 'From',
  placeholderTextColor: colors.fadeGray,
  editable: false,
});

export const departure_props = (
  colors: any,
  departureValue: any,
  changeColor: any,
) => ({
  startIcon: AirplaneLanding,
  tintColorStart: changeColor,
  fontSize: RF(14),
  color: changeColor,
  value: departureValue,
  placeholder: 'To',
  placeholderTextColor: colors.fadeGray,
  editable: false,
});

export const appointment_props = (
  colors: any,
  changeColor: any,
  selectedStartDate: any,
  selectedEndDate?: any,
) => ({
  startIcon: appointment,
  placeholder: 'Departure',
  placeholderTextColor: colors.fadeGray,
  tintColorStart: changeColor,
  fontSize: RF(14),
  m_Top: RF(8),
  color: selectedStartDate ? changeColor : colors.fadeGray,
  editable: false,
});

export const selectRoom_props = (colors: any, changeColor: any) => ({
  placeholder: 'Traveler',
  placeholderTextColor: colors.fadeGray,
  tintColorStart: changeColor,
  borderColor: colors.fadeGray,

  fontSize: RF(14),
  // m_Top: RF(8),
  editable: false,
});
export const selectCheckbox_props = (colors: any, changeColor: any) => ({
  // startIcon: Avatar1,
  placeholder: 'Class',
  placeholderTextColor: colors.fadeGray,
  tintColorStart: changeColor,
  fontSize: RF(14),
  // m_Top: RF(8),
  editable: false,
});
export const searchButton_props = (colors: any, changeColor: any) => ({
  title: 'Search',
  colors: changeColor,
  m_Top: RF(48),
});

export const calenderTheme_props = (colors: any, changeColor: any) => ({
  backgroundColor: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: changeColor,
  selectedDayTextColor: '#ffffff',
  todayTextColor: changeColor,
  dayTextColor: changeColor,
});

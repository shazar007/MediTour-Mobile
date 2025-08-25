import {appointment, Avatar1, live} from '@assets';
import {RF} from '@theme';

/ ....................Arry Data........................... /;

const buttecText = [
  {id: 0, title: 'Hotels'},
  {id: 1, title: 'Apartments'},
  {id: 2, title: 'Homes'},
];

/ ....................Props Function........................... /;

export const topCards_props = (selected: any) => ({
  p_Vertical: RF(12),
  p_Horizontal: RF(16),
  data: buttecText,
  borderRadius: RF(8),
  isActive: selected,
  back: 'rgba(217, 217, 217, 1)',
});

// export const designation_props = (
//   colors: any,
//   hotelValue: any,
//   changeColor: any,
// ) => ({
//   startIcon: live,
//   tintColorStart: changeColor,
//   fontSize: RF(14),
//   color: changeColor,
//   value: hotelValue,
//   placeholder: 'City Name',
//   placeholderTextColor: colors.fadeGray,
//   editable: false,
//   borderColor: colors.fadeGray,
// });

export const appointment_props = (
  colors: any,
  changeColor: any,
  selectedStartDate: any,
  selectedEndDate?: any,
) => ({
  startIcon: appointment,
  placeholder: 'From',
  placeholderTextColor: colors.fadeGray,
  tintColorStart: changeColor,
  borderColor: colors.fadeGray,
  fontSize: RF(14),
  m_Top: RF(16),
  color: selectedStartDate && selectedEndDate ? changeColor : colors.fadeGray,
  editable: false,
});

export const selectRoom_props = (colors: any, changeColor: any) => ({
  startIcon: Avatar1,
  placeholder: '1 room - 1 adult - 0 children',
  placeholderTextColor: colors.fadeGray,
  tintColorStart: changeColor,
  borderColor: colors.fadeGray,
  fontSize: RF(14),
  m_Top: RF(16),
  editable: false,
});

export const searchButton_props = (colors: any, changeColor: any) => ({
  title: 'Search',
  colors: changeColor,
  height: RF(40),
  m_Top: RF(32),
});

export const calenderTheme_props = (colors: any, changeColor: any) => ({
  backgroundColor: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: changeColor,
  selectedDayTextColor: '#ffffff',
  todayTextColor: changeColor,
  dayTextColor: changeColor,
});

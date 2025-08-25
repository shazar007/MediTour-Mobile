import { View, Image, ScrollView, ImageBackground } from 'react-native';

import { drawer, dummyProfileIcon, location, userPlaceholder } from '@assets';
import { TravelEntries, crouselEnteries, crouselEnteries2 } from '@services';
import { SCREEN_WIDTH } from '@theme';

export const homeHeaderProps = {
  twoInRow: true,
  icon1: drawer,
  numberOfIcons: '3',
  plusIcon: true,
} as const;

export const labHeaderProps = {
  numberOfIcons: '2',
  title: 'Hi Wajahat',
} as const;

export const homeHeaderContentProps = (name: any, screen: any) => ({
  nameTitle: `Hi ${name ? name : 'Wajahat Khan'}!`,
  profileIcon: userPlaceholder,
  screen,
  // onlySearchIcon: true,
  placeHolder: 'Search by Doctor, Hospital, Lab...',
  // searhBarTrue: true,
});

export const homeCrousalProps = {
  autoplay: true,
  autoplayInterval: 3000,
  loop: true,
  data: crouselEnteries,
  sliderWidth: SCREEN_WIDTH,
  itemWidth: SCREEN_WIDTH,
} as const;

export const TravelCrousalProps = {
  autoplay: true,
  autoplayInterval: 3000,
  loop: true,
  data: TravelEntries,
  sliderWidth: SCREEN_WIDTH,
  itemWidth: SCREEN_WIDTH,
} as const;
export const homeSecondCrousalProps = {
  autoplay: true,
  autoplayInterval: 3000,
  loop: true,
  data: crouselEnteries2,
  sliderWidth: SCREEN_WIDTH,
  itemWidth: SCREEN_WIDTH,
} as const;

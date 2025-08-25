import React from 'react';
import Text from '../text';
import {
  clinic,
  clinic2,
  hosiLogo,
  hospitallogo,
  house,
  videocall,
} from '@assets';
import {LAYOUT, RF, defaultTheme} from '@theme';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Image} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {globalStyles, margin} from '@services';
import {useSelector} from 'react-redux';

interface Props {
  name?: any;
  text?: any;
  online?: any;
  duration?: any;
  Descriptions?: any;
  averageRating?: any;
  appointmentType?: any;
}
const ViewAll = (props: Props) => {
  const {
    name,
    online,
    text,
    Descriptions,
    duration,
    averageRating,
    appointmentType,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const ratingCompleted = (rating: any) => {};

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Text size={14} SFmedium color={colors.primary}>
          {name ? name : 'Dummy'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image
            style={styles.icon}
            source={
              appointmentType == 'clinic'
                ? clinic2
                : appointmentType == 'hospital'
                ? hosiLogo
                : appointmentType == 'in-house'
                ? house
                : videocall
            }
          />
          <Text size={9} SFregular color={colors.fadeGray}>
            {appointmentType}
          </Text>
        </View>
      </View>
      <Text size={12} SFregular color={colors.greenlight}>
        {duration}
      </Text>
      <Text SFlight size={12} numberOfLines={2} color={colors.greenlight}>
        {Descriptions}
      </Text>

      <View style={[globalStyles.rowSimple, margin.top_8]}>
        <AirbnbRating
          size={15}
          showRating={false}
          isDisabled={true}
          onFinishRating={ratingCompleted}
          defaultRating={averageRating ? averageRating : 0}
        />
      </View>
    </View>
  );
};

export default ViewAll;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      elevation: 2,
      overflow: 'hidden',
      backgroundColor: '#fff',
      borderRadius: LAYOUT.RADIUS.SelectCard,
      paddingHorizontal: RF(20),
      paddingVertical: RF(10),
      marginBottom: RF(10),
      marginHorizontal: RF(1),
    },
    imgView: {flexDirection: 'row', alignItems: 'center'},
    video: {width: RF(16), height: RF(16), marginRight: RF(8)},
    TextStyle: {
      backgroundColor: defaultTheme.colors.lightWhite,
      paddingHorizontal: LAYOUT.PADDING.LOW,
      paddingVertical: LAYOUT.PADDING.VERYLOW,
      borderRadius: LAYOUT.RADIUS.VERYSMAL,
    },
    Container: {
      flexDirection: 'row',
      marginTop: LAYOUT.MARGIN.NORMAL,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    icon: {
      height: RF(16),
      width: RF(16),
      resizeMode: 'contain',
    },
  });

{
  /* <View style={styles.imgView}> */
}
{
  /* <Image source={videocall} style={styles.video} /> */
}
{
  /* <Text size={12} SFregular color={colors.greenlight}>
            {online}
          </Text> */
}
{
  /* </View> */
}

{
  /* <Text size={14} SFmedium color={colors.greenlight}>
              {Feedback}
            </Text> */
}

{
  /* <Text
          size={12}
          SFregular
          color={colors.lightText}
          style={{lineHeight: RF(18), marginTop: LAYOUT.MARGIN.VERYLOW}}>
          {visitors} Daily Visitors
        </Text> */
}
{
  /* <View style={styles.Container}> */
}
{
  /* <TouchableOpacity style={styles.TextStyle}>
                <Text
                  size={9}
                  SFlight
                  color={colors.greenlight}
                  style={{lineHeight: RF(18)}}>
                  {Done}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.TextStyle}>
                <Text
                  size={9}
                  SFlight
                  color={colors.greenlight}
                  style={{lineHeight: RF(18)}}>
                  {Done1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.TextStyle}>
                <Text
                  size={9}
                  SFlight
                  color={colors.greenlight}
                  style={{lineHeight: RF(18)}}>
                  {Done2}
                </Text>
              </TouchableOpacity> */
}
{
  /* </View> */
}

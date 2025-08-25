import List from '../List';
import Text from '../../text';
import useStyles from './styles';
import React, {useState} from 'react';
import {globalStyles, margin} from '@services';
import {View, Image, FlatList} from 'react-native';
import {clock, _5stars, userAvatar, _distance} from '@assets';

interface Props {
  item?: any;
  colors?: any;
  reviews?: any;
  distance?: any;
  onEndEditing?: (i: any) => void;
}

const DetailsInfo = (props: Props) => {
  const {colors, item, reviews, onEndEditing, distance} = props;
  const styles = useStyles(colors);
  const [value, setValue] = useState<any>();

  let formatOpenTime = item?.openTime;
  let formatCloseTime = item?.closeTime;

  return (
    <>
      <View style={[styles.container, margin.top_24]}>
        <View style={[globalStyles.row, margin.top_8]}>
          <List
            title={`Available ${' '} ${item?.openTime}   ${item?.closeTime} `}
            icon={clock}
          />
        </View>
      </View>

      <Text size={18} color={colors.blueText} SFmedium style={margin.top_24}>
        Address
      </Text>
      <Text color={colors.detailText} SFregular style={margin.top_8}>
        {/* Shipping to address:{' '} */}
        {item?.location ? item?.location?.address : item?.pharmacyAddress}
      </Text>
      <View style={[margin.top_24]}>
        <Text size={18} color={colors.blueText} SFmedium>
          Description
        </Text>
        <Text
          size={14}
          SFregular
          style={margin.top_8}
          color={colors.detailText}>
          {item?.description ? item?.description : item?.description}
        </Text>
      </View>

      <View style={globalStyles.row}>
        <Text size={18} color={colors.blueText} SFmedium style={margin.top_24}>
          Reviews
        </Text>
      </View>

      <FlatList
        data={reviews}
        scrollEnabled={false}
        renderItem={({item}: any) => (
          <>
            <View style={[globalStyles.row, margin.top_24]}>
              <View style={styles.roundView}>
                <Image
                  source={item?.userImage ? {uri: item?.userImage} : userAvatar}
                  style={styles.profileImage}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text size={12} SFregular color={'rgba(28, 49, 70, 1)'}>
                  {item?.userName}
                </Text>
                <Text
                  size={12}
                  SFregular
                  color={'rgba(70, 92, 103, 1)'}
                  style={margin.top_4}>
                  {item?.review}
                </Text>
              </View>
            </View>
          </>
        )}
      />
    </>
  );
};

export default DetailsInfo;

{
  /* <Text size={14} color={colors.blueText} SFregular style={margin.top_24}>
          View
        </Text> */
}

{
  /* <TextInput
        value={value}
        style={styles.input}
        onChangeText={(i: any) => {
          setValue(i);
        }}
        onEndEditing={() => onEndEditing(value)}
        placeholderTextColor={'#A7B0B5'}
        placeholder="Type your review here"
      /> */
}
{
  /* <Line colors={colors.medGrey} /> */
}
{
  /* <View style={styles.percent}>
        <Image style={styles.dotsStyle} source={dots} />
      </View> */
}

{
  /* <View style={[globalStyles.rowSimple]}>
          <Text size={10} color={colors.medGrey} SFregular>
            4.0
          </Text>
          <Image style={styles.img} source={_5stars} />
          <Text size={10} color={colors.medGrey} SFregular>
            (1,492)
          </Text>
        </View> */
}
{
  /* <Text size={14} color={colors.blueText} SFregular>
          View
        </Text> */
}

{
  {
    /* <List title={'30Min to reach your area'} /> */
  }

  {
    /* <View
          style={[
            globalStyles.row,
            margin.top_8,
            {justifyContent: 'space-around'},
          ]}>
          <List title={'Verified'} />
          <List title={'Instant replay'} />
          <List title={'All categories'} />
        </View> */
  }
  /* <View style={[globalStyles.row, margin.top_24]}>
        <Pressable style={styles.pressCard}>
          <List title={'Direction'} icon={direction} colors={colors.blueText} />
        </Pressable>
        <Pressable style={styles.pressCard}>
          <List title={'Chat'} icon={chat} colors={colors.blueText} />
        </Pressable>
        <Pressable style={styles.pressCard}>
          <List title={'Call'} icon={call} colors={colors.blueText} />
        </Pressable>
        <Pressable style={styles.pressCard}>
          <List title={'Share'} icon={share} colors={colors.blueText} />
        </Pressable>
      </View> */
}

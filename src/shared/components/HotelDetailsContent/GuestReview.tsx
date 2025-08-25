import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import * as Progress from 'react-native-progress';
import {Review, Right, country} from '@assets';
import useStyles from './styles';
import {globalStyles, margin} from '@services';
const CommentData = [
  {
    id: 1,
    source: Review,
    icon: country,
    title: 'Micheal abc',
    subtitle: 'United Kingdom',
    room: 'Executive King Room',
    date: '2-3 Feb 2024',
    avatar: Right,
    rev1: 'Cleanliness',
    rev2: 'Comfort',
    rev3: 'Facilities',
    rev1rating: '3.3 / 5',
    rev2rating: '3.3 / 5',
    rev3rating: '3.3 / 5',
    comment:
      'Excellent Service and hospitality by park lane as always. My go to place. Excellent blend of posh place in a budget.',
  },
  {
    id: 2,
    source: Review,
    icon: country,
    title: 'Micheal abc',
    subtitle: 'United Kingdom',
    room: 'Executive King Room',
    date: '2-3 Feb 2024',
    avatar: Right,
    rev1: 'Cleanliness',
    rev2: 'Comfort',
    rev3: 'Facilities',
    rev1rating: '3.3 / 5',
    rev2rating: '3.3 / 5',
    rev3rating: '3.3 / 5',
    comment:
      'Excellent Service and hospitality by park lane as always. My go to place. Excellent blend of posh place in a budget.',
  },
  {
    id: 3,
    source: Review,
    icon: country,
    title: 'Micheal abc',
    subtitle: 'United Kingdom',
    room: 'Executive King Room',
    date: '2-3 Feb 2024',
    avatar: Right,
    rev1: 'Cleanliness',
    rev2: 'Comfort',
    rev3: 'Facilities',
    rev1rating: '3.3 / 5',
    rev2rating: '3.3 / 5',
    rev3rating: '3.3 / 5',
    comment:
      'Excellent Service and hospitality by park lane as always. My go to place. Excellent blend of posh place in a budget.',
  },
  {
    id: 4,
    source: Review,
    icon: country,
    title: 'Micheal abc',
    subtitle: 'United Kingdom',
    room: 'Executive King Room',
    date: '2-3 Feb 2024',
    avatar: Right,
    rev1: 'Cleanliness',
    rev2: 'Comfort',
    rev3: 'Facilities',
    rev1rating: '3.3 / 5',
    rev2rating: '3.3 / 5',
    rev3rating: '3.3 / 5',
    comment:
      'Excellent Service and hospitality by park lane as always. My go to place. Excellent blend of posh place in a budget.',
  },
];

const ProgressData = [
  {
    id: 1,
    title: 'Cleanliness',
    rating: '4.3 / 5',
    pro: 0.6,
  },
  {
    id: 2,
    title: 'Comfort',
    rating: '3.3 / 5',
    pro: 0.8,
  },
  {
    id: 3,
    title: 'Facilities',
    rating: '3.7 / 5',
    pro: 0.9,
  },
];

const GuestReview = () => {
  const [showMore, setShowMore] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const sliceData = CommentData.slice(0, 0);
  return (
    <View style={{marginTop: RF(16)}}>
      <View style={styles.GuestStyle}>
        <Text size={16} color={colors.blueText} SFsemiBold>
          Guest reviews
        </Text>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text size={14} color={colors.blueText} SFregular>
            {showMore ? 'See Less' : 'See all'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <FlatList
        scrollEnabled={false}
        data={ProgressData}
        renderItem={({item}) => (
          <View style={{marginTop: RF(4)}}>
            <View style={styles.ProgressStyle}>
              <Text size={14} color={colors.blueText} SFmedium>
                {item.title}
              </Text>
              <Text size={14} color={colors.blueText} SFmedium>
                {item.rating}
              </Text>
            </View>
            <Progress.Bar
              progress={item.pro}
              width={RF(284)}
              height={RF(6)}
              style={{marginTop: RF(8)}}
            />
          </View>
        )}
      /> */}
      <View style={showMore ? {marginTop: RF(32)} : null}>
        <Text size={RF(16)} SFmedium color={colors.blueText}>
          {showMore ? 'What Guest say about us' : null}
        </Text>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          data={showMore == true ? CommentData : sliceData}
          renderItem={({item}) => (
            <View style={styles.ReviewCard}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={item.source}
                  style={{width: RF(48), height: RF(48)}}
                />
                <View style={{flexDirection: 'column', marginLeft: RF(8)}}>
                  <Text size={14} SFmedium color={colors.blueText}>
                    {item.title}
                  </Text>
                  <View style={styles.RowStyle}>
                    <View style={styles.ImageStyles}>
                      <Image source={item.icon} style={styles.img} />
                    </View>
                    <Text
                      size={12}
                      color={colors.blueText}
                      SFmedium
                      style={{marginLeft: RF(8)}}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={globalStyles.row}>
                <Text size={RF(10)} SFsemiBold color={colors.primary}>
                  {item.room}
                </Text>
                <Text size={RF(9)} SFregular color={colors.primary}>
                  {item.date}
                </Text>
                <Image
                  source={item.avatar}
                  style={{width: RF(16), height: RF(16)}}
                />
              </View>
              <View style={{marginTop: RF(16)}}>
                <Text size={RF(14)} SFregular color={'#7D7D7D'}>
                  {item.comment}
                </Text>
              </View>
              <View style={[globalStyles.row, margin.top_8]}>
                <Text size={RF(12)} SFregular color={colors.primary}>
                  {item.rev1}
                </Text>
                <Text size={RF(12)} SFmedium color={colors.primary}>
                  {item.rev1rating}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={RF(12)} SFregular color={colors.primary}>
                  {item.rev2}
                </Text>
                <Text size={RF(12)} SFmedium color={colors.primary}>
                  {item.rev2rating}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={RF(12)} SFregular color={colors.primary}>
                  {item.rev3}
                </Text>
                <Text size={RF(12)} SFmedium color={colors.primary}>
                  {item.rev3rating}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GuestReview;

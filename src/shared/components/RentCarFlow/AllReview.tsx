import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';

interface Props {
  item?: any;
}
const AllReview = (props: Props) => {
  const {item} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.ReviewStyle}>
      <Text size={14} SFmedium color={colors.blueText}>
        {item.Person}
      </Text>
      <Text size={12} SFregular color={colors.blueText}>
        {item.Duration}
      </Text>
      <Text size={12} SFlight color={colors.blueText}>
        {item.comment}
      </Text>
      <Text size={14} SFmedium color={colors.blueText}>
        {item.FeedBackPerson}
      </Text>
      <View style={styles.SatisfiedStyle}>
        <View style={styles.ButtonFeedStyle}>
          <Text size={9} SFregular color={colors.blueText}>
            {item.ReviewPerson}
          </Text>
        </View>
        <View style={styles.ButtonFeedStyle}>
          <Text size={9} SFregular color={colors.blueText}>
            {item.Review}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AllReview;

const styles = StyleSheet.create({
  ReviewStyle: {
    paddingHorizontal: RF(16),
    paddingVertical: RF(16),
    borderRadius: RF(16),
    width: '98%',
    marginHorizontal: RF(4),
    elevation: 2,
    backgroundColor: '#fff',
    marginVertical: RF(4),
    gap: RF(4),
  },
  SatisfiedStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
    marginTop: RF(16),
  },
  ButtonFeedStyle: {
    paddingHorizontal: RF(8),
    paddingVertical: RF(8),
    backgroundColor: '#EBF5FF',
    borderRadius: RF(4),
  },
});

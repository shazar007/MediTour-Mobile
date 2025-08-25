import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../CheckBox';
import {LabDownload, Layer} from '@assets';
import {RF} from '@theme';
import Text from '../text';

interface Props {
  select?: any;
  handelSelectYes?: any;
  Title?: any;
  Sources?: any;
  downLoadText?: any;
  onPress?: any;
  Colors?: string[];
}
const DoseDetails = [
  {id: 1, title: 'Yes'},
  {id: 2, title: 'No'},
];
const LinearComponent = (props: Props) => {
  const {
    select,
    handelSelectYes,
    Colors,
    Title,
    Sources,
    downLoadText,
    onPress,
  } = props;
  return (
    <View style={{marginTop: RF(16)}}>
      <LinearGradient
        style={styles.linearStyles}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={
          Colors
            ? Colors
            : [
                'rgba(220, 233, 238, 1)',
                'rgba(255, 255, 255, 0)',
                'rgba(255, 118, 49, 1)',
              ]
        }>
        <Text size={9} SFregular color={'#00276D'} style={{width: RF(150)}}>
          {Title
            ? Title
            : 'Do you want to conduct your medical test from the lab on MediTour?'}
        </Text>
        {Sources && <Image source={Sources} style={styles.SourcesStyles} />}
        <Image source={Layer} style={styles.ImageView} />
      </LinearGradient>
      <View style={styles.ViewContainer}>
        <FlatList
          horizontal
          data={DoseDetails}
          contentContainerStyle={{
            width: '60%',
          }}
          renderItem={({item}) => (
            <CheckBox
              title={item.title}
              width={'50%'}
              selected={select}
              onPress={() => handelSelectYes(item)}
              c_b={'#00276D'}
              colorMid={'#00276D'}
              textColor={'#00276D'}
              active={'rgba(245, 245, 245, 1)'}
            />
          )}
        />
      </View>
    </View>
  );
};

export default LinearComponent;

const styles = StyleSheet.create({
  linearStyles: {
    width: '100%',
    height: RF(56),
    borderRadius: RF(8),
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RF(8),
  },
  SourcesStyles: {width: RF(49), height: RF(37), resizeMode: 'contain'},
  LabStyles: {width: RF(12), height: RF(12), resizeMode: 'contain'},
  DirectionStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
  },
  ViewContainer: {
    flexDirection: 'row',
    marginTop: RF(8),
  },
  ImageView: {width: RF(93), height: RF(40), resizeMode: 'contain'},
});

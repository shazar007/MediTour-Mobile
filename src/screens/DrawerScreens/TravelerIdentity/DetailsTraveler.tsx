import {Image, Text, View} from 'react-native';
import React from 'react';
import {pasport, UploadIconFirst, userBlue} from '@assets';
import useStyles from './styles';
import {RF} from '@theme';

const DetailsTraveler = ({traveler}) => {
  const styles = useStyles();
  return (
    <View style={{padding: RF(10), gap: RF(12)}}>
      <View style={styles.RoW}>
        <Image source={userBlue} style={styles.ImageView1} />
        <Text size={16} SFregular color={'#00276D'}>
          {traveler.name}
        </Text>
      </View>
      <View style={styles.RowView}>
        <Image source={pasport} style={styles.ImageView1} />
        <Text size={16} SFregular color={'#00276D'}>
          {traveler.passportNo}
        </Text>
      </View>
      <Text size={16} SFmedium color={'#00276D'}>
        Passport
      </Text>
      <View style={styles.afterUpload}>
        <Image
          source={{uri: traveler?.passportFile?.uri}}
          style={styles.ImageView}
        />
        <Text size={12} SFregular color={'#00276D'} style={{width: RF(200)}}>
          {traveler?.passportFile?.name}
        </Text>
      </View>
      <Text size={16} SFmedium color={'#00276D'}>
        Visa
      </Text>
      <View style={styles.afterUpload}>
        <Image
          source={{uri: traveler.visaFile?.uri}}
          style={styles.ImageView}
        />
        <Text size={12} SFregular color={'#00276D'} style={{width: RF(200)}}>
          {traveler.visaFile?.name}
        </Text>
      </View>
    </View>
  );
};

export default DetailsTraveler;

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, CustomLoader, Text} from '@components';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {getSpecialtiesDoctor, navigate, padding, rs} from '@services';
import {Right} from '@assets';
import useStyles from './styles';

const TreatmentComponent = ({
  item,
  screenOnPress,
}: {
  item?: any;
  screenOnPress?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  return (
    <Pressable style={styles.ContainerCard} onPress={screenOnPress}>
      <View style={styles.viewRow}>
        {/* <View style={styles.ImageView}>
            <Image
              source={{uri: item.specialityLogo}}
              style={styles.logoImageStyle}
            />
          </View> */}
        <View style={styles.innerRow}>
          <Text size={14} SFbold color={colors.blueText}>
            {item.specialityTitle}
          </Text>
          <Text size={RF(10)} SFregular color={colors.fadeGray}>
            ({item.doctorsCount} Doctors Available)
          </Text>
        </View>
      </View>
      <View style={styles.image1}>
        <Image style={styles.cardImage} source={Right} resizeMode={'contain'} />
      </View>
    </Pressable>
  );
};

export default TreatmentComponent;

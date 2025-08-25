import {TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '@services';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {star} from '@assets';
import ArryData from './ArryData';
import useStyles from './styles';

interface Props {
  onPress: () => void;
  title?: any;
  m_Top?: any;
}

const DoctorInformation = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {title, onPress, m_Top} = props;

  return (
    <>
      <View style={[styles.Container, {marginTop: m_Top}]}>
        <Text size={16} SFmedium color={colors.blueText}>
          {title}
        </Text>
        <View style={globalStyles.rowSimple}>
          <Image source={star} style={styles.Star} />
          <Text size={12} SFregular color={colors.brown}>
            199
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text
              size={12}
              SFregular
              color={colors.blueText}
              style={styles.ViewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ArryData />
      </View>
    </>
  );
};

export default DoctorInformation;

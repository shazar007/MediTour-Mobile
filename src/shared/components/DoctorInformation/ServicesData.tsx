import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import Text from '../text';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';

interface Props extends TouchableOpacityProps {
  data?: any;
  title?: any;
}

const ServicesData = (props: Props) => {
  const {data, title} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles({});

  return (
    <View style={styles.main}>
      <Text size={16} SFmedium color={colors.blueText}>
        {title}
      </Text>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.view}>
              <TouchableOpacity style={styles.ShowStyle}>
                <Text
                  size={12}
                  SFregular
                  numberOfLines={1}
                  color={colors.subtitle}>
                  {item?.name ? item?.name : item[0]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ServicesData;

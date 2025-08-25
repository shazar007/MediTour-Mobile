import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';

interface Props {
  highlighted?: any;
  onPress: (index: number) => void;
  data?: any[];
  p_Horizontal?: any;
  p_Vertical?: any;
  title?: any;
  b_R?: any;
  // text?: any;
  height?: any;
  width?: any;
  m_R?: any;
}

const ActiveInactive: React.FC<Props> = ({
  onPress,
  highlighted,
  data,
  p_Horizontal,
  p_Vertical,
  title,
  b_R,
  // text,
  height,
  width,
  m_R,
}) => {
  const theme: any = useTheme();
  // const formattedText = text ? text.replace(/\\n/g, '\n') : '';
  const colors = theme.colors;
  const styles = StyleSheet.create({
    container: {
      marginRight: m_R,
      height: height,
      width: width,
      marginVertical: RF(8),
      marginTop: RF(8),
      borderRadius: b_R ? b_R : RF(4),
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginBottom: RF(8),
      marginLeft: RF(1),
    },
    containerHighlighted: {
      backgroundColor: colors.blueText,
    },
    containerNormal: {
      backgroundColor: '#fff',
    },
  });

  return (
    <View>
      <Text size={18} SFmedium color={colors.blueText}>
        {title}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onPress(index)}
            style={[
              styles.container,
              index === highlighted
                ? styles.containerHighlighted
                : styles.containerNormal,
              {paddingHorizontal: p_Horizontal},
              {paddingVertical: p_Vertical},
            ]}>
            <Text
              size={12}
              SFmedium
              color={
                index === highlighted ? colors.background : colors.blueText
              }>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActiveInactive;

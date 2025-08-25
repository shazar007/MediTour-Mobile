import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

interface Props {
  data?: any;
  size?: any;
  style?: any;
  title?: any;
  image?: any;
  width?: any;
  height?: any;
  bgColor?: any;
  b_ground?: any;
  isActive?: any;
  SFregular?: any;
  textColor?: any;
  p_Vertical?: any;
  numColumns?: any;
  horizontal?: any;
  buttonStyle?: any;
  ActiveColor?: any;
  marginRight?: any;
  borderRadius?: any;
  p_Horizontal?: any;
  scrollEnabled?: any;
  justifyContent?: any;
  columnWrapperStyle?: any;
  contentContainerStyle?: any;
  handlePress: (id: any, title: any) => void;
}

const MeditourButton = (props: Props) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    ActiveColor,
    data,
    p_Vertical,
    p_Horizontal,
    columnWrapperStyle,
    contentContainerStyle,
    size,
    horizontal,
    style,
    height,
    isActive,
    title,
    numColumns,
    borderRadius,
    buttonStyle,
    bgColor,
    textColor,
    width,
    marginRight,
    scrollEnabled,
    justifyContent,
    handlePress,
  } = props;

  return (
    <View>
      <FlatList
        horizontal={horizontal}
        numColumns={numColumns}
        scrollEnabled={scrollEnabled}
        data={(data && data) || title}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={columnWrapperStyle}
        contentContainerStyle={[
          styles.container,
          {
            justifyContent: justifyContent ? justifyContent : 'space-between',
          },
          contentContainerStyle,
        ]}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={[
                buttonStyle,
                styles.buttonContainer,
                {
                  backgroundColor:
                    isActive === item.id
                      ? bgColor || (!bgColor && changeColor)
                      : '#D9D9D9',
                  marginRight: marginRight,
                  paddingVertical: p_Vertical ? p_Vertical : RF(12),
                  borderRadius: (borderRadius && borderRadius) || RF(8),
                  paddingHorizontal: p_Horizontal ? p_Horizontal : RF(8),
                },
              ]}
              onPress={() => handlePress && handlePress(item.id, item.title)}>
              {item.picture ? (
                <Image
                  source={item.img}
                  tintColor={isActive === item.id ? '#fff' : ActiveColor}
                  style={{
                    resizeMode: 'contain',
                    width: width ? width : RF(24),
                    height: height ? height : RF(24),
                  }}
                />
              ) : (
                <Text
                  SFregular
                  size={size ? size : 14}
                  style={[styles.textStyle, style]}
                  color={isActive === item.id ? '#fff' : changeColor}>
                  {(item.title && item.title) || title}
                </Text>
              )}
            </TouchableOpacity>
            {/* {item.text && (
              <Text
                size={12}
                SFregular
                color={textColor}
                center
                style={{marginTop: RF(8)}}>
                {item.downText}
              </Text>
            )} */}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MeditourButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: RF(8),
    overflow: 'hidden',
  },
  container: {
    flexGrow: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});

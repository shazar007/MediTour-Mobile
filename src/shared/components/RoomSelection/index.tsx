import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {RF} from '@theme';
import {colors} from '@services';

interface Props {
  color?: any;
  size?: any;
  title?: any;
  setValue?: any;
  M_t?: any;
  value?: any;
  item?: any;
  restrict?: any;
  title2?: any;
}

const RoomSelection = (props: Props) => {
  const {size, color, title, setValue, value, item, restrict, M_t, title2} =
    props;

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1, item);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1, item);
      setCount(count - 1);
    }
  };

  return (
    <View>
      <View style={[styles.container, {marginTop: M_t ? M_t : RF(32)}]}>
        <Text
          size={size ? size : 18}
          SFmedium
          color={color ? color : '#3B58B8'}>
          {title}
        </Text>
        <View
          style={{
            ...styles.selectionCard,
            borderColor: color ? color : '#3B58B8',
          }}>
          <TouchableHighlight
            underlayColor={'#DDDDDD'}
            onPress={handleDecrement}>
            <View style={styles.press}>
              <Text size={18} SFregular color={color ? color : '#3B58B8'}>
                -
              </Text>
            </View>
          </TouchableHighlight>

          <Text size={14} SFregular color={color ? color : '#3B58B8'}>
            {value}
          </Text>
          <TouchableHighlight
            underlayColor={'#DDDDDD'}
            //  onPress={onPress}
            onPress={handleIncrement}>
            <View style={styles.press}>
              <Text
                size={18}
                SFregular
                color={color ? color : '#3B58B8'}
                // style={[styles.press, {textAlign: 'right'}]}
              >
                +
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <Text
        size={size ? size : 12}
        SFmedium
        color={color ? color : colors.LabOrange}
        style={{bottom: RF(10)}}>
        {title2}
      </Text>
      {/* <View style={styles.container}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count || null}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default RoomSelection;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectionCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    width: RF(156),
    height: RF(40),
    borderRadius: 8,
  },
  press: {
    height: '100%',
    width: RF(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingHorizontal: 10,
  // },
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#DDDDDD',
  //   padding: 10,
  // },
  // countContainer: {
  //   alignItems: 'center',
  //   padding: 10,
  // },
  // countText: {
  //   color: '#FF00FF',
  // },
});

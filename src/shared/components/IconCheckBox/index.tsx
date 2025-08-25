import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import Text from '../text';
interface Props {
  titleCheck?: any;
}
const IconCheckBox = (props: Props) => {
  const {titleCheck} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <View style={styles.SaveStyle}>
      <Text size={12} SFregular color={'#00276D'}>
        {titleCheck}
      </Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        tintColors={{true: changeColor, false: '#D9D9D9'}}
      />
    </View>
  );
};

export default IconCheckBox;

const styles = StyleSheet.create({
  SaveStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import React, {useEffect} from 'react';
import {TextInput, View} from 'react-native';
import Text from '../text';
import {RF} from '@theme';
import ImageSelection from '../ImageSelection';
import AppButton from '../AppButton';
import {useDispatch} from 'react-redux';
import {setImg} from '@redux';

const Add_Criteria_Section = ({
  colors,
  name,
  setName,
  styles,
  desc,
  setDesc,
  onClose,
  title,
  uri,
  setUri,
}: {
  styles?: any;
  colors?: any;
  name?: any;
  setName?: any;
  desc?: any;
  setDesc?: any;
  onClose?: any;
  uri?: any;
  title?: any;
  setUri?: any;
}) => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(setImg(''));
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        align
        size={20}
        SFsemiBold
        color={colors?.bluE}
        style={{marginTop: RF(20)}}>
        {title}
      </Text>
      <TextInput
        value={name}
        style={styles._input}
        placeholderTextColor={'#7D7D7D'}
        placeholder="Criteria Name e.g Education"
        onChangeText={text => setName(text)}
      />
      <ImageSelection uri={uri} setUri={setUri} />

      <TextInput
        value={desc}
        style={styles._input}
        placeholder="Description"
        placeholderTextColor={'#7D7D7D'}
        onChangeText={text => setDesc(text)}
      />
      <AppButton
        title="Save"
        onPress={onClose}
        bgClr={'#F4EFFF'}
        textcolor={colors?.bluE}
      />
    </View>
  );
};

export default Add_Criteria_Section;

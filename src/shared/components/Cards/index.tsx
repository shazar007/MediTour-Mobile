import {TextInput, View,ScrollView} from 'react-native';
import React, {useState} from 'react';
import {RF} from '@theme';
import Text from '../text';
import Accordion from './Acardion';
import TagCards from './TagCards';

const Cards = () => {
  const [inputText, setInputText] = useState('');

  const formatDescription = text => {
    const words = text.split(' ');
    const formattedText = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length <= 15) {
        currentLine += word + ' ';
      } else {
        formattedText.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }

    if (currentLine.trim() !== '') {
      formattedText.push(currentLine.trim());
    }

    return formattedText.join('\n');
  };

  const handleTextChange = text => {
    if (text.length <= 50) {
      setInputText(text);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginBottom: 80}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F8F8F8',
            elevation: 4,
            borderRadius: RF(8),
          }}>
          <View style={{marginHorizontal: RF(8), marginVertical: RF(24)}}>
            <Text SFsemiBold color={'#1D263A'}>
              Enter Title
            </Text>
            <TextInput
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              value={formatDescription(inputText)}
              onChangeText={handleTextChange}
              multiline
              style={{
                backgroundColor: '#FFFFFF',
                height: RF(77),
                borderRadius: RF(8),
                marginTop: RF(16),
                paddingHorizontal: RF(16),
              }}
            />
            <View style={{alignItems: 'flex-end', marginTop: RF(8)}}>
              <Text SFregular size={12}>
                {inputText.length} / 50 max
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F8F8F8',
            elevation: 4,
            marginTop: RF(8),
            borderRadius: RF(8),
          }}>
          <View style={{marginHorizontal: RF(8), marginVertical: RF(24)}}>
            <Text SFsemiBold color={'#1D263A'}>
              Enter Title
            </Text>
            <Accordion />
          </View>
        </View>
        <TagCards />
      </View>
    </ScrollView>
  );
};

export default Cards;

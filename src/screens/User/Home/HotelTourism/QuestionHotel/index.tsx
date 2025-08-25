import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  HeaderCard,
  SaveModal,
  Text,
  UserHeaderContent,
} from '@components';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
// import {navigate} from '@services';

const QuestionHotel = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [visible, setVisible] = useState(false);
  const handleSubmit = () => {
    // navigate('RoomInformation');
    setVisible(true);
  };
  useEffect(() => {
    if (visible === true) {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [visible]);
  return (
    <View style={styles.container}>
      <HeaderCard numberOfIcons={'2'} notify>
        <UserHeaderContent ScreenTitle={'Ask a question'} />
      </HeaderCard>
      <View style={{marginHorizontal: RF(24), marginTop: RF(24)}}>
        <Text size={14} SFmedium color={colors.blueText}>
          Your Question
        </Text>
        <TextInput
          placeholderTextColor={colors.blueText}
          placeholder="for example, “Hi, do you have better Wi-Fi speed"
          style={styles.TextStyles}
        />
        <AppButton
          title="Submit Question"
          m_Top={RF(24)}
          onPress={handleSubmit}
        />
      </View>
      {visible && (
        <SaveModal
          Visible={visible}
          title={'Your Question has been Successfully submitted'}
        />
      )}
    </View>
  );
};

export default QuestionHotel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  TextStyles: {
    width: '100%',
    height: RF(171),
    borderWidth: 0.5,
    fontSize: RF(14),
    padding: RF(8),
    fontWeight: '400',
    textAlignVertical: 'top',
    borderColor: '#D9D9D9',
    marginTop: RF(8),
  },
});

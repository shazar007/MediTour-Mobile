import {FlatList, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import AppButton from '../AppButton';
import { backIcon } from '@assets';
import { navigate } from '@services';
const languageName = [
  {
    id: 1,
    title: 'web developing',
  },
  {
    id: 2,
    title: 'web designing',
  },
  {
    id: 3,
    title: 'web for ios',
  },
];
const TagCards = () => {
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F8F8F8',
          elevation: 4,
          marginTop: RF(8),
          borderRadius: RF(8),
        }}>
        <View style={{marginVertical: RF(24), marginHorizontal: RF(16)}}>
          <Text SFsemiBold color={'#1D263A'}>
            TagCards
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              elevation: 5,
              borderRadius: RF(8),
              marginTop: RF(16),
            }}>
            <View style={{paddingHorizontal: RF(16), paddingVertical: RF(16)}}>
              <FlatList
                data={languageName}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: RF(8),
                }}
                contentContainerStyle={{width: '100%'}}
                renderItem={({item}) => (
                  <Text
                    style={{
                      paddingHorizontal: RF(8),
                      paddingVertical: RF(8),
                      backgroundColor: '#F8F8F8',
                      elevation: 1,
                      borderRadius: RF(4),
                      shadowColor: '#fff',
                    }}>
                    {item.title}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>
      </View>
      <AppButton
        title="continue"
        iconTrue={backIcon}
        m_Top={RF(24)}
        onPress={() => navigate('Details')}
      />
    </>
  );
};

export default TagCards;

import {View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Text from '../text';
import {RF} from '@theme';

const TotalAvailable = ({total}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RF(16),
          backgroundColor: '#ffff',
          elevation: 5,
          marginHorizontal: RF(2),
          marginVertical: RF(2),
          marginTop: RF(16),
          borderRadius: RF(16),
          gap: RF(16),
        }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={{
            width: RF(48),
            height: RF(48),
            borderRadius: RF(32),
            resizeMode: 'contain',
          }}
        />
        <View style={{gap: RF(4)}}>
          <Text size={16} SFmedium color={'#00276D'}>
            TotalHomes
          </Text>
          <Text size={12} SFregular color={'#00276D'}>
            {total?.totalHomes} Available
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RF(16),
          backgroundColor: '#ffff',
          elevation: 5,
          marginHorizontal: RF(2),
          marginVertical: RF(2),
          marginTop: RF(16),
          borderRadius: RF(16),
          gap: RF(16),
        }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={{
            width: RF(48),
            height: RF(48),
            borderRadius: RF(32),
            resizeMode: 'contain',
          }}
        />
        <View style={{gap: RF(4)}}>
          <Text size={16} SFmedium color={'#00276D'}>
            TotalApartments
          </Text>
          <Text size={12} SFregular color={'#00276D'}>
            {total?.totalApartments} Available
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RF(16),
          backgroundColor: '#ffff',
          elevation: 5,
          marginHorizontal: RF(2),
          marginVertical: RF(2),
          marginTop: RF(16),
          borderRadius: RF(16),
          gap: RF(16),
        }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={{
            width: RF(48),
            height: RF(48),
            borderRadius: RF(32),
            resizeMode: 'contain',
          }}
        />
        <View style={{gap: RF(4)}}>
          <Text size={16} SFmedium color={'#00276D'}>
            totalBnbs
          </Text>
          <Text size={12} SFregular color={'#00276D'}>
            {total?.totalBnbs} Available
          </Text>
        </View>
      </View>
    </>
  );
};

export default TotalAvailable;

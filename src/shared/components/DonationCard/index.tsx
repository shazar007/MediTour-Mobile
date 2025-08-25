import {Image, View} from 'react-native';
import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigate} from '@services';

interface Props {
  item?: any;
}
const DonationCard = (props: Props) => {
  const {item} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <TouchableOpacity
      onPress={() => navigate('DonationDetails', {item: item})}
      style={{
        borderRadius: RF(16),
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 3,
        marginVertical: RF(4),
      }}>
      <Image
        source={
          item
            ? {
                uri:
                  item?.company?.logo ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }
            : item.image
        }
        style={{width: '100%', height: RF(150), resizeMode: 'contain'}}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: RF(16),
          borderBottomLeftRadius: RF(16),
          borderBottomRightRadius: RF(16),
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: RF(8),
          backgroundColor: 'rgba(245, 245, 245, 1)',
        }}>
        {/* <Image
          source={
            item
              ? {
                  uri:
                    item?.company?.logo ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }
              : item.logo
          }
          style={{width: RF(48), height: RF(48), borderRadius: RF(100)}}
        /> */}
        <View
          style={{
            flexDirection: 'column',
            marginLeft: RF(16),
          }}>
          <Text
            numberOfLines={1}
            size={16}
            color={colors.blueText}
            style={{width: RF(150)}}>
            {item ? item?.company?.name : item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: RF(8),
              alignItems: 'center',
              gap: RF(8),
            }}>
            <Image
              source={
                item
                  ? {
                      uri:
                        item?.donors[0]?.userId?.userImage ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                    }
                  : item.group
              }
              style={{width: RF(24), height: RF(24), borderRadius: RF(100)}}
            />
            <Text size={12} color={colors.blueText} SFregular>
              {item.userCount} People Donated
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DonationCard;

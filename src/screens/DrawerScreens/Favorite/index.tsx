import {RF} from '@theme';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, Pressable, ScrollView, View} from 'react-native';
import {
  Text,
  CheckBox,
  CustomModalize,
  EmptyList,
  CardComponent,
  CustomLoader,
  CustomHeader,
} from '@components';
import {CheckBoxData, fvt_All, rs} from '@services';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {filter} from '@assets';

const Favorite = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>([]);
  const modalizeRef: any = useRef<Modalize>(null);
  const [selected, setSelected] = useState('Doctors');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page state
  const [hasMoreData, setHasMoreData] = useState(true);

  const handelSelect = (item: any) => {
    setSelected(item.title);
    modalizeRef.current.close();
  };

  const openModalize = () => {
    modalizeRef.current.open();
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setData([]);
    getALL_Favourite(1);
  }, [selected]);

  const getALL_Favourite = (pageNumber: number) => {
    const params = {
      favType: selected?.toLowerCase(),
      page: pageNumber,
    };
    fvt_All(params)
      .then((res: any) => {
        if (res.data.favourites.length > 0) {
          setData((prevData: any) => [...prevData, ...res.data.favourites]);
        } else {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const loadMoreData = () => {
    if (!loading && hasMoreData) {
      const nextPage = page + 1;
      setPage(nextPage);
      getALL_Favourite(nextPage);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* <HeaderCard twoInRow numberOfIcons={'3'} userName={false}>
        <UserHeaderContent
          searhIconTrue1
          onPress={openModalize}
          ScreenTitle={'Favorites'}
        />
      </HeaderCard> */}

      <CustomHeader
        title={'Favorites'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.row}>
        <Text size={18} SFsemiBold>
          {selected}
        </Text>
        <Pressable
          onPress={openModalize}
          style={{
            borderWidth: 1,
            padding: rs(8),
            borderEndWidth: 1,
            borderRadius: 8,
            borderColor: colors?.primary,
            flexDirection: 'row',
            alignItems: 'center',
            gap: rs(8),
          }}>
          <Image
            source={filter}
            tintColor={'#fff'}
            style={[styles.smallIcon]}
          />
          <Text size={14} SFsemiBold>
            Filters
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopView}>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: rs(16)}}
            data={data}
            ListEmptyComponent={<EmptyList />}
            renderItem={({item}: any) => (
              <CardComponent
                Size={9}
                noRating
                showValues
                item={item}
                fvrt={'display'}
                name={
                  item?.item?.name
                    ? item?.item?.name
                    : item?.item?.packageName
                    ? item?.item?.packageName
                    : item?.item?.propertyName
                    ? item?.item?.propertyName
                    : item?.item?.donationTitle
                }
                style={styles.card}
                color={colors.blueText}
                title2={item?.item?.speciality?.join(' ')}
                title3={item?.item?.qualifications}
                logo={{
                  uri: item?.item?.images?.[0]
                    ? item?.item?.images?.[0]
                    : item?.item?.logo
                    ? item?.item?.logo
                    : item.item?.packageLogo
                    ? item.item?.packageLogo
                    : item.item?.propertyphoto?.[0]
                    ? item.item?.propertyphoto?.[0]
                    : item.item?.doctorImage ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
              />
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
      <CustomModalize ref={modalizeRef} height={400}>
        <View style={{paddingVertical: RF(24)}}>
          <Text size={18} SFmedium color={colors.blueText} style={styles.text}>
            Search by Categories
          </Text>
          <FlatList
            data={CheckBoxData}
            scrollEnabled={false}
            renderItem={({item}: any) => (
              <CheckBox
                active
                pV={10}
                pH={20}
                brWd={1}
                title={item?.title}
                selected={selected}
                onPress={handelSelect}
                selectColor={'#fff'}
                colorMid={'#fff'}
                c_b={'#FFF'}
                bgClr={colors.primary}
                // textColor={'#fff'}
                // textColor1={colors.primary}
              />
            )}
          />
        </View>
      </CustomModalize>
      {loading && <CustomLoader />}
    </View>
  );
};

export default Favorite;

import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';

import {getColorCode, RF} from '@theme';
import {
  deleteTre,
  getAllTreat,
  globalStyles,
  navigate,
  rs,
  rv,
  showToast,
} from '@services';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {del, edit2, editIcon} from '@assets';
import {Alert} from '@utils';

const AddTreatments = ({route}: any) => {
  const {colorCode, ALL_Treatments} = getColorCode();
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatment] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [simpleModal, setSimpleModal] = useState<any>(false);
  const [indicator, setIndicator] = useState<any>(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const styles = useStyles(colors);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchTreatment();
  //     return () => {};
  //   }, [page]),
  // );

  useEffect(() => {
    if (treatments?.length < 0) {
      fetchTreatment();
    }
    return;
  }, [page]);

  const fetchTreatment = () => {
    setLoading(refreshing ? false : true);
    let data = {page: page};
    getAllTreat(data, ALL_Treatments)
      .then((res: any) => {
        const fetchedTreatments = res?.data?.treatments || [];

        if (fetchedTreatments.length === 0) {
          setNextPage(false);
        } else {
          if (page === 1) {
            setTreatment(fetchedTreatments);
          } else {
            setTreatment((prev: any) => [...prev, ...fetchedTreatments]);
          }
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setIndicator(false);
      });
  };

  const handleLoadMore = () => {
    if (nextPage && !loading) {
      setPage(prevPage => prevPage + 1);
      setIndicator(true);
    }
  };

  const handleRefresh = () => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setPage(page);
    //   fetchTreatment();
    //   setRefreshing(false);
    // }, 100);
  };

  const deleteTreatments = () => {
    setLoading(true);
    let data = {treatmentId: selectedId};
    deleteTre(data)
      .then((res: any) => {
        setSimpleModal(false);
        setTreatment((prev: any) =>
          prev.filter((item: any) => item._id !== selectedId),
        );

        Alert.showSuccess(res?.data?.message);
      })
      .catch((err: any) => {
        Alert.showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModal = (id: any) => {
    setSimpleModal(true);
    setSelectedId(id);
  };

  const handleEdit = (item: any) => {
    navigate('AddUpdateTreatment', {item: item, type: 'edit'});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Treatments'} leftIcon titleColor={'#fff'} notify />

      <FlatList
        data={treatments}
        contentContainerStyle={{marginTop: RF(8), paddingBottom: RF(50)}}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          indicator && (
            <ActivityIndicator
              size={'small'}
              color={'#000'}
              // animating={indicator}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <EmptyList description={loading ? 'Loading.....' : 'No data found'} />
        }
        renderItem={({item}: any) => {
          console.log('🚀 ~ AddTreatments ~ item:');
          // const trueValuesKeys = Object?.entries(item?.treatment)
          //   .filter(([key, value]) => value === true)
          //   .map(([key]) => key);
          return (
            <View style={styles.cardContainer}>
              <Image
                style={{height: rv(100), width: '100%'}}
                source={{uri: item?.treatmentId?.image}}
              />
              <View style={styles.header}>
                <View style={styles.categoryInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.mainCategoryText} SFmedium>
                      {item?.treatmentId?.categoryId?.categoryName}
                    </Text>
                    <Text style={styles.locationType}>
                      {item?.isPersonal === true
                        ? ' (Clinic)'
                        : ` (${item?.hospitalId?.name})`}
                    </Text>
                  </View>
                  <Text style={styles.subCategoryText}>
                    {item?.treatmentId?.subCategory}
                  </Text>
                </View>
                {/* <View style={styles.actionIcons}>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Image source={editIcon} style={styles.iconStyle} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleModal(item?._id)}>
                    <Image source={del} style={styles.iconStyle2} />
                  </TouchableOpacity>
                </View> */}
              </View>

              <View style={styles.footer}>
                <Text style={styles.sectionTitle}>Total Cost</Text>
                <Text style={styles.totalCostText}>{item?.totalAmount}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: rv(12),
                    bottom: 0,
                    gap: rs(12),
                  }}>
                  <Pressable
                    onPress={() => handleEdit(item)}
                    style={{
                      borderWidth: 0.5,
                      elevation: 2,
                      backgroundColor: '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}>
                    <Text style={{letterSpacing: 1}}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleModal(item?._id)}
                    style={{
                      borderWidth: 0.5,
                      elevation: 2,
                      backgroundColor: '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}>
                    <Text style={{letterSpacing: 1}}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.touchView}
        onPress={() => navigate('AddUpdateTreatment')}>
        <Text size={12} SFmedium color={'#fff'}>
          Add Treatment
        </Text>
      </TouchableOpacity>

      {loading && <CustomLoader />}
      <Modal visible={simpleModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: RF(24),
          }}>
          <View
            style={{
              height: 179,
              width: '100%',
              justifyContent: 'center',
              backgroundColor: '#ffff',
              borderRadius: 12,
              padding: RF(20),
            }}>
            <Text center SFmedium color={colors?.primary}>
              Are you sure to delete
            </Text>
            <View style={{...globalStyles?.row, marginTop: RF(24)}}>
              <AppButton
                title="No"
                width={'45%'}
                onPress={() => setSimpleModal(false)}
                containerStyle={{backgroundColor: '#006838'}}
              />
              <AppButton
                title="Yes"
                width={'45%'}
                onPress={() => deleteTreatments()}
                containerStyle={{backgroundColor: colors?.orange}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
};

export default AddTreatments;

const useStyles = (colors: any) =>
  StyleSheet.create({
    touchView: {
      padding: RF(8),
      backgroundColor: '#0D47A1',
      position: 'absolute',
      borderRadius: RF(8),
      bottom: RF(80),
      right: RF(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxContainer: {
      width: '100%',
    },
    bgView: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Container2: {
      elevation: 5,
      // marginHorizontal: RF(24),
      backgroundColor: '#fff',
      width: '90%',
      padding: RF(12),
      borderRadius: RF(8),
    },
    categoryStyle: {
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderBottomLeftRadius: RF(8),
      borderBottomRightRadius: RF(8),
      overflow: 'hidden',
      top: -8,
    },
    positionStyle: {
      position: 'absolute',
      zIndex: 10,
      top: RF(40),
      width: '100%',
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderBottomLeftRadius: RF(8),
      borderBottomRightRadius: RF(8),
      overflow: 'hidden',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    checkboxText: {
      fontSize: 12,
      color: '#0D47A1',
      fontWeight: '400',
    },
    TouchableStyle: {
      width: '100%',
      padding: RF(4),
      zIndex: 10,
    },
    ContainerDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: '#fff',
      padding: RF(4),
      marginHorizontal: RF(10),
      borderRadius: RF(8),
      marginTop: RF(4),
      marginBottom: RF(8),
    },
    img: {
      height: RF(16),
      width: RF(16),
      marginRight: RF(20),
      resizeMode: 'contain',
    },
    AgeDropDownStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      // paddingBottom: RF(10),
      padding: RF(8),
      borderColor: '#00276D',
      width: '100%',
      marginBottom: RF(8),
    },
    dropDownImage: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    ImageStyles: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    input: {
      backgroundColor: '#FFF',
      width: '80%',
      paddingVertical: 1,
      marginLeft: 8,
      color: '#080C2F',
    },
    imgView: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    gapView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(16),
    },
    treatmentStyle: {
      marginHorizontal: RF(20),
      marginTop: RF(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mainView: {
      marginHorizontal: RF(20),
      marginVertical: RF(8),
      backgroundColor: '#fff',
      elevation: 5,
      padding: RF(8),
      borderRadius: RF(16),
      borderLeftWidth: RF(1),
    },
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: RF(12),
      paddingBottom: RF(16),
      overflow: 'hidden',
      marginHorizontal: RF(20),
      marginVertical: RF(8),
      // Adding shadow for depth
      shadowColor: '#000',
      shadowOffset: {width: 0, height: RF(2)},
      shadowOpacity: 0.1,
      shadowRadius: RF(4),
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      padding: rs(12),
      alignItems: 'center',
      justifyContent: 'space-between', // Ensures space between categoryInfo and actionIcons
    },
    categoryInfo: {
      flex: 1, // Allows categoryInfo to take up available space
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      flexWrap: 'wrap', // Wraps text if it's too long
    },
    mainCategoryText: {
      fontSize: RF(16),
      fontWeight: '600',
      color: colors.primary,
    },
    locationType: {
      fontSize: RF(14),
      color: colors.secondary,
    },
    subCategoryText: {
      fontSize: RF(14),
      color: colors.textSecondary,
      marginTop: RF(4),
    },
    actionIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      width: RF(24),
      height: RF(24),
      marginLeft: RF(12),
      resizeMode: 'contain',
      tintColor: colors?.primary,
    },

    iconStyle2: {
      width: RF(18),
      height: RF(18),
      marginLeft: RF(12),
      resizeMode: 'contain',
      tintColor: colors?.primary,
    },

    content: {
      marginTop: RF(16),
    },
    sectionTitle: {
      fontSize: RF(14),
      fontWeight: '500',
      color: colors.primary,
      marginBottom: RF(8),
    },
    includedText: {
      fontSize: RF(12),
      color: colors.text,
      lineHeight: RF(18),
    },
    footer: {
      marginTop: RF(16),
      paddingLeft: rs(12),
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      paddingTop: RF(12),
    },
    totalCostText: {
      fontSize: RF(16),
      fontWeight: '700',
      color: colors.primary,
    },
  });

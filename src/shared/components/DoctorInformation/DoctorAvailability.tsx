import React from 'react';
import Text from '../text';
import Line from '../Line';
import moment from 'moment';
import useStyles from './styles';
import {LAYOUT, RF} from '@theme';
import {clock2, Days} from '@assets';
import {useSelector} from 'react-redux';
import {globalStyles, margin} from '@services';
import {useTheme} from '@react-navigation/native';
import {View, Image, ScrollView} from 'react-native';

const DoctorAvailability = ({data, title, subTitle, source, freeOpd}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  //

  return (
    <>
      {title && (
        <View style={styles.AvilText}>
          <Text size={16} SFmedium color={colors.blueText}>
            {title}
          </Text>
        </View>
      )}
      {/* */}
      <View style={styles.CardAvailability}>
        <View style={styles.Direction}>
          <View style={{...globalStyles.rowSimple}}>
            <Image
              source={source}
              style={styles.image}
              tintColor={colors.blueText}
            />
            <Text
              size={14}
              numberOfLines={1}
              SFsemiBold
              color={colors.primary}
              style={{...margin.left_8, width: RF(150)}}>
              {subTitle || 'Availabilty'}
            </Text>
          </View>
          {freeOpd === 'Free OPD' ? null : (
            <Text size={14} SFbold color={changeColor}>
              Fee: {data?.price?.actualPrice || 0}/-
            </Text>
          )}
        </View>
        <Line colors={colors.primary} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {data?.availability?.map((item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={{
                    marginRight: 10,
                    marginLeft: 2,
                    marginVertical: 5,
                    padding: 8,
                    borderRadius: 8,
                    elevation: 1,
                    backgroundColor: '#fff',
                  }}>
                  <View
                    style={[
                      globalStyles.rowSimple,
                      margin.top_4,
                      margin?.bottom_8,
                    ]}>
                    <Image
                      source={Days}
                      style={{...styles.Image1, tintColor: colors.primary}}
                    />
                    <Text
                      size={10}
                      SFbold
                      color={colors.primary}
                      style={{marginLeft: LAYOUT.MARGIN.LOW}}>
                      {moment().day(item?.dayOfWeek).format('dddd')}
                    </Text>
                  </View>
                  {item?.morning?.startTime || item?.morning?.endTime ? (
                    <View style={[globalStyles.rowSimple, margin?.bottom_4]}>
                      {item?.morning?.startTime || item?.morning?.endTime ? (
                        <Image source={clock2} style={styles.Image1} />
                      ) : null}
                      <View>
                        <Text
                          size={10}
                          color={colors.primary}
                          style={{marginLeft: LAYOUT.MARGIN.LOW}}>
                          {item?.morning?.startTime &&
                            moment(item?.morning?.startTime, 'HH:mm').format(
                              'hh:mm A',
                            )}
                          {'  '}
                          {item?.morning?.endTime &&
                            moment(item?.morning?.endTime, 'HH:mm').format(
                              'hh:mm A',
                            )}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {item?.evening?.endTime || item?.evening?.startTime ? (
                    <View style={[globalStyles.rowSimple]}>
                      {item?.evening?.endTime || item?.evening?.startTime ? (
                        <Image source={clock2} style={styles.Image1} />
                      ) : null}
                      <View>
                        <Text
                          size={10}
                          color={colors.primary}
                          style={{marginLeft: LAYOUT.MARGIN.LOW}}>
                          {item?.evening?.startTime &&
                            moment(item?.evening?.startTime, 'HH:mm').format(
                              'hh:mm A',
                            )}{' '}
                          {'  '}
                          {item?.evening?.endTime &&
                            moment(item?.evening?.endTime, 'HH:mm').format(
                              'hh:mm A',
                            )}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DoctorAvailability;

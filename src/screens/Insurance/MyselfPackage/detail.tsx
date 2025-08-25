import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import React, {useState} from 'react';
import {documents1} from '@assets';
import {RouteProp, useTheme} from '@react-navigation/native';
import {FlatList, Image, Modal, ScrollView, View} from 'react-native';
import {
  INSURANCE_FAMILY_Delete,
  INSURANCE_FAMILY_TRAVELER_DELETE,
  INSURANCE_INDIVIDUAL_DELETE,
  INSURANCE_SINGLE_Delete,
  navigationRef,
} from '@services';
import {TouchableOpacity} from 'react-native';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Package_Detail = (props: Props) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [showLoading, setShowLoading] = useState(false);
  const styles = useStyles(colors);
  const [isModalVisible, setModalVisible] = useState(false);
  const onDel = () => {
    setShowLoading(true);

    let deletePromise;

    if (pckg === 'Health Myself') {
      deletePromise = INSURANCE_SINGLE_Delete(item?._id);
    } else if (pckg === 'Health Family') {
      deletePromise = INSURANCE_FAMILY_Delete(item?._id);
    } else if (
      pckg === 'Travel Single Trip Individual' ||
      pckg === 'Travel Multi - Trip Individual'
    ) {
      deletePromise = INSURANCE_INDIVIDUAL_DELETE(item?._id);
    } else {
      deletePromise = INSURANCE_FAMILY_TRAVELER_DELETE(item?._id);
    }
    deletePromise
      .then((res: any) => {
        navigationRef?.current?.goBack();
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => setShowLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={item?.packageName}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: RF(20),
            marginBottom: 100,
          }}>
          {pckg === 'Health Family' ||
          pckg === 'Health Myself' ||
          pckg === 'Health Parents' ? (
            <SpecificField
              styles={styles}
              source={{uri: item?.packageLogo}}
              colors={colors}
              label={'Age criteria'}
              value={`${item?.ageCriteria?.startAge} years - ${item?.ageCriteria?.endAge} years`}
              label1={'Select Hospitalization Limit (PKR)'}
              value1={`${item?.hospitalizationLimit?.startLimit} - ${item?.hospitalizationLimit?.endLimit}`}
              label2={'Gender'}
              value2={item?.gender}
              item={item}
              label3={'Hospitalization Per person'}
              value3={item?.hospitalizationPerPerson}
              label4={'Daily Room & Board Limit'}
              value4={item?.dailyRoomAndBoardLimit}
              label5={'Claim Payout Ratio'}
              value5={item?.claimPayoutRatio}
              label6={'Package Description'}
              value6={item?.packageDescription}
              pckg={pckg}
              benifits={'Medical Benifits'}
              label7={'ICU / CCU'}
              value7={item?.icuCcuLimits}
              label8={'Additional Limites for Accidental Emergency'}
              value8={item?.accidentalEmergencyLimits}
              label9={'Ambulance Service Coverage'}
              value9={item?.ambulanceCoverage}
              label10={'Coverage of Specialized Investigations'}
              value10={item?.specializedInvestigationCoverage}
            />
          ) : (
            <SpecificField
              styles={styles}
              source={{uri: item?.packageLogo}}
              colors={colors}
              label={'Medical Covering'}
              value={item?.medicalCover}
              label1={'Covering upto'}
              value1={item?.coveringUpto}
              // label2={'Gender'}
              // value2={item?.gender}
              item={item}
              label3={'Package Category'}
              value3={item?.packageCategory}
              label4={'Package Description'}
              value4={item?.packageDescription}
              label5={'Traveling'}
              value5={item?.countrySelection}
              label6={'Repatriation in Case of Illness / Injury'}
              value6={item?.repatriationIllnessInjuryCoverage}
              pckg={pckg}
              benifits={'Medical Benifits'}
              label7={'Delivery of Medicine'}
              value7={item?.medicineDeliveryCoverage}
              label8={'Repatriation of mortal remains'}
              value8={item?.repatriationCoverage}
              label9={'Return of Dependant Children'}
              value9={item?.returnOfDependentChildrenCoverage}
              label10={'Emergency Return Home'}
              value10={item?.emergencyReturnHomeCoverage}
            />
          )}

          {item?.waitingPeriod && (
            <TextSection
              colors={colors}
              label={'Waiting Period'}
              value={item?.waitingPeriod}
            />
          )}
          {item?.maternity && (
            <TextSection
              colors={colors}
              label={'Maternity'}
              value={item?.maternity}
            />
          )}

          {item?.policyDocument && (
            <>
              <Text size={16} SFbold color={colors?.bluE}>
                Policy document
              </Text>
              <SectionImg colors={colors} value={item?.policyDocument} />
            </>
          )}
          {item?.claimProcess && (
            <>
              <Text size={16} SFbold color={colors?.bluE}>
                Claim Process
              </Text>
              <SectionImg colors={colors} value={item?.claimProcess} />
            </>
          )}
          {item?.heading && (
            <>
              <Text size={16} SFbold color={colors?.bluE}>
                More Features
              </Text>
              <TextSection
                colors={colors}
                label={'Heading'}
                value={item?.heading}
              />
            </>
          )}

          <TextSection
            colors={colors}
            label={'More Description'}
            value={item?.description}
          />
          <Text size={16} SFbold color={colors?.bluE}>
            Price
          </Text>

          <TextSection
            colors={colors}
            label={'Actual Price'}
            value={item?.actualPrice}
          />
          <TextSection
            colors={colors}
            label={'Duration'}
            value={item?.perYear}
          />
          <AppButton
            size={14}
            onPress={() => setModalVisible(true)}
            width={RF(100)}
            height={RF(30)}
            textcolor={'white'}
            bgClr={'red'}
            title="Delete"
          />
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              You want to delete this "Insurance"
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>No. Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onDel}>
                <Text style={styles.deleteButtonText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showLoading && <CustomLoader />}
      </Modal>
    </Wrapper>
  );
};

const SectionImg = ({
  src,
  colors,
  value,
}: {
  src?: any;
  colors?: any;
  value?: any;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: RF(10),
      }}>
      <Image
        source={documents1}
        style={{width: '100%', height: RF(100), resizeMode: 'contain'}}
      />
      <Text color={colors?.bluE} size={14} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const Section = ({data, colors}: {data?: any; colors?: any}) => {
  return (
    <>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({item}: any) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </>
  );
};

const TextSection = ({
  label,
  value,
  colors,
}: {
  label?: any;
  value?: any;
  colors?: any;
}) => {
  return (
    <>
      <Text color={colors?.fadeGray} size={14}>
        {label}
      </Text>
      <Text color={colors?.bluE} size={14}>
        {value}
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'grey',
          marginVertical: RF(10),
        }}
      />
    </>
  );
};
const SpecificField = ({
  source,
  styles,
  label,
  value,
  colors,
  label1,
  value1,
  label2,
  value2,
  label3,
  value3,
  item,
  label4,
  value5,
  label5,
  value4,
  value6,
  label6,
  label7,
  value7,
  label8,
  value8,
  label9,
  label10,
  value10,
  value9,
  pckg,
  benifits,
}: {
  source?: any;
  styles?: any;
  value?: any;
  label?: any;
  colors?: any;
  label1?: any;
  value1?: any;
  value2?: any;
  label2?: any;
  label3?: any;
  value3?: any;
  item?: any;
  label4?: any;
  value4?: any;
  label5?: any;
  value5?: any;
  value6?: any;
  label6?: any;
  label7?: any;
  value7?: any;
  label8?: any;
  value8?: any;
  label9?: any;
  label10?: any;
  value10?: any;
  value9?: any;
  benifits?: any;
  pckg?: any;
}) => {
  return (
    <>
      <Image source={source} style={styles._img} />
      <TextSection label={label} value={value} colors={colors} />
      <TextSection label={label1} value={value1} colors={colors} />
      {item?.gender && (
        <TextSection label={label2} value={value2} colors={colors} />
      )}
      <TextSection label={label3} value={value3} colors={colors} />
      <TextSection label={label4} value={value4} colors={colors} />
      <TextSection label={label5} value={value5} colors={colors} />
      <TextSection label={label6} value={value6} colors={colors} />
      {(pckg === 'Health Family' ||
        pckg === 'Health Myself' ||
        pckg === 'Health Parents') && (
        <>
          <Text size={16} SFbold color={colors?.bluE}>
            Hospital
          </Text>
          {item?.hospitals.map((user: any) => (
            <View
              style={{
                borderWidth: 1,
                padding: RF(10),
                borderRadius: RF(16),
                marginVertical: RF(8),
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(8),
                borderStyle: 'dashed',
              }}>
              <View
                style={{
                  width: RF(48),
                  height: RF(48),
                  borderRadius: RF(32),
                  elevation: 5,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri:
                      user?.logo ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
              </View>
              <Text size={14} SFmedium>
                {user?.name}
              </Text>
            </View>
          ))}
          {/* <Section data={item?.hospitals} colors={colors} />
           */}
        </>
      )}

      {(pckg === 'Health Family' ||
        pckg === 'Health Myself' ||
        pckg === 'Health Parents') && (
        <>
          <Text size={16} SFbold color={colors?.bluE}>
            Laboratory
          </Text>
          {item?.laboratories.map((user: any) => (
            <View
              style={{
                borderWidth: 1,
                padding: RF(10),
                borderRadius: RF(16),
                marginVertical: RF(8),
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(8),
                borderStyle: 'dashed',
              }}>
              <View
                style={{
                  width: RF(48),
                  height: RF(48),
                  borderRadius: RF(32),
                  elevation: 5,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri:
                      user?.logo ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <Text size={14} SFmedium>
                {user?.name}
              </Text>
            </View>
          ))}
        </>
      )}
      <Text size={16} SFbold color={colors?.bluE}>
        {benifits}
      </Text>
      <TextSection label={label7} value={value7} colors={colors} />
      <TextSection label={label8} value={value8} colors={colors} />
      <TextSection label={label9} value={value9} colors={colors} />
      <TextSection label={label10} value={value10} colors={colors} />
    </>
  );
};
export default Package_Detail;

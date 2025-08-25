import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  ImageURISource,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useTheme} from 'react-native-elements';
import {RF} from '@theme';
import Text from '../text';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import {LabDownload} from '@assets';
import moment from 'moment';

const FormatPDF = ({
  item,
  prescription,
  testData,
  data,
}: {
  item?: any;
  prescription?: any;
  testData?: any;
  data?: any;
}) => {
  //
  //
  const theme: any = useTheme();
  const colors = theme?.colors;
  const [logoBase64, setLogoBase64] = useState('');

  useEffect(() => {
    requestWritePermission();
    convertLogoToBase64();
  }, []);

  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return 'Date of birth not provided';
    const [day, month, year] = dateOfBirthString.split('/').map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  const myLogo: ImageURISource = require('../../../assets/mediLogo.png');

  const requestWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Write External Storage Permission',
            message: 'App needs access to your storage to download the PDF',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS doesn't need explicit permission
    }
  };

  const convertLogoToBase64 = async () => {
    try {
      const imageUri = Image.resolveAssetSource(myLogo).uri;
      const base64Image = await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', imageUri)
        .then(res => res.readFile('base64'));
      setLogoBase64(`data:image/png;base64,${base64Image}`);
    } catch (error: any) {}
  };

  const createPDF = async () => {
    try {
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const fileName = `prescription_${timestamp}.pdf`;

      let PDFOptions = {
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>
            p {
              margin: 0;
              padding: 5px;
              line-height: 1;
            }
              .container {
                padding: 24px;
              }
              .row {
                display: flex;
                justify-content: space-between;
              }
              .bold {
                font-weight: bold;
              }
              .semibold {
                font-weight: 600;
              }
              .regular {
                font-weight: 400
              }
              .border-bottom {
                border-bottom: 1px solid #000;
              }
              .border-top {
                border-top: 1px solid #000;
              }
              .logo {
                width: 100px; /* Adjust size as needed */
                height: auto;
              }
              .text-center {
                text-align: center;
              }
              .text-left {
                text-align: left;
              }
              .no-margin {
                margin: 0;
              }
              .no-padding {
                padding: 0;
              }
              .footer-text {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                text-align: center;
                color: #000;
                font-size: 18px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="row border-bottom" style="padding-bottom : 30px; ">
                <div>
                  <p class="bold no-margin" style="font-size: 26px; color: #000;">${
                    item?.doctorId?.name
                  }</p>
                  <p class="no-margin" style="color: #000; font-size: 18px;">${
                    item?.doctorId?.qualifications
                  }</p>
                  <p  class="no-margin" style="color: #000; font-size: 18px;">PM&DC Reg:${
                    item?.doctorId?.pmdcNumber
                  }</p>
                </div>
                <img src="${logoBase64}" class="logo" alt="Logo">
              </div>
  
            <div class="row">
                 <p style="color: #000; font-size: 20px; margin-top:16px" class="semibold">
                Patient Name: <span style="font-size: 18px;; color: #000;" class="regular">${
                  item?.patientId?.name
                }</span>
                </p>
                <p style="color: #000; font-size: 20px; margin-top:16px" class="semibold">
                M.R No: <span style="font-size: 18px;; color: #000;" class="regular">${
                  item?.patientId?.mrNo
                }</span>
                </p>
            </div>
            <div class="row" style="align-item:center">
                 <p style="color: #000; font-size: 20px; " class="semibold">
            Date: <span style="font-size: 18px;; color: #000;" class="regular">${moment(
              item?.appointmentDateAndTime,
            ).format('MM/DD/YYYY')}</span>
             </p>
            <p style="color: #000; font-size: 20px;" class="semibold">
            Age: <span style="font-size: 18px;; color: #000;" class="regular">${`${calculateAge(
              item?.patientId?.dateOfBirth,
            )} years old`}</span>
              </p>
              </div>
  
              <div class="row">
             <p style="color: #000; font-size: 20px;" class="semibold">
             Cell: <span style="font-size: 18px;; color: #000;" class="regular">${
               item?.patientId?.phone
             }</span>
             </p>
  
  </div>
  <p style="color: #000; font-size: 20px;" class="semibold">
  Address: <span style="font-size: 18px;; color: #000; margin-right:34px" class="regular">${`${item?.patientId?.address?.address}-${item?.patientId?.address?.city}`}</span>
  </p>
              <p style="font-size: 18px; color: #000;">
                Weight (Kg): ${`${data?.weight}, BP:${data?.bloodPressure?.systolicPressure}/${data?.bloodPressure?.diastolicPressure} mmHg`}
              </p>
          
              <!-- Chief Complaints and Clinical Findings -->
              <div class="row border-top border-bottom" style="margin-top: 16px;">
                <p class="bold" style="font-size: 22px; color: #1A3D7C;">Symptoms</p>
                <p class="bold" style="width: 45%; font-size: 22px; color: #1A3D7C;">Clinical Findings</p>
              </div>
            
              <div class="row">
                <p style="font-size: 18px; color: #000; width: 45%;">
                ${data?.symptoms}
                </p>
                <p style="font-size: 18px; color: #000; width: 45%;" class="text-left">
                ${data?.description}
                </p>
              </div>
           
                
          
              <!-- Laboratory Test -->
              
              <div class="border-bottom border-top" style="padding: 16px 0">
                <p style="color: #1A3D7C; font-size: 22px;" class="semibold">Laboratory Test</p>
                ${testData
                  .map(
                    (data: any, index: any) => `
                <p style="color: #000; font-size: 18px;">* ${data?.testName}</p>
              `,
                  )
                  .join('')}
              </div>
          
            
          
              <!-- Medicine Details -->
              <div class="row border-bottom" style="align-items:center;">
                <p class="bold" style="width: 34%; color: #1A3D7C; font-size: 22px;">Medicine Name</p>
                <p class="bold" style="width: 33%; text-align: center; padding: 0 10px; color: #1A3D7C; font-size: 22px;" class="text-center">Dosage</p>
                <p class="bold" style="width: 33%; text-align: center; padding: 0 10px; color: #1A3D7C; font-size: 22px;" class="text-center">Duration</p>
              </div>
              ${prescription
                ?.map(
                  (data: any, index: any) => ` 
                <div class="row border-bottom" style="align-items:center; margin-top:10px; font-size: 18px;">
                <p style="width: 34%; color: #000; font-size: 18px;"> ${
                  index + 1
                }) ${data.medicineName}</p>
                <p style="width: 33%; text-align: center; padding: 0 10px; color: #000; font-size: 18px;">
                  ${data.dosage}
                </p>
                <p style="width: 33%; text-align: center; padding: 0 10px; color: #000; font-size: 18px;">
                  ${data?.days}
                </p>
              </div>`,
                )
                .join('')}
             
          
            
  
              <!-- Additional Text at the Bottom -->
              <p class="footer-text">
              For any guidance please contact helpline 111 111 MTG
      </p>
            </div>
          </body>
          </html>
          `,
        fileName: fileName,
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;

      const newFilePath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;

      RNFetchBlob.fs
        .mv(file.filePath, newFilePath)
        .then(() => {
          RNFetchBlob.android.addCompleteDownload({
            title: 'PDF Downloaded',
            description: `PDF downloaded successfully as ${fileName}`,
            mime: 'application/pdf',
            path: newFilePath,
            showNotification: true,
          });

          ToastAndroid.showWithGravity(
            `PDF downloaded successfully as ${fileName}!`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        })
        .catch(error => {
          ToastAndroid.showWithGravity(
            'Failed to download PDF',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        });
    } catch (error: any) {
      ToastAndroid.showWithGravity(
        'Failed to generate PDF',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <ScrollView>
      <View style={{padding: RF(24), paddingBottom: RF(80), marginTop: RF(16)}}>
        <View
          style={{...styles.row, paddingBottom: RF(30), borderBottomWidth: 1}}>
          <View style={{width: '70%'}}>
            <Text color={'#000'} SFbold size={16}>
              {item?.doctorId?.name}
            </Text>
            <Text color={'#000'}>{item?.doctorId?.qualifications}</Text>
            <Text color={'#000'} SFsemiBold>
              PM&DC Reg:{' '}
              <Text color={'#000'}>{item?.doctorId?.pmdcNumber}</Text>
            </Text>
          </View>
          <Image source={myLogo} style={styles?.logo} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text SFsemiBold size={11} color={'#000'}>
            Patient Name:{' '}
            <Text size={9} color={'#000'}>
              {item?.patientId?.name}
            </Text>
          </Text>
          <Text size={11} color={'#000'} SFsemiBold>
            MR No:{' '}
            <Text size={9} color={'#000'}>
              {item?.patientId?.mrNo}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text size={11} color={'#000'} SFsemiBold>
            Date:{' '}
            <Text size={9} color={'#000'}>
              {moment(item?.appointmentDateAndTime).format('MM/DD/YYYY')}
            </Text>
          </Text>
          <Text size={12} color={'#000'} SFsemiBold>
            Age:{' '}
            <Text size={9} color={'#000'}>
              {`${calculateAge(item?.patientId?.dateOfBirth)} years old`}
            </Text>
          </Text>
        </View>
        {/* Chief Complaints And Clinical Findings................. */}
        <Text size={11} color={'#000'} SFsemiBold>
          Cell:{' '}
          <Text size={9} color={'#000'}>
            {item?.patientId?.phone}
          </Text>
        </Text>
        <Text size={11} color={'#000'} SFsemiBold>
          Address:{' '}
          <Text size={9} color={'#000'}>
            {`${item?.patientId?.address?.address}-${item?.patientId?.address?.city}`}
          </Text>
        </Text>
        <Text size={11} color={'#000'} SFregular>
          Weight (Kg):{' '}
          <Text size={9} color={'#000'}>
            {`${data?.weight},`}
            {'  '}
            <Text size={11} color={'#000'} SFregular>
              BP:
              <Text
                size={9}
                color={
                  '#000'
                }>{`${data?.bloodPressure?.systolicPressure}/${data?.bloodPressure?.diastolicPressure} mmHg`}</Text>
            </Text>
          </Text>
        </Text>
        <View
          style={{
            ...styles?.row,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginTop: RF(16),
          }}>
          <Text SFbold>Symptoms</Text>
          <Text SFbold style={{width: '45%'}}>
            Clinical Findings
          </Text>
        </View>
        <View
          style={{...styles?.row, borderBottomWidth: 1, paddingBottom: RF(4)}}>
          <Text size={10} color={'#000'} style={{width: '45%'}}>
            {data?.symptoms}
          </Text>
          <Text
            size={10}
            color={'#000'}
            numberOfLines={3}
            style={{width: '45%'}}
            center>
            {data?.description}
          </Text>
        </View>
        {/* ...............Laboratory Test............. */}

        <View style={{borderBottomWidth: 1, paddingBottom: RF(16)}}>
          <Text color={'#000'} SFsemiBold>
            Laboratory Test
          </Text>
          {testData?.map((user: any, index: any) => (
            <Text key={index} color={'#000'}>
              * {user?.testName}
            </Text>
          ))}
        </View>

        <View
          style={{
            ...styles?.row,
            borderBottomWidth: 1,
          }}>
          <Text SFbold style={{width: '33%'}}>
            Medicine Name
          </Text>
          <Text SFbold style={{width: '33%', textAlign: 'center'}}>
            Dosage
          </Text>
          <Text SFbold style={{width: '33%', textAlign: 'center'}}>
            Duration
          </Text>
        </View>

        {prescription?.map((user: any, index: any) => (
          <View
            key={index}
            style={{
              ...styles?.row,
              alignItems: 'flex-start',
              borderBottomWidth: 1,
            }}>
            <Text style={{width: '34%'}} color={'#000'}>
              {`${index + 1}) ${user?.medicineName}`}
            </Text>
            <Text
              style={{
                width: '33%',
                textAlign: 'center',
                paddingHorizontal: 10,
              }}
              color={'#000'}>
              {user?.dosage}
            </Text>
            <Text
              style={{
                width: '33%',
                textAlign: 'center',
                paddingHorizontal: 10,
              }}
              color={'#000'}>
              {user?.days}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: RF(8),
            marginTop: RF(16),
            marginHorizontal: RF(20),
            padding: RF(8),
            justifyContent: 'center',
            borderRadius: 8,
            width: RF(110),
            height: RF(35),
            backgroundColor: '#0D47A1',
            alignSelf: 'flex-end',
          }}
          onPress={createPDF}>
          <Text size={12} SFmedium color={'#fff'}>
            Download
          </Text>
          <Image
            source={LabDownload}
            style={{
              width: RF(16),
              height: RF(16),
              resizeMode: 'contain',
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: RF(80),
    width: RF(80),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RF(16),
  },
});

export default FormatPDF;

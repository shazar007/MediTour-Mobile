import {Image, ScrollView, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  HeaderCard,
  UserHeaderContent,
  AppTextInput,
  CustomLoader,
  Text,
  Footer,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import ImagePicker from 'react-native-image-crop-picker';
import {
  UploadIconFirst,
  del,
  edit2,
  logicFlight,
  pasport,
  userBlue,
} from '@assets';
import {add_File, navigate, rs, showToast} from '@services';
import useStyles from './styles';
import DetailsTraveler from './DetailsTraveler';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import {useTheme} from '@react-navigation/native';
import {Alert} from '@utils';
const TravelerIdentity = ({route}: any) => {
  const {totalTravelers, item} = route.params;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [travelers, setTravelers] = useState<any>([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const formik: any = useFormik({
    initialValues: {
      name: '',
      passportNo: '',
      visaFile: null,
      passportFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      passportNo: Yup.string().required('Passport number is required'),
      visaFile: Yup.object().nullable().required('Visa upload is required'),
      passportFile: Yup.object()
        .nullable()
        .required('Passport upload is required'),
    }),
    onSubmit: values => {
      if (editIndex !== null) {
        const updatedTravelers: any = travelers.map(
          (traveler: any, index: any) =>
            index === editIndex ? values : traveler,
        );
        setTravelers(updatedTravelers);
        setEditIndex(null);
      } else {
        setTravelers([...travelers, values]);
      }
      setShowForm(false);
      formik.resetForm();
    },
  });

  const onUploadImage = (field: any) => {
    setLoading(true);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const formData = new FormData();
        let name = image.path.split('/').pop();
        formData.append('file', {
          uri: image.path,
          type: image.mime,
          name: name,
        });
        add_File(formData)
          .then(response => {
            formik.setFieldValue(field, {
              uri: response.data.fileUrl,
              name: name,
            });
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const deleteFile = (field: any) => {
    formik.setFieldValue(field, null);
  };

  const handleAddTraveler = () => {
    if (travelers.length < totalTravelers) {
      setShowForm(true);
    } else {
      Alert.showError('Cannot add more travelers');
    }
  };

  const handleContinue = () => {
    if (travelers.length === totalTravelers) {
      navigate('TravelerInfo', {
        travelers,
        totalTravelers,
        item,
      });
    } else {
      Alert.showError('Please select the number of Travelers');
    }
  };

  const toggleExpanded = (index: any) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleEditTraveler = (index: any) => {
    const traveler = travelers[index];
    formik.setValues(traveler);
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDeleteTraveler = (index: any) => {
    const updatedTravelers = travelers.filter((_: any, i: any) => i !== index);
    setTravelers(updatedTravelers);
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Traveler Identity'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView contentContainerStyle={{paddingBottom: RF(150)}}>
        {showForm && (
          <View style={styles.travelerContainer}>
            <AppTextInput
              placeholder={'Name'}
              value={formik.values.name}
              startIcon={userBlue}
              onChangeText={value => formik.setFieldValue('name', value)}
            />
            {formik.touched.name && formik.errors.name ? (
              <Text style={styles.errorText}>{formik.errors.name}</Text>
            ) : null}
            <AppTextInput
              placeholder={'Passport Number'}
              value={formik.values.passportNo}
              onChangeText={value => formik.setFieldValue('passportNo', value)}
              startIcon={pasport}
            />
            {formik.touched.passportNo && formik.errors.passportNo ? (
              <Text style={styles.errorText}>{formik.errors.passportNo}</Text>
            ) : null}
            <TravelerImage
              upLoadName={'Visa Upload'}
              styles={styles}
              onImage={() => onUploadImage('visaFile')}
              url={formik.values.visaFile}
              FileName={formik.values.visaFile?.name}
              onDel={() => deleteFile('visaFile')}
              SelectionName={'Choose file to upload'}
              SizeName={'Select JPEG, Png, or Pdf up to 20MB.'}
              dis={
                'To continue, please upload an image of the passenger visas.'
              }
            />
            {formik.touched.visaFile && formik.errors.visaFile ? (
              <Text style={styles.errorText}>{formik.errors.visaFile}</Text>
            ) : null}
            <TravelerImage
              upLoadName={'Passport Upload'}
              styles={styles}
              onImage={() => onUploadImage('passportFile')}
              url={formik.values.passportFile}
              FileName={formik.values.passportFile?.name}
              onDel={() => deleteFile('passportFile')}
              SelectionName={'Choose file to upload'}
              SizeName={'Select JPEG, Png, or Pdf up to 20MB.'}
              dis={
                'To continue, please upload an image of the passenger passport.'
              }
            />
            {formik.touched.passportFile && formik.errors.passportFile ? (
              <Text style={styles.errorText}>{formik.errors.passportFile}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={formik.handleSubmit}>
              <Text size={12} SFlight color={'#fff'}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showForm &&
          travelers.length > 0 &&
          travelers.map((traveler: any, index: any) => (
            <View key={index} style={[styles.container]}>
              <TouchableOpacity
                onPress={() => toggleExpanded(index)}
                style={styles.header}>
                <Text size={14} SFregular color={'#0E54A3'}>
                  {`Person ${index + 1}`}
                </Text>
                <View style={styles.rowStyle}>
                  <TouchableOpacity onPress={() => handleEditTraveler(index)}>
                    <Image source={edit2} style={styles.edit} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteTraveler(index)}>
                    <Image source={del} style={styles.del} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={expandedIndex !== index} align="center">
                <Animatable.View
                  animation={expandedIndex === index ? 'fadeInDown' : undefined}
                  duration={300}
                  style={styles.content}>
                  <DetailsTraveler traveler={traveler} />
                </Animatable.View>
              </Collapsible>
            </View>
          ))}
        {!showForm && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: rs(16),
            }}>
            <View style={{width: '100%', height: RF(150)}}>
              <Image
                source={logicFlight}
                style={{width: '100%', height: RF(150), resizeMode: 'contain'}}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTraveler}>
              <Text style={styles.addButtonText}>Add Traveler</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Footer
        styles={styles}
        travelers={travelers}
        totalTravelers={totalTravelers}
        item={item}
        handleContinue={handleContinue}
      />
      {loading && <CustomLoader />}
    </View>
  );
};

const TravelerImage = ({
  onImage,
  upLoadName,
  dis,
  FileName,
  onDel,
  url,
  SelectionName,
  SizeName,
  styles,
}: {
  onImage?: any;
  upLoadName?: any;
  dis?: any;
  FileName?: any;
  onDel?: any;
  url?: any;
  SelectionName?: any;
  SizeName?: any;
  styles?: any;
}) => {
  return (
    <View style={{marginTop: RF(16), gap: RF(4)}}>
      <Text size={16} SFmedium color={'#00276D'}>
        {upLoadName}
      </Text>
      <Text size={12} SFregular color={'#7D7D7D'}>
        {dis}
      </Text>
      <TouchableOpacity style={styles.uploadButton} onPress={onImage}>
        {url ? (
          <View style={styles.uploadedFile}>
            <Image source={UploadIconFirst} style={styles.ImageView1} />
            <Text
              size={12}
              SFregular
              color={'#00276D'}
              style={{width: RF(200)}}>
              {FileName}
            </Text>
            <TouchableOpacity onPress={onDel}>
              <Image source={del} style={styles.ImageView1} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image source={UploadIconFirst} style={styles.ImageView1} />
            <Text size={12} SFregular color={'#00276D'}>
              {SelectionName}
            </Text>
            <Text size={9} SFregular color={'#00276D'}>
              {SizeName}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TravelerIdentity;

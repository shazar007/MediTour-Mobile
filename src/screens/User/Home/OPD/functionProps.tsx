import {getAll_Hospitals, opdDoctors} from '@services';

/......................................All Doctor........................./;

export const getAll_OPD_Doc = async (docParams: any) => {
  docParams && docParams?.other_DoctorParams.setLoading(true);
  try {
    const res = await opdDoctors(docParams.allDoctor);
    docParams && docParams?.other_DoctorParams.setData(res?.data);
  } catch (err) {
  } finally {
    docParams && docParams?.other_DoctorParams.setLoading(false);
    docParams && docParams?.other_DoctorParams.setRefreshing(false);
  }
};

/......................................All Hospital........................./;

export const getAll_Hospital = (hospitalParams: any) => {
  getAll_Hospitals(hospitalParams.allHospital)
    .then((res: any) => {
      hospitalParams &&
        hospitalParams?.other_HospitalParams?.setHospitalData(
          res?.data?.hospitals,
        );
      hospitalParams && hospitalParams?.other_HospitalParams?.setDistance('');
    })
    .catch((err: any) => {})
    .finally(() => {
      hospitalParams && hospitalParams?.other_HospitalParams?.setLoading(false);
      hospitalParams &&
        hospitalParams?.other_HospitalParams?.setRefreshing(false);
    });
};

/......................................PROPS........................./;

export const headerCard_props = (toggle: any, user: any, setToggle: any) => ({
  plusIcon: true,
  twoInRow: true,
  toggle: toggle,
  numberOfIcons: '3',
  title: 'Hi ' + user?.name,
  setToggle: setToggle,
});

export const headerContent_Props = (
  toggle?: any,
  response?: any,
  toggleSearch?: any,
  onChangeText?: any,
  handleItemPress?: any,
  onSubmitEditing?: any,
) => ({
  drop: true,
  searhIconTrue: true,
  onlySearchIcon: true,
  toggle: toggle,
  selected: response,
  ScreenTitle: response,
  onPress: toggleSearch,
  onChangeText: onChangeText,
  handleDropDown: handleItemPress,
  onSubmitEditing: onSubmitEditing,
});

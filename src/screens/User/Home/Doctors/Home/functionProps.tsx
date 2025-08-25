import {
  getAll_Doctors,
  getAll_Hospitals,
  getFilter_Doctor,
  getFilter_Hospital,
  getSpecialtiesDoctor,
} from '@services';

/......................................All Doctor........................./;

export const getAll_Doc = async (docParams: any) => {
  let otherparams = docParams && docParams?.other_DoctorParams;

  // otherparams.setLoading(true);
  try {
    const res = await getAll_Doctors(docParams.allDoctor);
    //

    if (res?.data?.nextPage) {
      otherparams?.setNextPage(res?.data?.nextPage);
    }
    if (docParams.allDoctor?.page > 1) {
      let newArr = otherparams?.data.concat(res?.data?.doctors);
      otherparams?.setData(newArr);
    } else {
      otherparams.setData(res?.data?.doctors);
    }
  } catch (err: any) {
  } finally {
    otherparams.setLoading(false);
    otherparams.setRefreshing(false);
    otherparams.setIndicator(false);
  }
};

/......................................All Hospital........................./;

export const getAll_Hospital = (hospitalParams: any) => {
  getAll_Hospitals(hospitalParams.allHospital)
    .then((res: any) => {
      hospitalParams?.other_HospitalParams?.setNextPage(res?.data?.nextPage);

      if (hospitalParams.other_HospitalParams?.page > 1) {
        let newArr = hospitalParams?.other_HospitalParams?.hospitalData.concat(
          res?.data?.hospitals,
        );
        hospitalParams &&
          hospitalParams?.other_HospitalParams?.setHospitalData(newArr);
      } else {
        hospitalParams?.other_HospitalParams?.setHospitalData(
          res?.data?.hospitals,
        );
      }
    })
    .catch((err: any) => {})
    .finally(() => {
      hospitalParams && hospitalParams?.other_HospitalParams?.setLoading(false);
      hospitalParams &&
        hospitalParams?.other_HospitalParams?.setRefreshing(false);
      hospitalParams &&
        hospitalParams?.other_HospitalParams?.setIndicator(false);
    });
};
export const getSpecialties = (treatmentParams: any) => {
  getSpecialtiesDoctor(treatmentParams.allTreatment?.page)
    .then(async (res: any) => {
      if (res?.data?.nextPage) {
        await treatmentParams?.other_treatmentParams?.setNextPage(
          res?.data?.nextPage,
        );
      }
      if (treatmentParams.other_treatmentParams?.page > 1) {
        let newArr =
          await treatmentParams?.other_treatmentParams?.treatment.concat(
            res?.data?.specialities,
          );
        treatmentParams &&
          treatmentParams?.other_treatmentParams?.setTreatment(newArr);
      } else {
        treatmentParams?.other_treatmentParams?.setTreatment(
          res?.data?.specialities,
        );
        //
      }
    })
    .catch((err: any) => {})
    .finally(() => {
      treatmentParams &&
        treatmentParams?.other_treatmentParams?.setLoading(false);
      treatmentParams &&
        treatmentParams?.other_treatmentParams?.setRefreshing(false);
      treatmentParams &&
        treatmentParams?.other_treatmentParams?.setIndicator(false);
    });
};
/......................................Filter Doctor........................./;

export const filterDoctor = (apiParams: any, anotherParams: any) => {
  getFilter_Doctor(apiParams)
    .then((res: any) => {
      anotherParams && anotherParams?.setData(res?.data?.doctors);
      anotherParams && anotherParams?.modalizeRef.current?.close();
    })
    .catch((err: any) => {})
    .finally(() => anotherParams && anotherParams?.setLoading(false));
};

/...................................... Filter Hospital........................./;

export const filterHospital = (apiParams: any, anotherParams: any) => {
  getFilter_Hospital(apiParams)
    .then((res: any) => {
      anotherParams && anotherParams?.setHospitalData(res?.data?.hospitals);

      anotherParams && anotherParams?.modalizeRef.current?.close();
    })
    .catch((err: any) => {})
    .finally(() => anotherParams && anotherParams?.setLoading(false));
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
  onOpen?: any,
  response?: any,
  toggleSearch?: any,
  onChangeText?: any,
  handleItemPress?: any,
  onSubmitEditing?: any,
) => ({
  drop: true,
  showFilter: true,
  searhIconTrue: true,
  onlySearchIcon: true,
  toggle: toggle,
  onPressLocation: onOpen,
  options: drOptions,
  selected: response,
  ScreenTitle: response,
  onPress: toggleSearch,
  onOpenModalize: onOpen,
  onChangeText: onChangeText,
  handleDropDown: handleItemPress,
  onSubmitEditing: onSubmitEditing,
});

import {getFilter_Pharmacy, getUser_Pharmacy} from '@services';

export const getList = (getListParams: any) => {
  getListParams?.setLoading && getListParams?.setLoading(true);
  let params = {
    page: 1,
    search: getListParams?.searchText,
    lat: getListParams?.location?.latitude,
    long: getListParams?.location?.longitude,
  };

  getUser_Pharmacy(params)
    .then((res: any) => {
      getListParams?.setData && getListParams?.setData(res?.data?.pharmacies);
      getListParams?.setDistance && getListParams?.setDistance('');
    })
    .catch((err: any) => {})
    .finally(() => {
      getListParams?.setLoading && getListParams?.setLoading(false);
    });
};

// .............................................PHARMACY FILTER.....................................

export const filterList = (
  setLoading?: any,
  rating?: any,
  location?: any,
  distance?: any,
  setData?: Function,
  modalizeRef?: any,
) => {
  setLoading && setLoading(true);
  let params = {
    minRating: rating,
    lat: location?.latitude,
    long: location?.longitude,
    radius: distance !== '' ? parseInt(distance) * 1000 : 0,
    // page: 1,
  };

  getFilter_Pharmacy(params)
    .then((res: any) => {
      setData && setData(res?.data?.pharmacies);
      modalizeRef.current?.close();
    })
    .catch((err: any) => {});
  setLoading && setLoading(false);
};

//
//
//
//
//
//
// .............................................Cpmponent Props.....................................

import {getAll_RentACar, getFilter_Pharmacy, getUser_Pharmacy} from '@services';

export const getList = (getListParams: any) => {
  // lat: showBy == 'Nearby' ? selectedAddress?.lat : '',
  // long: showBy == 'Nearby' ? selectedAddress?.lng : '',
  // filter: showBy.toLowerCase(),
  // getListParams?.setLoading && getListParams?.setLoading(true);
  let params = {
    page: getListParams?.page,
    search: getListParams?.searchText,
    lat:
      // getListParams?.showBy == 'Nearby' ?
      getListParams?.location?.latitude,
    long:
      // getListParams?.showBy == 'Nearby' ?
      getListParams?.location?.longitude,
    filter: getListParams?.showBy.toLowerCase(),
  };

  //

  {
    getListParams?.type == 'pharmacy'
      ? getUser_Pharmacy(params)
          .then((res: any) => {
            getListParams?.setData &&
              getListParams?.setData(res?.data?.pharmacies);
            getListParams?.setDistance && getListParams?.setDistance('');
          })
          .catch((err: any) => {})
          .finally(() => {
            getListParams?.setLoading && getListParams?.setLoading(false);
          })
      : getAll_RentACar(params)
          .then((res: any) => {
            if (res?.data?.nextPage) {
              getListParams?.setNextPage(res?.data?.nextPage);
            }
            if (getListParams?.page > 1) {
              let newArr = getListParams?.data.concat(res?.data?.bookings);
              //
              getListParams?.setData(newArr);
            } else {
              //
              getListParams?.setData(res?.data?.rentACars);
            }
          })
          .catch((err: any) => {})
          .finally(() => {
            getListParams?.setLoading && getListParams?.setLoading(false);
            getListParams?.setLoading && getListParams?.setIndicator(false);
          });
  }
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

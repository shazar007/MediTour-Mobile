import {getHosiptalInsurance, getLabInsurance} from '@services';

export const getAll_Hospital = (hospitalParams: any) => {
  getHosiptalInsurance(hospitalParams.allHospital)
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
export const getAllLabs = (laborteryParams: any) => {
  getLabInsurance(laborteryParams.allLab)
    .then((res: any) => {
      laborteryParams?.other_allLab?.setNextPage(res?.data?.nextPage);

      if (laborteryParams.other_allLab?.page > 1) {
        let newArr = laborteryParams?.other_allLab?.hospitalData.concat(
          res?.data?.labs,
        );
        laborteryParams &&
          laborteryParams?.other_allLab?.setHospitalData(newArr);
      } else {
        laborteryParams?.other_allLab?.setHospitalData(res?.data?.labs);
      }
    })
    .catch((err: any) => {})
    .finally(() => {
      laborteryParams && laborteryParams?.other_allLab?.setLoading(false);
      laborteryParams &&
        laborteryParams &&
        laborteryParams?.other_allLab?.setRefreshing(false);
      laborteryParams &&
        laborteryParams &&
        laborteryParams?.other_allLab?.setIndicator(false);
    });
};

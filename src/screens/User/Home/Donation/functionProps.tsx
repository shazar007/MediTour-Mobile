import {
  getDonation_Companies,
  getNeedyPeople,
  getPeople_Donation,
  getRecentDonor,
} from '@services';

export const getListCompany = async (otherParams: any) => {
  try {
    const res = await getDonation_Companies();
    otherParams.setData(res.data?.companies);
  } catch (error) {}
};
export const donationList = async (otherParams: any) => {
  try {
    const res = await getPeople_Donation();
    //
    otherParams.setCompanyData(res?.data?.criteria);
  } catch (error) {}
};

export const getDonationNeedy = async (otherParams: any) => {
  try {
    const res = await getNeedyPeople();
    //
    otherParams.setNeedyPeople(res?.data);
  } catch (error) {}
};

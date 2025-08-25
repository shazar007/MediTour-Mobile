import {backIcon, UserBell} from '@assets';
import {
  getAllReviewsRatings_Doctors,
  getAvailability_Doctors,
  getSingle_UserDoctor,
  showToast,
} from '@services';

export const getSingleDoc = async (params: any, otherParams: any) => {
  //

  try {
    const res = await getSingle_UserDoctor(params);

    otherParams.setData(res?.data);
  } catch (error: any) {
    showToast('error', error?.response?.data?.message, false);
  }
};

export const getAvailabilityDoctors = async (params: any, otherParams: any) => {
  try {
    const res = await getAvailability_Doctors(params);
    //

    otherParams && otherParams.setAvailability(res?.data?.availability);
  } catch (error: any) {}
};

export const getAllReviews_Doctors = async (params: any, otherParams: any) => {
  try {
    const res = await getAllReviewsRatings_Doctors(params);
    otherParams && otherParams.setReviews(res?.data);
  } catch (error: any) {}
};

/............................/;

export const card_props = (item: any) => ({
  Size: 9,
  showValues: true,
  noRating: true,
  showValues2: true,
  RatingTrue: true,
  isVerify: true,
  item: item,
  name: item?.name,
  title2: item?.speciality?.join(', '),
  title3: item?.qualifications ? item?.qualifications : '',
  title4: `${
    (item?.clinicExperience && item?.clinicExperience) ||
    item?.clinicExperiences
  } years experience`,
  logo: {
    uri:
      item?.doctorImage ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
  },
});

export const viewAll = (item: any) => ({
  name: item?.userName,
  Descriptions: item?.review,
  averageRating: item?.rating,
  duration: item?.timeAgo,
  appointmentType: item?.appointmentType,
});

/...................................Simple Props................/;

export const buttonProps = {
  size: 14,
  height: 40,
  width: '80%',
  selected: true,
  title: 'APPOINTMENT',
  bgColor: 'red',
  bg_color: 'red',
} as const;

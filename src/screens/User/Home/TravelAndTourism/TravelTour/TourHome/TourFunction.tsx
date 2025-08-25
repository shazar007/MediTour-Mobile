import {getUpcomingTours, get_AllTours} from '@services';

export const getAllTours = async (otherParams: any) => {
  try {
    const res = await get_AllTours();
    otherParams.setData(res.data.tours);
  } catch (error) {}
};
export const getAllUpcoming = async (otherParams: any) => {};

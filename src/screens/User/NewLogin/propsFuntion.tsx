import {setUserAge} from '@redux';

export const handleAge = async (daetOfBirth: any, dispatch: any) => {
  const dobString = daetOfBirth;
  const dob = new Date(
    dobString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
  );

  const now = new Date();
  const diffMilliseconds = now.getTime() - dob.getTime();
  const calculatedAge = Math.floor(
    diffMilliseconds / (1000 * 60 * 60 * 24 * 365),
  );
  const ageConvert_InString = calculatedAge?.toLocaleString();
  await dispatch(setUserAge(ageConvert_InString));
};

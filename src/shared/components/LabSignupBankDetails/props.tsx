import {labSignup, pharmSignup, showToast} from '@services';

export const B2BSignupAPI = (apiParams: any, anotherParams: any) => {
  if (anotherParams?.changeStack == 'Laboratory') {
    labSignup(apiParams)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        anotherParams &&
          anotherParams.dispatch(anotherParams.setLabSignUpData(res?.data));
        anotherParams && anotherParams?.setCurrentStep(3);
      })
      .catch(err => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        anotherParams && anotherParams.setLoading(false);
      });
  }

  //   /...........................................PHARMACY SIGNUP ....................................../;

  if (anotherParams?.changeStack == 'Pharmacy') {
    pharmSignup(apiParams)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        anotherParams &&
          anotherParams.dispatch(anotherParams.setLabSignUpData(res?.data));
        anotherParams && anotherParams?.setCurrentStep(3);
      })
      .catch(err => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        anotherParams && anotherParams.setLoading(false);
      });
  }
};

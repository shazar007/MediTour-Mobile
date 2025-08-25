export const passwordMap = (formik: any) => {
  return [
    {
      id: 0,
      placeholder: 'Current Password',
      value: formik?.values?.currentPassword,
      onChangeText: formik.handleChange('currentPassword'),
      touched: formik.touched.currentPassword,
      error: formik.errors.currentPassword,
    },
    {
      id: 1,
      placeholder: 'New Password',
      value: formik?.values?.newPassword,
      onChangeText: formik.handleChange('newPassword'),
      touched: formik.touched.newPassword,
      error: formik.errors.newPassword,
    },
    {
      id: 2,
      placeholder: 'Confirm Password',
      value: formik?.values?.confirmPassword,
      onChangeText: formik.handleChange('confirmPassword'),
      touched: formik.touched.confirmPassword,
      error: formik.errors.confirmPassword,
    },
  ];
};

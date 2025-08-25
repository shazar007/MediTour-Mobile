import {RF} from '@theme';

export const mapData = (formik: any) => {
  return [
    {
      id: 0,
      m_Top: RF(16),
      maxLength: 35,
      onChangeText: formik?.handleChange('generic'),
      label: 'Generic',
      formik: formik?.touched?.generic,
      errors: formik?.errors?.generic,
      value: formik.values.generic,
    },
    {
      id: 1,
      m_Top: RF(16),
      maxLength: 35,
      onChangeText: formik?.handleChange('brand'),
      label: 'Brand',
      formik: formik?.touched?.brand,
      errors: formik?.errors?.brand,
      value: formik.values.brand,
    },

    // {
    //   id: 1,
    //   onChangeText: formik.handleChange('productName'),
    //   formik: formik?.touched?.productName,
    //   errors: formik?.errors?.productName,
    //   value: formik?.values?.productName,
    //   m_Top: 16,
    //   label: 'Product Name',
    // },

    {
      id: 2,
      onChangeText: formik.handleChange('strength'),
      formik: formik?.touched?.strength,
      errors: formik?.errors?.strength,
      value: formik?.values?.strength,
      m_Top: 16,
      label: 'Strength',
    },

    {
      id: 3,
      onChangeText: formik.handleChange('content'),
      formik: formik?.touched?.content,
      errors: formik?.errors?.content,
      value: formik?.values?.content,
      m_Top: 16,
      label: 'Content',
    },
    {
      id: 4,
      onChangeText: formik.handleChange('packSize'),
      formik: formik?.touched?.packSize,
      errors: formik?.errors?.packSize,
      value: formik?.values?.packSize,
      m_Top: 16,
      label: 'Pack Size',
    },
    {
      id: 5,
      onChangeText: formik.handleChange('actualPrice'),
      formik: formik?.touched?.actualPrice,
      errors: formik?.errors?.actualPrice,
      value: formik?.values?.actualPrice.toString(),
      m_Top: 16,
      label: 'T.P Price',
    },
    {
      id: 6,
      onChangeText: formik.handleChange('mrpPrice'),
      formik: formik?.touched?.mrpPrice,
      errors: formik?.errors?.mrpPrice,
      value: formik?.values?.mrpPrice.toString(),
      m_Top: 16,
      label: 'M.R.P Price',
    },
  ];
};

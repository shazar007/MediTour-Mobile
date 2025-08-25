import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  lab: '',
  hospital: '',
  B2B: '',
  hotelInfo: {},
  img: '',
  planImg: [],
  labSignUpData: {},
  specialities: [],
  health: '',
  travel: '',
  settings: {
    name: '',
    logo: '',
    fname: '',
    lname: '',
    cnicNo: '',
    password: '',
    bankName: '',
    cnicImage: '',
    cnicExpiry: '',
    licenseNo: '',
    licenseImg: '',
    emergencyNo: '',
    accHolderName: '',
    licenseExpiry: '',
    confirmPassword: '',
    fb: '',
    web: '',
    insta: '',
    status: '',
    taxImg: '',
    reason: '',
    twitter: '',
    salesTax: '',
    accountNo: '',
    incomeTax: '',
  },
  hotelDetail: {},
  orderImage: '',
};

export const b2bReducer = createSlice({
  name: 'b2b',
  initialState,
  reducers: {
    setB2B: (state, action) => {
      state.B2B = action.payload;
    },
    setHotelInfo: (state, action) => {
      state.hotelInfo = action.payload;
    },
    setHotelDetail: (state, action) => {
      state.hotelDetail = action.payload;
    },
    setImg: (state, action) => {
      state.img = action.payload;
    },
    setPlanImg: (state, action) => {
      state.planImg = action.payload;
    },
    setHealth: (state, action) => {
      state.health = action.payload;
    },
    setTravel: (state, action) => {
      state.travel = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setOrderImage: (state, action) => {
      state.orderImage = action.payload;
    },
    setLabSignUpData: (state, action) => {
      state.labSignUpData = action.payload;
    },
    setSpecialities: (state, action) => {
      state.specialities = action.payload;
    },
  },
});

export const {
  setB2B,
  setImg,
  setHealth,
  setTravel,
  setPlanImg,
  setSettings,
  setOrderImage,
  setHotelInfo,
  setHotelDetail,
  setLabSignUpData,
  setSpecialities,
} = b2bReducer.actions;

export default b2bReducer.reducer;

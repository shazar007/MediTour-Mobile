import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  firstLogin: true,
  user: null,
  favorites: [],
  userSignup: {},
  googleCredientials: null,
  password: null,
  authToken: null,
  isLoggedIn: false,
  selectCity: '',
  exhangeRate: null,
  refreshBooking: false,
  cart: [],
  selectSpecialist: '',
  qnty: 1,
  userAge: '',
  userFormData: {
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
  },
  colorCode: '#19383A',
  captureFlag: false,
  stores: [],
  fcm_token: null,
  notification_counter: 0,
  selectedRadius: 50,
  latLon: 0,
  nearMe: [],
  forMe: [],
  fav_Offers: [],
  fav_MyProducts: [],
  fav_TopPicks: [],
  explore_Bmp: [],
  explore_Bap: [],
  top_Picks: [],
  bmp_detail: [],
  bap_detail: [],
  notifications: {},
  add_A_Card: 'add',
  card_Added: false,
  card_Number: '',
  // location: {},
  location: {
    latitude: 31.4417,
    longitude: 74.2605,
  },
  routeName: '',
  primaryColor: '#1A3D7C',
  showCurrentAddress: false,
  //.............
  currentLocation: null,
  selectedAddress: null,
  // selectedAddress: {
  //   lat: '',
  //   lng: '',
  // },
  //....................
  city: '',
  pharmacyData: '',
  hospitalId: '',
  checkNetwork: false,
  paymentID: '',
  amount: '',
  stripeObj: {},
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStripeObj: (state, action) => {
      state.stripeObj = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPaymentID: (state, action) => {
      state.paymentID = action.payload;
    },
    setPharmacyData: (state, action) => {
      state.pharmacyData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setShowCurrentAddress: (state, action) => {
      state.showCurrentAddress = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setFirstLogin: (state, action) => {
      state.firstLogin = action.payload;
    },
    setFav_TopPicks: (state, action) => {
      state.fav_TopPicks = action.payload;
    },
    setFav_Offers: (state, action) => {
      state.fav_Offers = action.payload;
    },
    setFav_MyProducts: (state, action) => {
      state.fav_MyProducts = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setExploreBmp: (state, action) => {
      state.explore_Bmp = action.payload;
    },
    setAdd_A_Card: (state, action) => {
      state.add_A_Card = action.payload;
    },
    setCard_Added: (state, action) => {
      state.card_Added = action.payload;
    },
    setCard_Number: (state, action) => {
      state.card_Number = action.payload;
    },
    setExploreBap: (state, action) => {
      state.explore_Bap = action.payload;
    },
    setBAP_Detail: (state, action) => {
      state.bap_detail = action.payload;
    },
    setBMP_Detail: (state, action) => {
      state.bmp_detail = action.payload;
    },
    setNearMe: (state, action) => {
      state.nearMe = action.payload;
    },
    setTop_Picks: (state, action) => {
      state.top_Picks = action.payload;
    },
    setForMe: (state, action) => {
      state.forMe = action.payload;
    },
    setLatLon: (state, action) => {
      state.latLon = action.payload;
    },
    setNotification_counter: (state, action) => {
      state.notification_counter = action.payload;
    },
    setSelectedRadius: (state, action) => {
      state.selectedRadius = action.payload;
    },
    setCaptureFlag: (state, action) => {
      state.captureFlag = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setColorCode: (state, action) => {
      state.colorCode = action.payload;
    },
    setUserAge: (state, action) => {
      state.userAge = action.payload;
    },
    setUserFormData: (state, action) => {
      state.userFormData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.favorites = [];
      state.cart = [];
    },
    setFCMToken: (state, action) => {
      state.fcm_token = action.payload;
    },
    signOut: state => {
      state.user = null;
      state.colorCode = '#19383A';
      state.authToken = null;
      state.isLoggedIn = false;
    },
    setSelectCity: (state, action) => {
      state.selectCity = action.payload;
    },
    setSpecialist: (state, action) => {
      state.selectSpecialist = action.payload;
    },
    setGoogleCredientials: (state, action) => {
      state.googleCredientials = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setUserSignUp: (state, action) => {
      state.userSignup = action.payload;
    },
    setQnty: (state, action) => {
      state.qnty = action.payload;
    },
    setHospitalId: (state, action) => {
      state.hospitalId = action.payload;
    },
    setCheckNetwork: (state, action) => {
      state.checkNetwork = action.payload;
    },
    setRouteName: (state, action) => {
      state.routeName = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
    setRefreshBooking: (state, action) => {
      state.refreshBooking = action.payload;
    },
  },
});

export const {
  setExchangeRate,
  setStripeObj,
  setAmount,
  setFavorites,
  setPaymentID,
  setCity,
  setShowCurrentAddress,
  setLocation,
  setFav_MyProducts,
  setFav_Offers,
  setFav_TopPicks,
  setCard_Number,
  setCard_Added,
  setAdd_A_Card,
  setBAP_Detail,
  setBMP_Detail,
  setTop_Picks,
  setExploreBap,
  setExploreBmp,
  setForMe,
  setNearMe,
  setLatLon,
  setSelectedRadius,
  setNotification_counter,
  setUser,
  signOut,
  setFCMToken,
  setUserSignUp,
  setPassword,
  setColorCode,
  setAuthToken,
  setIsLoggedIn,
  setUserFormData,
  setCaptureFlag,
  setStores,
  setNotifications,
  setFirstLogin,
  setSelectCity,
  setSpecialist,
  setGoogleCredientials,
  setCart,
  setPharmacyData,
  setQnty,
  setUserAge,
  setSelectedAddress,
  setCurrentLocation,
  setHospitalId,
  setCheckNetwork,
  setRouteName,
  setPrimaryColor,
  setRefreshBooking,
} = userReducer.actions;

export default userReducer.reducer;

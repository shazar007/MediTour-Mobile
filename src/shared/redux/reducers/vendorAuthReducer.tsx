import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  selectedFiles: '',
  // labSignUpData: {name: ''},
};

export const vendorAuthReducer = createSlice({
  name: 'vendorAuthentication',
  initialState,
  reducers: {
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    // setLabSignUpData: (state, action) => {
    //   state.labSignUpData = action.payload;
    // },
  },
});

export const {setSelectedFiles} = vendorAuthReducer.actions;

export default vendorAuthReducer.reducer;

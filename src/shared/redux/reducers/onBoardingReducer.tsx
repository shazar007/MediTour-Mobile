import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  oneTimeOnBoarding: false,
};

export const onBoardingReducer = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {
    setOneTimeonBoarding: (state, action) => {
      state.oneTimeOnBoarding = action.payload;
    },
  },
});

export const {setOneTimeonBoarding} = onBoardingReducer.actions;

export default onBoardingReducer.reducer;

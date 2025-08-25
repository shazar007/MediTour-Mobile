import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  hotelValue: '',
};

export const randomReducer = createSlice({
  name: 'random',
  initialState,
  reducers: {
    setHotelValue: (state, action) => {
      state.hotelValue = action.payload;
    },
  },
});

export const {setHotelValue} = randomReducer.actions;

export default randomReducer.reducer;

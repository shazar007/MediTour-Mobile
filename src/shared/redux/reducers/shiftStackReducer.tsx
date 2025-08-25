import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  changeStack: '',
  changeColor: '',
  copyColor: '',
};

export const shiftStackReducer = createSlice({
  name: 'shiftStack',
  initialState,
  reducers: {
    setChangeStack: (state, action) => {
      state.changeStack = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCopyColor: (state, action) => {
      state.copyColor = action.payload;
    },
  },
});

export const {setChangeStack, setChangeColor, setCopyColor} =
  shiftStackReducer.actions;

export default shiftStackReducer.reducer;

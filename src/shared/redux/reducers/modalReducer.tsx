import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  modalVisible: false,
  handleModal: false,
};

export const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setHandleModal: (state, action) => {
      state.handleModal = action.payload;
    },
  },
});

export const {setModalVisible, setHandleModal} = modalReducer.actions;

export default modalReducer.reducer;

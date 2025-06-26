import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  full_name: '',
  email: '',
  phone: '',
  purchase_date: new Date().toISOString().slice(0, 10),
  products: [],
  feedback: '',
  rating_quality: 0,
  rating_staff: 0,
  rating_experience: 0,
  signature: '',
  step: 0,
  submitted: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setField: (state, { payload }) => {
      state[payload.field] = payload.value;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    setSubmitted: (state, { payload }) => {
      state.submitted = payload;
    },
    resetForm: () => initialState,
  },
});

export const { setField, setStep, setSubmitted, resetForm } = feedbackSlice.actions;
export default feedbackSlice.reducer;
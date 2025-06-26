import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedbackSlice';

export default configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});
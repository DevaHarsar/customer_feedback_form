// import React from 'react';
// import { Typography, Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { resetForm, setStep } from '../features/feedbackSlice';

// export default function SuccessStep() {
//   const dispatch = useDispatch();
//   const handleNew = () => {
//     dispatch(resetForm());
//     dispatch(setStep(0));
//   };
//   return (
//     <div style={{ textAlign: 'center', padding: 32 }}>
//       <Typography variant="h5" gutterBottom>Thank you for your feedback!</Typography>
//       <Button variant="contained" onClick={handleNew}>Submit Another Feedback</Button>
//     </div>
//   );
// } 

import React from 'react';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, setStep } from '../features/feedbackSlice';

export default function SuccessStep() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.feedback.submissionError); // get error from store

  const handleNew = () => {
    dispatch(resetForm());
    dispatch(setStep(0));
  };

  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      {error ? (
        <>
          <Typography variant="h5" gutterBottom color="error">
            {error}
          </Typography>
          <Button variant="contained" onClick={handleNew} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for your feedback!
          </Typography>
          <Button variant="contained" onClick={handleNew}>
            Submit Another Feedback
          </Button>
        </>
      )}
    </div>
  );
}

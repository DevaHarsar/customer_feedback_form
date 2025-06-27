import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setSubmitted } from '../features/feedbackSlice';
import CustomerInfoStep from '../steps/CustomerInfoStep';
import ProductFeedbackStep from '../steps/ProductFeedbackStep';
import RatingStep from '../steps/RatingStep';
import SignatureStep from '../steps/SignatureStep';
import SuccessStep from '../steps/SuccessStep';
import { Stepper, Step, StepLabel, Button, Box, Container } from '@mui/material';
import axios from 'axios';

const steps = ['Customer Info', 'Purchase Feedback', 'Ratings', 'Signature'];

function validateStep(step, state) {
  const errors = {};
  if (step === 0) {
    if (!state.full_name) errors.full_name = 'Full name is required';
    if (!state.email) errors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.email)) errors.email = 'Invalid email';
    if (!state.phone) errors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(state.phone)) errors.phone = 'Invalid phone number';
  }
  if (step === 1) {
    if (!state.products.length) errors.products = 'Select at least one product';
    if(!state.feedback) errors.feedback='Please provide feedback for the product';
  }
  if (step === 2) {
    if (!state.rating_quality) errors.rating_quality = 'Required';
    if (!state.rating_staff) errors.rating_staff = 'Required';
    if (!state.rating_experience) errors.rating_experience = 'Required';
  }
  if (step === 3) {
    if (!state.signature) errors.signature = 'Signature required';
  }
  return errors;
}

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const state = useSelector(s => s.feedback);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const err = validateStep(state.step, state);
    setErrors(err);
    if (Object.keys(err).length) return;
    if (state.step === steps.length - 1) {
      setLoading(true);
      try {
        await axios.post('http://localhost:5000/feedback', {
          ...state,
          products: state.products.join(', ')
        });
        dispatch(setSubmitted(true));
      } catch (e) {
        alert('Submission failed!');
      }
      setLoading(false);
    } else {
      dispatch(setStep(state.step + 1));
    }
  };

  const handleBack = () => dispatch(setStep(state.step - 1));

  if (state.submitted) return <SuccessStep />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
      <Box sx={{ width: '100%', maxWidth: 800, mb: 4 }}>
        <Stepper activeStep={state.step} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 600, mt: 4 }}>
        {state.step === 0 && <CustomerInfoStep errors={errors} />}
        {state.step === 1 && <ProductFeedbackStep errors={errors} />}
        {state.step === 2 && <RatingStep errors={errors} />}
        {state.step === 3 && <SignatureStep errors={errors} />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, width: '100%', maxWidth: 600 }}>
        <Button disabled={state.step === 0} onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={handleNext} disabled={loading}>
          {state.step === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default FeedbackForm;

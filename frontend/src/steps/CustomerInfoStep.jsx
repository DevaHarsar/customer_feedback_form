import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../features/feedbackSlice';
import { TextField, Grid, Paper, Typography, Divider, Box, Container } from '@mui/material';

export default function CustomerInfoStep({ errors }) {
  const dispatch = useDispatch();
  const { full_name, email, phone } = useSelector(state => state.feedback);

  return (
    <Container maxWidth="md">
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 3,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        maxWidth: 500,
        mx: 'auto',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#232526', letterSpacing: 1 }}>
          Customer Information
        </Typography>
        <Divider sx={{ my: 1, borderColor: '#FFD700', borderBottomWidth: 2, width: 60, mx: 'auto' }} />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField
            label="Full Name"
            value={full_name}
            onChange={e => dispatch(setField({ field: 'full_name', value: e.target.value }))}
            fullWidth
            required
            error={!!errors.full_name}
            helperText={errors.full_name}
            variant="outlined"
            sx={{ background: '#fff', borderRadius: 2 }}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Email"
            value={email}
            onChange={e => dispatch(setField({ field: 'email', value: e.target.value }))}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            sx={{ background: '#fff', borderRadius: 2 }}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Phone Number"
            value={phone}
            onChange={e => dispatch(setField({ field: 'phone', value: e.target.value }))}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
            variant="outlined"
            sx={{ background: '#fff', borderRadius: 2 }}
          />
        </Grid>
      </Grid>
    </Paper>
    </Container>
  );
}
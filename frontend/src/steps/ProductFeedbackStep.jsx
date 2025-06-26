import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../features/feedbackSlice';
import {TextField,Grid,Checkbox,FormControlLabel,FormGroup,Typography,Paper,Divider,Box,Container} from '@mui/material';

const productOptions = [
  'Shirt', 'Pants', 'Dress', 'Jacket', 'Shoes', 'Accessories'
];

export default function ProductFeedbackStep({ errors }) {
  const dispatch = useDispatch();
  const { products, purchase_date, feedback } = useSelector(state => state.feedback);

  const handleProductChange = (product) => {
    let newProducts = products.includes(product)
      ? products.filter(p => p !== product)
      : [...products, product];
    dispatch(setField({ field: 'products', value: newProducts }));
  };

  return (
     <Container maxWidth="md">
    <Paper
      elevation={5}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 3,
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
        maxWidth: 500,
        mx: 'auto',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#232526', letterSpacing: 1 }}>
          Product Feedback
        </Typography>
        <Divider sx={{ my: 1, borderColor: '#FFD700', borderBottomWidth: 2, width: 60, mx: 'auto' }} />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField
            label="Date of Purchase"
            value={purchase_date}
            fullWidth
            disabled
            variant="outlined"
            sx={{ background: '#fff', borderRadius: 2 }}
          />
        </Grid>
        <Grid xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            Products Purchased
          </Typography>
          <FormGroup row>
            {productOptions.map(option => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={products.includes(option)}
                    onChange={() => handleProductChange(option)}
                    sx={{
                      color: 'grey',
                      '&.Mui-checked': { color: 'blue' }
                    }}
                  />
                }
                label={option}
                sx={{ mr: 2 }}
              />
            ))}
          </FormGroup>
          {errors.products && <Typography color="error">{errors.products}</Typography>}
        </Grid>
       <Container maxWidth="lg">
        <Grid xs={10}>
          <TextField
            label="Feedback"
            value={feedback}
            onChange={e => dispatch(setField({ field: 'feedback', value: e.target.value }))}
            fullWidth
            multiline
            minRows={3}
            error={Boolean(errors.feedback)}
            helperText={errors.feedback}
            variant="outlined"
            sx={{ background: '#fff', borderRadius: 0 }}
          />
        </Grid>
        </Container>
      </Grid>
    </Paper>
    </Container>
  );
}
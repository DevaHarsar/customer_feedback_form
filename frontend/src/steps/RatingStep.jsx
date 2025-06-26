// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setField } from '../features/feedbackSlice';
// import { Grid, Typography, Rating } from '@mui/material';

// export default function RatingStep({ errors }) {
//   const dispatch = useDispatch();
//   const { rating_quality, rating_staff, rating_experience } = useSelector(state => state.feedback);

//   return (
//     <Grid container spacing={2}>
//       <Grid xs={12}>
//         <Typography>Quality of the product</Typography>
//         <Rating
//           value={rating_quality}
//           onChange={(_, value) => dispatch(setField({ field: 'rating_quality', value: value || 0 }))}
//         />
//         {errors.rating_quality && <Typography color="error">{errors.rating_quality}</Typography>}
//       </Grid>
//       <Grid xs={12}>
//         <Typography>Staff friendliness</Typography>
//         <Rating
//           value={rating_staff}
//           onChange={(_, value) => dispatch(setField({ field: 'rating_staff', value: value || 0 }))}
//         />
//         {errors.rating_staff && <Typography color="error">{errors.rating_staff}</Typography>}
//       </Grid>
//       <Grid xs={12}>
//         <Typography>Overall experience</Typography>
//         <Rating
//           value={rating_experience}
//           onChange={(_, value) => dispatch(setField({ field: 'rating_experience', value: value || 0 }))}
//         />
//         {errors.rating_experience && <Typography color="error">{errors.rating_experience}</Typography>}
//       </Grid>
//     </Grid>
//   );
// }   


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../features/feedbackSlice';
import { Grid, Typography, Rating, Paper, Divider, Box } from '@mui/material';

export default function RatingStep({ errors }) {
  const dispatch = useDispatch();
  const { rating_quality, rating_staff, rating_experience } = useSelector(state => state.feedback);

  return (
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
          Rate Your Experience
        </Typography>
        <Divider sx={{ my: 1, borderColor: '#FFD700', borderBottomWidth: 2, width: 60, mx: 'auto' }} />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Quality of the product</Typography>
          <Rating
            value={rating_quality}
            onChange={(_, value) => dispatch(setField({ field: 'rating_quality', value: value || 0 }))}
            sx={{
              color: 'blue',
              fontSize: 28,
            }}
          />
          {errors.rating_quality && <Typography color="error">{errors.rating_quality}</Typography>}
        </Grid>
        <Grid xs={12}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Staff friendliness</Typography>
          <Rating
            value={rating_staff}
            onChange={(_, value) => dispatch(setField({ field: 'rating_staff', value: value || 0 }))}
            sx={{
              color: 'blue',
              fontSize: 28,
            }}
          />
          {errors.rating_staff && <Typography color="error">{errors.rating_staff}</Typography>}
        </Grid>
        <Grid xs={12}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Overall experience</Typography>
          <Rating
            value={rating_experience}
            onChange={(_, value) => dispatch(setField({ field: 'rating_experience', value: value || 0 }))}
            sx={{
              color: 'blue',
              fontSize: 28,
            }}
          />
          {errors.rating_experience && <Typography color="error">{errors.rating_experience}</Typography>}
        </Grid>
      </Grid>
    </Paper>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Rating,
  Button,
  Collapse,
  Grid
} from '@mui/material';

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expanded, setExpanded] = useState({});
   const [error, setError] = useState('');

  useEffect(() => {
  axios.get('http://localhost:5000/feedback/admin')
  .then(res => setFeedbacks(res.data))
  .catch(error => {
    console.error('Error fetching feedbacks:', error);
    setError('Unable to fetch feedbacks. Please try again later.');
  });

  }, []);

  const handleExpandClick = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        All Feedbacks
      </Typography>
         {error ? (
        <Typography variant="body1" color="error" sx={{ mb: 3, textAlign: 'center' }}>
          {error}
        </Typography>
      ) : feedbacks.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          No feedback data available.
        </Typography>
      ) : null}
      <Grid container spacing={10}>
        {feedbacks.map(fb => (
          <Grid item xs={12} md={6} lg={4} key={fb.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#232526', mb: 1 }}>
                  {fb.full_name}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'black', borderBottomWidth: 2, width: 60 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Products:</b> {fb.products}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Date:</b> {fb.purchase_date.slice(0, 10)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Quality:</b></Typography>
                  <Rating value={fb.rating_quality} readOnly precision={1} sx={{ color: 'blue' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Staff:</b></Typography>
                  <Rating value={fb.rating_staff} readOnly precision={1} sx={{ color: 'blue' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Experience:</b></Typography>
                  <Rating value={fb.rating_experience} readOnly precision={1} sx={{ color: 'blue' }} />
                </Box>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button
                  variant="text"
                  sx={{
                    color: 'blue',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { textDecoration: 'underline', background: 'rgba(255,215,0,0.08)' }
                  }}
                  onClick={() => handleExpandClick(fb.id)}
                >
                  {expanded[fb.id] ? 'See Less' : 'See More'}
                </Button>
              </Box>
              <Collapse in={expanded[fb.id]}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Email:</b> {fb.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Phone:</b> {fb.phone}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Feedback:</b> {fb.feedback}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Signature:</b>
                </Typography>
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                  <img
                    src={fb.signature}
                    alt="Signature"
                    style={{
                      maxWidth: 220,
                      border: '1px solid blue',
                      borderRadius: 4,
                      background: '#fff',
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
                    }}
                  />
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
     
      </Grid>
    </Container>
  );
};

export default AdminView;
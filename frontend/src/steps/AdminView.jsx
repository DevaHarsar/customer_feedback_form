import React, { useEffect, useState } from 'react';
import { Box,Container,Typography,Paper,Divider,Rating,Button,Collapse,Grid,CircularProgress} from '@mui/material';
import useApi from '../hooks/useApi';
import ErrorAlert from '../components/ErrorAlert';

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const { loading, error, apiCall, clearError } = useApi();

  const fetchFeedbacks = async () => {
    try {
      const data = await apiCall('GET', 'http://localhost:5000/feedback/admin');
      setFeedbacks(data);
    } catch (err) {
      // Error is already handled by useApi hook
      console.error('Failed to fetch feedbacks:', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleExpandClick = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading && feedbacks.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} sx={{ color: '#FFD700' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        All Feedbacks
      </Typography>
      
      <ErrorAlert 
        error={error} 
        onRetry={fetchFeedbacks}
        onClose={clearError}
        title="Database Connection Error"
      />

      {feedbacks.length === 0 && !loading && !error && (
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
          borderRadius: 3
        }}>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            No feedbacks found
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            There are no feedback submissions yet.
          </Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
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
                <Divider sx={{ mb: 2, borderColor: '#FFD700', borderBottomWidth: 2, width: 60 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Products:</b> {fb.products}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Date:</b> {fb.purchase_date}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Quality:</b></Typography>
                  <Rating value={fb.rating_quality} readOnly precision={1} sx={{ color: '#FFD700' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Staff:</b></Typography>
                  <Rating value={fb.rating_staff} readOnly precision={1} sx={{ color: '#FFD700' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2"><b>Experience:</b></Typography>
                  <Rating value={fb.rating_experience} readOnly precision={1} sx={{ color: '#FFD700' }} />
                </Box>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button
                  variant="text"
                  sx={{
                    color: '#FFD700',
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
                      border: '1px solid #FFD700',
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
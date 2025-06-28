import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../features/feedbackSlice';
import { Button, Typography, Box, Paper, Divider } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

export default function SignatureStep({ errors }) {
  const dispatch = useDispatch();
  const { signature } = useSelector(state => state.feedback);
  const sigPad = useRef();

  const handleClear = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      dispatch(setField({ field: 'signature', value: '' }));
    }
  };

  const handleEnd = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      try {
        const canvas = sigPad.current.getCanvas();
        const data = canvas.toDataURL('image/png');
        dispatch(setField({ field: 'signature', value: data }));
      } catch (error) {
        console.error('Error getting signature data:', error);
        try {
          const data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
          dispatch(setField({ field: 'signature', value: data }));
        } catch (fallbackError) {
          console.error('Fallback signature method failed:', fallbackError);
        }
      }
    }
  };

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
          Signature
        </Typography>
        <Divider sx={{ my: 1, borderColor: '#FFD700', borderBottomWidth: 2, width: 60, mx: 'auto' }} />
        <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
          Please sign below
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            border: '2px dashed grey',
            borderRadius: 2,
            background: '#fff',
            width: '100%',
            maxWidth: 400,
            minHeight: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          }}
        >
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 400,
              height: 150,
              className: 'sigCanvas',
              style: {
                border: 'none',
                width: '100%',
                maxWidth: '400px',
                background: 'transparent',
              }
            }}
            ref={sigPad}
            onEnd={handleEnd}
            backgroundColor="#fff"
          />
        </Box>
        <Button
          onClick={handleClear}
          variant="outlined"
          sx={{
            borderColor: '#FFD700',
            color: '#FFD700',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#FFC300',
              background: 'rgba(255, 215, 0, 0.08)',
            }
          }}
        >
          Clear Signature
        </Button>
        {errors.signature && (
          <Typography color="error" variant="body2">
            {errors.signature}
          </Typography>
        )}
        {signature && (
          <Box sx={{mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 1, color: '#232526' }}>Signature Preview:</Typography>
            <img
              src={signature}
              alt="Signature preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100px',
                border: '1px solid grey',
                borderRadius: '4px',
                background: '#fff',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
              }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
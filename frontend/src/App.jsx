import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FeedbackForm from './components/FeedbackForm';
import AdminView from './components/AdminView';
import { useState } from 'react';

const App = () => {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDrawerItemClick = (index) => {
    setTab(index);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(100deg, #232526 0%,rgb(57, 60, 61) 100%)',
          boxShadow: '0 0px 0px 0 rgba(0,0,0,0.2)',
          borderRadius: { xs: 0, sm: '0 0 20px 50px' },
          px: { xs: 0.1, sm: 2 },
          py: { xs: 0.2, sm: 1 },
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 40, sm: 20 },
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: isMobile ? 1 : 0,
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              color: '#fff',
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.10)',
              mb: isMobile ? 0 : 0,
            }}
          >
            Clothing Store Feedback
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 200, background: '#232526', height: '100%', color: '#fff' }}>
                  <List>
                    <ListItem button onClick={() => handleDrawerItemClick(0)}>
                      <ListItemText
                        primary="Feedback Form"
                        primaryTypographyProps={{
                          sx: {
                            color: tab === 0 ? '#FFD700' : '#fff',
                            fontWeight: tab === 0 ? 700 : 400,
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem button onClick={() => handleDrawerItemClick(1)}>
                      <ListItemText
                        primary="Admin View"
                        primaryTypographyProps={{
                          sx: {
                            color: tab === 1 ? '#FFD700' : '#fff',
                            fontWeight: tab === 1 ? 700 : 400,
                          },
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFB347 100%)',
                  height: 4,
                  borderRadius: 2,
                },
              }}
              sx={{
                '.MuiTab-root': {
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  mx: 1,
                  borderRadius: 2,
                  transition: 'background 0.2s',
                  '&.Mui-selected': {
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FFD700',
                  },
                  '&:hover': {
                    background: 'rgba(255,255,255,0.12)',
                  },
                },
              }}
            >
              <Tab label="Feedback Form" />
              <Tab label="Admin View" />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1 }}>
        {tab === 0 ? <FeedbackForm /> : <AdminView />}
      </Box>
    </Box>
  );
};

export default App;





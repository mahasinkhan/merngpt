import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the current route

  const handleLogout = async () => {
    await logout();
    console.log("Logged out successfully!");
    navigate('/'); // Navigate to home after logout
  };

  return (
    <AppBar sx={{ background: 'transparent', position: 'static', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />

        {/* Display the current route */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'gray' }}>
          {location.pathname === '/' && 'Home'}
          {location.pathname === '/chat' && 'Chat'}
          {location.pathname === '/login' && 'Login'}
          {location.pathname === '/signup' && 'Sign up'}
        </Typography>

        <div>
          {isLoggedIn ? (
            <>
              <NavigationLink 
                bg="#00fffc" 
                to="/chat" 
                text="Go To Chat" 
                textColor="black" 
              />
              <NavigationLink 
                bg="#51538f" 
                to="/" 
                text="Log Out" 
                textColor="white" 
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <NavigationLink 
                bg="#51538f" 
                to="/login" 
                text="Login" 
                textColor="white" 
              />
              <NavigationLink 
                bg="#51538f" 
                to="/signup" 
                text="Sign up" 
                textColor="white" 
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

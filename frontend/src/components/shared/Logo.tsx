import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center',  // Align items vertically in the center
        gap: '15px',            // Add some space between logo and text
        marginRight: 'auto'    // Push to the left side
      }}
    >
      {/* Image logo */}
      <Link to="/">
        <img 
          src="https://openai.com/favicon.ico"  // Image from public folder
          alt="OpenAI" 
          width="30px" 
          height="30px" 
          className="image-inverted" 
        />
      </Link>

      {/* Text next to the logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography 
          sx={{ 
            display: { md: 'block', sm: 'none', xs: 'none' }, 
            fontWeight: '800', 
            textShadow: '2px 2px 20px #000',
            fontSize: '20px' 
          }}
        >
          MERN-GPT
        </Typography>
      </Link>
    </div>
  );
}

export default Logo;

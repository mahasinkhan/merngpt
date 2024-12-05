import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink: React.FC<Props> = ({ to, bg, text, textColor, onClick }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault(); // Prevent default navigation temporarily
      await onClick();    // Execute the async function
    }
  };

  return (
    <Link className='nav-link'
      to={to}
      style={{
        backgroundColor: bg,
        color: textColor,
        padding: '10px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block',
        margin: '0 5px',
      }}
      onClick={onClick ? handleClick : undefined}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;

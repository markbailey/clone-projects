import React from 'react';

function Logo({ ...otherProps }) {
  return <img src="/logo192.png" alt="logo" {...otherProps} />;
}

export default Logo;

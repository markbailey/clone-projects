import React from 'react';

function Icon({ name, size, ...otherProps }) {
  const { className, style } = otherProps;
  return (
    <i
      {...otherProps}
      className={`material-icons ${className || ''}`.trim()}
      style={{ ...(style || {}), fontSize: size || 30 }}
    >
      {name}
    </i>
  );
}

export default Icon;

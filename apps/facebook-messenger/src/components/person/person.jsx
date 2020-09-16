import React from 'react';

function Person({ displayName, imageUrl }) {
  return (
    <div style={{ display: 'flex' }}>
      <img src={imageUrl} alt={`${displayName} image`} />
      <span style={{ flex: 1 }}>{displayName}</span>
    </div>
  );
}

export default Person;

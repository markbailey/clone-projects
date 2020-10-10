import React from 'react';

function Person({ displayName, imageUrl }) {
  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <img
        src={imageUrl}
        alt={`${displayName}`}
        style={{ width: 24, borderRadius: 30 }}
      />
      <span style={{ flex: 1 }}>{displayName}</span>
    </div>
  );
}

export default Person;

import React from 'react';

import Icon from '../../atoms/icon';

import { noPointerEvents } from '../../../css.stylesheet';

function Person({ displayName, imageUrl }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${displayName}`}
          style={{ width: 24, borderRadius: 30 }}
        />
      ) : <Icon name="account_circle" size={32} css={noPointerEvents} />}
      <span style={{ flex: 1, marginLeft: 10 }}>{displayName}</span>
    </div>
  );
}

export default Person;

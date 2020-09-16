import React from 'react';

import {
  ViewWrapper,
  LogoWrapper,
  PoweredByWrapper,
} from './styled.components';

function SplashView() {
  return (
    <ViewWrapper>
      <LogoWrapper>
        <img src="/logo192.png" alt="logo 192px" style={{ marginBottom: 32 }} />
        <h1 style={{ margin: 0 }}>Facebook Messenger Clone</h1>
      </LogoWrapper>

      <PoweredByWrapper>
        <small>Powered by</small>
      </PoweredByWrapper>
    </ViewWrapper>
  );
}

export default SplashView;

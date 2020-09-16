import React, { useContext } from 'react';

import { ViewWrapper, LogoWrapper } from './styled.components';
import AuthContext from '../../context/auth';

function ForgotPasswordView() {
  const auth = useContext(AuthContext);

  return (
    <ViewWrapper>
      <LogoWrapper>
        <img
          src="/logo192.png"
          alt="logo 192px"
          style={{ marginBottom: 32, width: 64 }}
        />
        <h1 style={{ margin: '0 0 8px', fontWeight: 500 }}>
          Facebook Messenger Clone
        </h1>

        <p style={{ textTransform: 'initial' }}>
          Fill in your email address and we will
          <br />
          email you a reset link.
        </p>
      </LogoWrapper>
    </ViewWrapper>
  );
}

export default ForgotPasswordView;

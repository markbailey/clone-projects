import React, { /*useContext,*/ useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/tags/input';
import Button from '../../components/tags/button';

import { ViewWrapper, LogoWrapper } from './styled.components';
// import AuthContext from '../../context/auth';

function ForgotPasswordView() {
  // const auth = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState('');

  const onFormSubmit = async event => {
    event.preventDefault();
  };

  return (
    <ViewWrapper>
      <LogoWrapper>
        <img
          src="/logo192.png"
          alt="logo 192px"
          style={{ marginBottom: 32, width: 64 }}
        />
        <h1 style={{ margin: '0 0 8px', fontWeight: 500 }}>Forgot Password</h1>

        <p style={{ textTransform: 'initial' }}>
          Fill in your email address and we will
          <br />
          email you a reset link.
        </p>
      </LogoWrapper>

      <form
        onSubmit={onFormSubmit}
        style={{ width: '100%', maxWidth: 325, margin: '0 auto' }}
      >
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="currentEmailAddress"
            style={{ display: 'block', marginBottom: 8 }}
          >
            Email Address
          </label>
          <Input
            type="email"
            id="currentEmailAddress"
            name="currentEmailAddress"
            value={emailAddress}
            placeholder="e.g. joebloggs@hotmail.com"
            onChange={e => setEmailAddress(e.target.value)}
            required
            pattern="(.*)@(\w{3,})(.\w{2,}){1,}"
          />
        </div>

        <Button type="submit" block primary>
          Request password reset
        </Button>

        <div
          style={{
            textTransform: 'initial',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          <Link to="/sign-in">Cancel</Link>
        </div>
      </form>
    </ViewWrapper>
  );
}

export default ForgotPasswordView;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../tags/input';
import Button from '../../tags/button';

function SignInForm({ auth }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onFormSubmit = async event => {
    event.preventDefault();
    setIsSigningIn(true);
    await auth.signIn(emailAddress, password);
    setIsSigningIn(false);
  };

  return (
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
          onChange={e => setEmailAddress(e.target.value)}
          required
          pattern="(.*)@(\w{3,})(.\w{2,}){1,}"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="currentPassword"
          style={{ display: 'block', marginBottom: 8 }}
        >
          Password
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="currentPassword"
          name="currentPassword"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          endAdornment={
            <Button
              icon={showPassword ? 'visibility_off' : 'visibility'}
              title={`${showPassword ? 'Hide' : 'Show'} password`}
              iconSize={24}
              iconButton
              transparent
              onClick={() => setShowPassword(!showPassword)}
              style={{ opacity: 0.5 }}
            />
          }
        />
      </div>

      <Button type="submit" block primary disabled={isSigningIn}>
        {isSigningIn ? 'Signing in...' : 'Sign in with email'}
      </Button>
      <Link to="/sign-up" style={{ textTransform: 'initial' }}>
        I don't have an account
      </Link>

      <div style={{ position: 'relative' }}>
        <hr style={{ margin: '32px 0', borderColor: 'rgba(0, 0, 0, 0.04)' }} />
        <h5
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            backgroundColor: '#fff',
            padding: '5px 10px',
            margin: 0,
            lineHeight: 0.8,
            fontWeight: 400,
          }}
        >
          OR
        </h5>
      </div>

      <Button block disabled={isSigningIn}>
        Sign in with Google
      </Button>
    </form>
  );
}

export default SignInForm;

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
    const response = await auth.signIn({ emailAddress, password });
    if (!response) setIsSigningIn(false);
  };

  const onSignInWithGoogleClicked = async () => {
    setIsSigningIn(true);
    const response = await auth.signInWithGoogle();
    if (!response) setIsSigningIn(false);
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
          placeholder="e.g. joebloggs@hotmail.com"
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
          helpText=""
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
        Sign in with email
      </Button>

      <div
        style={{
          textTransform: 'initial',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        <Link to="/sign-up" style={{ textTransform: 'initial' }}>
          Create an account
        </Link>
        &nbsp;
        <Link to="/forgot-password" style={{ textTransform: 'initial' }}>
          Forgot password?
        </Link>
      </div>

      <div style={{ position: 'relative' }}>
        <hr
          style={{
            margin: '32px 0',
            border: 'none',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        />
        <h5
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            backgroundColor: '#f5f5f5',
            padding: '5px 10px',
            margin: 0,
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          OR
        </h5>
      </div>

      <Button
        type="button"
        block
        onClick={onSignInWithGoogleClicked}
        disabled={isSigningIn}
      >
        Sign in with Google
      </Button>
    </form>
  );
}

export default SignInForm;

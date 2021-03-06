import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../atoms/input';
import Button from '../../atoms/button';

function SignUpForm({ auth }) {
  const [displayName, setDisplayName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onFormSubmit = async event => {
    event.preventDefault();
    setIsSigningUp(true);
    await auth.signUp({ displayName, emailAddress, password });
    setIsSigningUp(false);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      style={{ width: '100%', maxWidth: 325, margin: '0 auto' }}
    >
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="newDisplayName"
          style={{ display: 'block', marginBottom: 8 }}
        >
          Display Name
        </label>
        <Input
          type="text"
          id="newDisplayName"
          name="newDisplayName"
          value={displayName}
          placeholder="e.g. Joebloggs"
          onChange={e => setDisplayName(e.target.value)}
          required
          // pattern="(.*)@(\w{3,})(.\w{2,}){1,}"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="newEmailAddress"
          style={{ display: 'block', marginBottom: 8 }}
        >
          Email Address
        </label>
        <Input
          type="email"
          id="newEmailAddress"
          name="newEmailAddress"
          value={emailAddress}
          placeholder="e.g. joebloggs@hotmail.com"
          onChange={e => setEmailAddress(e.target.value)}
          required
          pattern="(.*)@(\w{3,})(.\w{2,}){1,}"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="newPassword"
          style={{ display: 'block', marginBottom: 8 }}
        >
          New Password
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="newPassword"
          name="newPassword"
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

      <Button type="submit" block primary disabled={isSigningUp}>
        {isSigningUp ? 'Signing up...' : 'Sign up with email'}
      </Button>

      <div
        style={{
          textTransform: 'initial',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        <Link to="/sign-in">I already have an account</Link>
      </div>
    </form>
  );
}

export default SignUpForm;

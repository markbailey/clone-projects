import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInForm from '../../components/widgets/sign-in-form';
import SignUpForm from '../../components/widgets/sign-up-form';

import { ViewWrapper, LogoWrapper } from './styled.components';
import AuthContext from '../../context/auth';

function SignInUpView() {
  const auth = useContext(AuthContext);

  return auth.isGuest ? (
    <ViewWrapper>
      <LogoWrapper>
        <img
          src="/logo192.png"
          alt="logo 192px"
          style={{ marginBottom: 32, width: 64 }}
        />
        <h1 style={{ margin: '0 0 8px', fontWeight: 500 }}>
          Welcome to
          <br />
          Messenger Clone
        </h1>

        <p style={{ textTransform: 'initial' }}>
          Thanks for using messenger.
          <br />
          Lets get you all set up.
        </p>
      </LogoWrapper>

      <Switch>
        <Route
          exact
          path="/sign-in"
          render={props => <SignInForm auth={auth} {...props} />}
        />

        <Route
          exact
          path="/sign-up"
          render={props => <SignUpForm auth={auth} {...props} />}
        />
      </Switch>
    </ViewWrapper>
  ) : (
    <Redirect to="/" />
  );
}

export default SignInUpView;

import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import ChatListView from '../views/chats';
import PeopleView from '../views/people';
import ChatView from '../views/chat';
import SplashView from '../views/splash';
import { SignInUpView, ForgotPasswordView } from '../views/auth';

import AuthorisedRoute from '../components/authorised-route';
import withNavigation from '../components/hoc/withNavigation';

import AuthContext from '../context/auth';
import ChatContext from '../context/chat';
import constants from '../constants';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

function App({ location, navigateTo, goBack }) {
  const auth = useContext(AuthContext);
  const { state: chatState } = useContext(ChatContext);
  const [newChat, setNewChat] = useState(location.pathname.includes('new'));
  const [isLoading, setIsLoading] = useState(true);

  const { messages } = chatState;
  const { breakpoints } = constants;

  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet.max}px)`,
  });

  const Routes = ({ isGuest }) => (
    <>
      <Route
        exact
        path={['/sign-in', '/sign-up']}
        render={props => <SignInUpView {...props} navigateTo={navigateTo} />}
      />

      <Route
        exact
        path="/forgot-password"
        render={props => (
          <ForgotPasswordView {...props} navigateTo={navigateTo} />
        )}
      />

      <AuthorisedRoute
        exact
        path={['/people'].concat(
          !isTabletOrMobile ? ['/people/new', '/people/t/:recipient'] : [],
        )}
        isGuest={isGuest}
        render={props => (
          <PeopleView
            {...props}
            newChat={newChat}
            isTabletOrMobile={isTabletOrMobile}
            onCreateNewMessage={() => setNewChat(true)}
            navigateTo={navigateTo}
            goBack={goBack}
          />
        )}
      />

      <AuthorisedRoute
        exact
        path={['/'].concat(!isTabletOrMobile ? ['/new', '/t/:recipient'] : [])}
        isGuest={isGuest}
        render={props => (
          <ChatListView
            {...props}
            newChat={newChat}
            isTabletOrMobile={isTabletOrMobile}
            onCreateNewMessage={() => setNewChat(true)}
            onCloseNewMessage={() => setNewChat(false)}
            navigateTo={navigateTo}
            goBack={goBack}
          />
        )}
      />

      <AuthorisedRoute
        path={['/new', '/people/new', '/t/:recipient', '/people/t/:recipient']}
        isGuest={isGuest}
        render={props => (
          <ChatView
            {...props}
            isNew={newChat}
            goBack={() => {
              if (newChat) setNewChat(false);
              goBack();
            }}
          />
        )}
      />
    </>
  );

  useEffect(() => {
    if (!auth.isLoading && isLoading) setIsLoading(false);
  }, [auth.isLoading]);

  useEffect(() => {
    if (messages.length > 0 && !isTabletOrMobile && location.pathname === '/')
      navigateTo(`/t/${messages[0].recipient}`);
    // eslint-disable-next-line
  }, [messages]);

  return isLoading ? (
    <SplashView />
  ) : (
    <>
      {/** MOBILE AND TABLET */}
      <MediaQuery maxDeviceWidth={breakpoints.tablet.max}>
        <Switch>
          <Routes isGuest={auth.isGuest} />
        </Switch>
      </MediaQuery>

      {/** LAPTOP AND DESKTOP */}
      <MediaQuery minDeviceWidth={breakpoints.laptop.min}>
        <Routes isGuest={auth.isGuest} />
      </MediaQuery>
    </>
  );
}

App.propTypes = propTypes;
export default withNavigation(App);

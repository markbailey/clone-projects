import React, { useState /*lazy*/ } from 'react';
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

import AuthorisedRoute from '../components/atoms/authorised-route';
import withNavigation from '../components/hoc/withNavigation';

// const { SignInUpView, ForgotPasswordView } = lazy(() =>
//   import('../pages/auth'),
// );
// const ChatListView = lazy(() => import('../pages/chats'));
// const PeopleView = lazy(() => import('../pages/people'));
// const ChatView = lazy(() => import('../pages/chat'));

// import PageNotFound from '../pages/error/404';
import { SignInUpView, SignOutView, ForgotPasswordView } from '../pages/auth';
import ChatListView from '../pages/chats';
import PeopleView from '../pages/people';
import ChatView from '../pages/chat';

const withSwitch = WrappedComponent =>
  function (props) {
    return (
      <Switch>
        <WrappedComponent {...props} />
      </Switch>
    );
  };

const ViewRoutes = withNavigation(
  ({ isGuest, isTabletOrMobile, location, navigateTo, goBack }) => {
    const [newChat, setNewChat] = useState(location.pathname.includes('new'));

    return (
      <>
        <Route exact path={['/sign-in', '/sign-up']} component={SignInUpView} />
        <Route exact path="/sign-out" component={SignOutView} />

        <Route exact path="/forgot-password">
          <ForgotPasswordView navigateTo={navigateTo} />
        </Route>

        <AuthorisedRoute
          exact
          isGuest={isGuest}
          path={['/people'].concat(
            !isTabletOrMobile ? ['/people/new', '/people/t/:recipient'] : [],
          )}
        >
          <PeopleView
            newChat={newChat}
            isTabletOrMobile={isTabletOrMobile}
            onCreateNewMessage={() => setNewChat(true)}
            navigateTo={navigateTo}
            goBack={goBack}
          />
        </AuthorisedRoute>

        <AuthorisedRoute
          exact
          isGuest={isGuest}
          path={['/'].concat(
            !isTabletOrMobile ? ['/new', '/t/:recipient'] : [],
          )}
        >
          <ChatListView
            newChat={newChat}
            isTabletOrMobile={isTabletOrMobile}
            onCreateNewMessage={() => setNewChat(true)}
            onCloseNewMessage={() => setNewChat(false)}
            navigateTo={navigateTo}
            goBack={goBack}
          />
        </AuthorisedRoute>

        <AuthorisedRoute
          isGuest={isGuest}
          path={[
            '/new',
            '/people/new',
            '/t/:recipient',
            '/people/t/:recipient',
          ]}
        >
          <ChatView
            isNew={newChat}
            goBack={() => {
              if (newChat) setNewChat(false);
              goBack();
            }}
          />
        </AuthorisedRoute>

        {/* <Route component={PageNotFound} /> */}
      </>
    );
  },
);

// { isGuest, isTabletOrMobile }
export default function (props) {
  const Routes = props.isTabletOrMobile ? withSwitch(ViewRoutes) : ViewRoutes;
  return <Routes {...props} />;
}

import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { /*MediaQuery,*/ useMediaQuery } from 'react-responsive';

import Logo from '../components/logo';
import Button from '../components/tags/button';
import SplashView from '../views/splash';

import AuthContext from '../context/auth';
import constants from '../constants';

import Routes from './routes';

function App() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const { breakpoints } = constants;
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet.max}px)`,
  });

  useEffect(() => {
    console.log('App:Mounted!');
  }, []);

  useEffect(() => {
    if (!auth.isLoading && isLoading) setIsLoading(false);
  }, [auth.isLoading, isLoading]);

  if (isLoading) return <SplashView />;
  return (
    <>
      {!isTabletOrMobile && !auth.isGuest ? (
        <header
          style={{
            width: '100%',
            height: 60,
            display: 'flex',
            padding: '8px 16px',
            borderBottom: '1px solid rgb(221, 221, 221)',
            boxShadow: '0 0 10px rgba(0,0,0, 0.10)',
          }}
        >
          <Link to="/" style={{ width: 43 }}>
            <Logo style={{ width: 'auto', height: '100%' }} />
          </Link>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div className="dropdown">
              <Button
                iconButton
                icon="arrow_drop_down"
                title="Account"
                style={{ width: 43 }}
                // onClick={goBack}
              />
              <div className="dropdown-content" style={{ right: 0 }}>
                <Link to="/sign-out">Sign Out</Link>
              </div>
            </div>
          </div>
        </header>
      ) : null}
      <div style={{ display: 'flex', flex: 1 }}>
        <Routes isGuest={auth.isGuest} isTabletOrMobile={isTabletOrMobile} />
      </div>
    </>
  );
}

export default App;

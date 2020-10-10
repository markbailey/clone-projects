import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth';

function SignOutView() {
  const auth = useContext(AuthContext);

  const signOut = async () => await auth.signOut();

  useEffect(() => {
    signOut();
  }, []);

  return auth.isGuest ? <Redirect to="/sign-in" /> : null;
}

export default SignOutView;

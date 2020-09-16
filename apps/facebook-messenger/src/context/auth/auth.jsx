import 'firebase/auth';

import React, { createContext, useReducer, useEffect } from 'react';

import {
  auth,
  getCurrentUser,
  createUserProfileDocument,
} from '../../firebase';

const initialState = {
  user: null,
  isLoading: true,
};

const AuthContext = createContext(initialState);

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_UP_START':
    case 'SIGN_IN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'VERIFY_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      return { ...state };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSnapshotFromUserAuth = async (userAuth, additionData) => {
    try {
      const userRef = await createUserProfileDocument(userAuth, additionData);
      const snapshot = await userRef.get();

      const user = { id: snapshot.id, ...snapshot.data() };
      dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
      return user;
    } catch (exception) {
      dispatch({ type: 'SIGN_IN_FAILURE' });
      return null;
    }
  };

  const signIn = async (emailAddress, password) => {
    dispatch({ type: 'SIGN_IN_START' });
    try {
      const { user: userAuth } = await auth.signInWithEmailAndPassword(
        emailAddress,
        password,
      );

      await getSnapshotFromUserAuth(userAuth);
      return true;
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', error });
      return false;
    }
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({ type: 'SIGN_OUT' });
  };

  const signUp = async ({ displayName, email, password }) => {
    dispatch({ type: 'SIGN_UP_START' });
    try {
      const { user: userAuth } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      return await getSnapshotFromUserAuth(userAuth, { displayName });
    } catch (error) {
      dispatch({ type: 'SIGN_UP_FAILURE', error });
      return false;
    }
  };

  const verify = async () => {
    console.log('Verify!');
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        dispatch({ type: 'VERIFY_FAILURE' });
        return;
      }

      return await getSnapshotFromUserAuth(userAuth);
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', error });
      return false;
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isGuest: state.user === null,
        signUp,
        signIn,
        signOut,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

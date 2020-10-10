import 'firebase/auth';

import React, { createContext, useReducer, useEffect } from 'react';

import {
  auth,
  getCurrentUser,
  createUserProfileDocument,
  googleSignInProvider,
} from '../../firebase';

const initialState = {
  user: null,
  isGuest: true,
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
        isGuest: false,
        isLoading: false,
      };
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
    case 'SIGN_OUT_FAILURE':
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
        isGuest: true,
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
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', payload: error });
      return null;
    }
  };

  const signIn = async ({ emailAddress, password }) => {
    dispatch({ type: 'SIGN_IN_START' });
    try {
      console.log(emailAddress, password);
      const { user: userAuth } = await auth.signInWithEmailAndPassword(
        emailAddress,
        password,
      );

      await getSnapshotFromUserAuth(userAuth);
      return true;
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', payload: error });
      return false;
    }
  };

  const signInWithGoogle = async () => {
    dispatch({ type: 'SIGN_IN_START' });
    try {
      const { user: userAuth } = await auth.signInWithPopup(
        googleSignInProvider,
      );

      await getSnapshotFromUserAuth(userAuth);
      return true;
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', payload: error });
      return false;
    }
  };

  const signOut = async () => {
    localStorage.clear();
    return await auth
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGN_OUT' });
        return true;
      })
      .catch(error => {
        dispatch({ type: 'SIGN_OUT_FAILURE', payload: error });
        return false;
      });
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
      dispatch({ type: 'SIGN_UP_FAILURE', payload: error });
      return false;
    }
  };

  const verify = async () => {
    dispatch({ type: 'VERIFY_START' });
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        dispatch({ type: 'VERIFY_FAILURE' });
        return false;
      }

      return await getSnapshotFromUserAuth(userAuth);
    } catch (error) {
      dispatch({ type: 'VERIFY_FAILURE', payload: error });
      return false;
    }
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

import React, { createContext, useReducer, useContext, useEffect } from 'react';

import { firestore } from '../../firebase';

import AuthContext from '../auth';
import actions from './actions';

const initialState = {
  displayName: null,
  dateOfBirth: null,
  isLoading: false,
};

const ProfileContext = createContext(initialState);

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_PROFILE_START:
      return { ...state, isLoading: true };
    case actions.LOAD_PROFILE_SUCCESS:
    case actions.SET_PROFILE:
      return { ...state, ...action.payload };
    case actions.CLEAR_PROFILE:
      return { ...initialState };
    default:
      return { ...state };
  }
}

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);

  // Dispatch Methods
  const updateProfile = profile => {
    const documentRef = firestore.doc(`profiles/${profile.userId}`);
    documentRef.set(profile);
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: actions.LOAD_PROFILE_START });

      firestore
        .collection('profiles')
        .where('userId', '==', user.id)
        .onSnapshot(snapshot => {
          dispatch({
            type: actions.LOAD_PROFILE_SUCCESS,
            payload: snapshot.docs.map(doc => doc.data())[0],
          });
        });
    } else dispatch({ type: actions.CLEAR_PROFILE });
  }, [user]);

  return (
    <ProfileContext.Provider value={{ ...state, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;

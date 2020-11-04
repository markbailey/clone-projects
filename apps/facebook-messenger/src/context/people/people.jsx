import React, { createContext, useReducer, useContext, useEffect } from 'react';

import firebase, { firestore } from '../../firebase';

import AuthContext from '../auth';

const initialState = {
  friendRequests: [],
  contacts: [],
  isLoading: false,
};

const PeopleContext = createContext(initialState);

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FRIEND_REQUESTS':
      return {
        ...state,
        friendRequests: action.payload,
      };
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    case 'CLEAR_CONTACTS':
      return {
        ...state,
        contacts: [],
      };
    default:
      return { ...state };
  }
}

export function PeopleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);

  // Dispatch Methods
  const sendFriendRequest = contactId =>
    firestore.collection('friendRequests').add({
      sentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

  /**
   * FIND PEOPLE
   *
   * DUE to the restrictions of Firestore queries (Not supporting partial field filtering),
   * the size of the users table and this project being a test only.
   * I have the function return all users then filter them instead of using a where clause.
   * I did not wish to add a third aprty search (Paid).
   *
   * @param {*} searchCriteria
   */
  const findPeople = async searchCriteria =>
    searchCriteria
      ? await firestore
          .collection('users')
          .get()
          .then(({ docs }) =>
            docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(
                doc =>
                  doc.id !== user.id && doc.displayName.includes(searchCriteria),
              ),
          )
      : [];

  useEffect(() => {
    if (user) {
      firestore
        .collection('contacts')
        .where('userId', '==', user.id)
        .onSnapshot(snapshot => {
          const contacts = snapshot.docs.map(doc => doc.data());

          dispatch({
            type: 'SET_CONTACTS',
            payload: contacts.filter(contact => contact),
          });
        });

      firestore
        .collection('friendRequests')
        .where('userId', '==', user.id)
        .onSnapshot(snapshot => {
          const requests = snapshot.docs.map(doc => doc.data());
          dispatch({
            type: 'SET_FRIEND_REQUESTS',
            payload: requests,
          });
        });
    } //else dispatch({ type: 'CLEAR_CONTACTS' });
  }, [user]);

  return (
    <PeopleContext.Provider value={{ state, sendFriendRequest, findPeople }}>
      {children}
    </PeopleContext.Provider>
  );
}

export default PeopleContext;

import React, { createContext, useReducer, useEffect } from 'react';

import firebase, { firestore } from '../../firebase';

const initialState = {
  chats: [],
  messages: [],
};

const ChatContext = createContext(initialState);

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: [...action.payload] };
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    default:
      return { ...state };
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { messages } = state;

  // Dispatch Methods
  const sendMessage = message =>
    firestore.collection('messages').add({
      ...message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

  useEffect(() => {
    /** WILL REQUIRE REWORK FOR EFFICIENCY */
    let chats = messages.reduce((acc, message) => {
      const newChat = acc.find(chat => chat.author === message.author) || {
        author: message.author,
        recipient: message.recipient,
        lastMessage: message.text,
        lastMessageTimestamp: message.timestamp,
      };

      return [...acc, newChat];
    }, []);

    dispatch({ type: 'SET_CHATS', payload: chats });
    /** END */
  }, [messages]);

  useEffect(() => {
    firestore
      .collection('messages')
      // .where('')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        dispatch({
          type: 'SET_MESSAGES',
          payload: snapshot.docs.map(doc => doc.data()),
        }),
      );
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;

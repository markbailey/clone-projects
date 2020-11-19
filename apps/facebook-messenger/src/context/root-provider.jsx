import React from 'react';

import { AuthProvider } from './auth';
import { PeopleProvider } from './people';
import { ChatProvider } from './chat';

function RootProvider({ children }) {
  return (
    <AuthProvider>
      <PeopleProvider>
        <ChatProvider>{children}</ChatProvider>
      </PeopleProvider>
    </AuthProvider>
  );
}

export default RootProvider;

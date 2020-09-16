import React from 'react';

import { AuthProvider } from './auth';
import { ProfileProvider } from './profile';
import { PeopleProvider } from './people';
import { ChatProvider } from './chat';

function RootProvider({ children }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PeopleProvider>
          <ChatProvider>{children}</ChatProvider>
        </PeopleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default RootProvider;

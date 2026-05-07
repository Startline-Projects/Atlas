'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SignInState =
  | 'default'
  | '2fa'
  | 'session-confirm'
  | 'lockout'
  | 'routing'
  | 'wrong-password-1'
  | 'wrong-password-2'
  | 'no-account'
  | '2fa-wrong'
  | 'ip-blocked'
  | 'anomaly'
  | 'suspended'
  | 'password-expired';

interface SignInStateContextType {
  currentState: SignInState;
  setCurrentState: (state: SignInState) => void;
}

const SignInStateContext = createContext<SignInStateContextType | undefined>(undefined);

export function SignInStateProvider({ children }: { children: ReactNode }) {
  const [currentState, setCurrentState] = useState<SignInState>('default');

  return (
    <SignInStateContext.Provider value={{ currentState, setCurrentState }}>
      {children}
    </SignInStateContext.Provider>
  );
}

export function useSignInState() {
  const context = useContext(SignInStateContext);
  if (!context) {
    throw new Error('useSignInState must be used within SignInStateProvider');
  }
  return context;
}

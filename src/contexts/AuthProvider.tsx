import { useState } from 'react';
import { AuthContext, type BillingStatus } from './AuthContext';

const MOCK_BILLING: BillingStatus = {
  user: { hasTrialed: false },
  subscription: null,
  tokens: { free: 200, subscription: 0, purchased: 0, total: 200 },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session] = useState(null);
  const [user] = useState(null);
  const [billing] = useState<BillingStatus | null>(MOCK_BILLING);
  const [isLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        session: session as unknown as null,
        user: user as unknown as null,
        billing,
        isLoading,
        signIn: async () => {},
        signUp: async () => {},
        signInWithMagicLink: async () => {},
        verifyOtp: async () => {},
        signOut: async () => {},
        resetPassword: async () => {},
        updatePassword: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

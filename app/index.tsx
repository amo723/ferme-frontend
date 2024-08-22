// app/index.tsx

import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/login'} />;
}


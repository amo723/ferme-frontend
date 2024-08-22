// app/(tabs)/profile.tsx

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { View, Text, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router'

export default function Recolte() {
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Recolte Page</Text>
        <Link href="/typeLoge">Type Loge</Link>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


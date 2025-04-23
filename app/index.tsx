import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import mongoAuthService from '../services/mongoAuth';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from '../constants/theme';

export default function Index() {
  const { user, loading } = useAuth();

  // If still loading auth state, show a loading indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // If user is authenticated, redirect to tabs
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise redirect to login
  return <Redirect href="/login" />;
} 
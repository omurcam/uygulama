import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { 
          backgroundColor: Platform.OS === 'ios' 
            ? Colors[colorScheme ?? 'light'].background
            : undefined 
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Giriş' }} />
      <Stack.Screen name="register" options={{ title: 'Kayıt Ol' }} />
    </Stack>
  );
} 
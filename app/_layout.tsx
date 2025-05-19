import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { isUserLoggedIn } from '@/services/authService';

// Auth durumu için Context oluştur
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}>({
  isAuthenticated: false,
  setAuthenticated: () => {}
});

// Context hook'u
export const useAuth = () => useContext(AuthContext);

// Auth provider bileşeni
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const segments = useSegments();
  const router = useRouter();

  // Kullanıcı oturum durumunu kontrol et
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedIn = await isUserLoggedIn();
        setAuthenticated(isLoggedIn);
      } catch (error) {
        console.error('Auth status check failed:', error);
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Yönlendirme mantığı
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      // Kullanıcı giriş yapmamış ve auth ekranlarında değilse
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Kullanıcı giriş yapmış ve auth ekranlarındaysa
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

import { Redirect } from 'expo-router';
import { useAuth } from './_layout';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  // Kullanıcı giriş yapmışsa ana sayfaya, yapmamışsa giriş sayfasına yönlendir
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/auth/login" />;
} 
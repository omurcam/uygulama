import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { signInUser } from '@/services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen email ve şifre alanlarını doldurunuz.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await signInUser(email, password);
      if (user) {
        // Kullanıcı başarıyla giriş yaptı
        router.replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Giriş Başarısız', 'Email veya şifre hatalı. Lütfen tekrar deneyiniz.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/adaptive-icon.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <ThemedText type="title">Anadolu Wellness</ThemedText>
            <ThemedText type="subtitle">Geleneksel Şifa, Modern Yaklaşım</ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Şifre</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi giriniz"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <ThemedText style={styles.forgotPasswordText}>Şifremi unuttum</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              <ThemedText style={styles.loginButtonText}>
                {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>veya</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => router.push('/auth/register')}
            >
              <ThemedText style={styles.registerButtonText}>Yeni Hesap Oluştur</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.guestButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <ThemedText style={styles.guestButtonText}>Misafir Olarak Devam Et</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#8BC34A',
  },
  loginButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
  dividerText: {
    marginHorizontal: 16,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#8BC34A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#8BC34A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  guestButton: {
    padding: 16,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#999',
  },
}); 
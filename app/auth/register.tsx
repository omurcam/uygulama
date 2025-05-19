import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { registerUser } from '@/services/authService';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // Doğrulama kontrolleri
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerUser(email, password);
      if (user) {
        // Kullanıcı profil bilgilerini kaydet (gerçek uygulamada Firestore'a kaydedilir)
        Alert.alert(
          'Başarılı',
          'Hesabınız başarıyla oluşturuldu.',
          [{ text: 'Tamam', onPress: () => router.replace('/(tabs)') }]
        );
      }
    } catch (error) {
      Alert.alert('Kayıt Hatası', 'Hesap oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
      console.error('Registration error:', error);
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
            <ThemedText type="subtitle">Hesap Oluştur</ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Ad Soyad</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Adınız ve soyadınız"
                placeholderTextColor="#999"
                autoCapitalize="words"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresiniz"
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
                placeholder="En az 6 karakterli şifre"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Şifre Tekrar</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi tekrar giriniz"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              <ThemedText style={styles.registerButtonText}>
                {isLoading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>veya</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.replace('/auth/login')}
            >
              <ThemedText style={styles.loginButtonText}>Zaten Hesabım Var</ThemedText>
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
  registerButton: {
    backgroundColor: '#8BC34A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  registerButtonText: {
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
  loginButton: {
    borderWidth: 1,
    borderColor: '#8BC34A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#8BC34A',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 
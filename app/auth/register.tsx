import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/app/_layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { registerUser } from '@/services/authService';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(50)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  
  // Start animations when component mounts
  useEffect(() => {
    // Parallel animations 
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRegister = async () => {
    // Doğrulama kontrolleri
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      shakeAnimation();
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      shakeAnimation();
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      shakeAnimation();
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerUser(email, password);
      if (user) {
        // Kullanıcı profil bilgilerini kaydet (gerçek uygulamada Firestore'a kaydedilir)
        setAuthenticated(true);
        Alert.alert(
          'Başarılı',
          'Hesabınız başarıyla oluşturuldu.',
          [{ text: 'Tamam', onPress: () => router.replace('/(tabs)') }]
        );
      } else {
        shakeAnimation();
      }
    } catch (error) {
      Alert.alert('Kayıt Hatası', 'Hesap oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
      console.error('Registration error:', error);
      shakeAnimation();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Shake animation for errors
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnimation = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };
  
  // Button press animation
  const animateButtonPress = (pressed: boolean) => {
    Animated.timing(buttonScaleAnim, {
      toValue: pressed ? 0.95 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  
  // Handle input focus
  const handleInputFocus = (input: string, isFocused: boolean) => {
    setInputFocused(prev => ({ ...prev, [input]: isFocused }));
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Decorative elements are temporarily hidden until we have proper images */}
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[
            styles.headerContainer,
            { opacity: fadeAnim, transform: [{ translateY: formAnim }] }
          ]}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/adaptive-icon.png')} 
                style={styles.logo}
                contentFit="contain"
              />
            </View>
            <ThemedText style={styles.title}>Anadolu Wellness</ThemedText>
            <ThemedText style={styles.subtitle}>Hesap Oluştur</ThemedText>
          </Animated.View>

          <Animated.View style={[
            styles.formContainer,
            { 
              opacity: fadeAnim, 
              transform: [
                { translateY: formAnim },
                { translateX: shakeAnim }
              ] 
            }
          ]}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Ad Soyad</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  inputFocused.name && styles.inputFocused
                ]}
                placeholder="Adınız ve soyadınız"
                placeholderTextColor={Colors.light.tabIconDefault}
                autoCapitalize="words"
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => handleInputFocus('name', true)}
                onBlur={() => handleInputFocus('name', false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  inputFocused.email && styles.inputFocused
                ]}
                placeholder="E-posta adresiniz"
                placeholderTextColor={Colors.light.tabIconDefault}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => handleInputFocus('email', true)}
                onBlur={() => handleInputFocus('email', false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Şifre</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  inputFocused.password && styles.inputFocused
                ]}
                placeholder="En az 6 karakterli şifre"
                placeholderTextColor={Colors.light.tabIconDefault}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleInputFocus('password', true)}
                onBlur={() => handleInputFocus('password', false)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Şifre Tekrar</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  inputFocused.confirmPassword && styles.inputFocused
                ]}
                placeholder="Şifrenizi tekrar giriniz"
                placeholderTextColor={Colors.light.tabIconDefault}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => handleInputFocus('confirmPassword', true)}
                onBlur={() => handleInputFocus('confirmPassword', false)}
              />
            </View>

            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
              <TouchableOpacity 
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
                onPress={handleRegister}
                disabled={isLoading}
                onPressIn={() => animateButtonPress(true)}
                onPressOut={() => animateButtonPress(false)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.registerButtonText}>
                  {isLoading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
                </ThemedText>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>veya</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.replace('/auth/login')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.loginButtonText}>Zaten Hesabım Var</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Decorative elements are temporarily hidden until we have proper images */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    backgroundColor: 'rgba(45, 70, 42, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.primary,
    opacity: 0.8,
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
    color: Colors.light.primary,
  },
  input: {
    backgroundColor: 'rgba(209, 196, 167, 0.3)',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.light.primary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    backgroundColor: 'rgba(209, 196, 167, 0.2)',
    borderColor: Colors.light.secondary,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  registerButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  registerButtonDisabled: {
    backgroundColor: 'rgba(186, 79, 53, 0.6)',
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
    backgroundColor: 'rgba(209, 196, 167, 0.5)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.light.primary,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  loginButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 
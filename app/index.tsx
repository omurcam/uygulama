import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from './_layout';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(-50)).current;
  const imageAnim = useRef(new Animated.Value(100)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  
  // If user is already authenticated, redirect to tabs
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);
  
  // Start animations when component mounts
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Title slide down animation
    Animated.timing(titleAnim, {
      toValue: 0,
      duration: 800,
      delay: 300,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();
    
    // Image slide up animation
    Animated.timing(imageAnim, {
      toValue: 0,
      duration: 800,
      delay: 600,
      easing: Easing.out(Easing.back(1)),
      useNativeDriver: true,
    }).start();
    
    // Button fade in animation
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 800,
      delay: 1200,
      useNativeDriver: true,
    }).start();
    
    // Continuous floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);
  
  const floatTransform = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  const handleGetStarted = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      router.push('/auth/login');
    });
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />
      
      {/* Decorative elements are temporarily hidden until we have proper images */}
      
      <Animated.View 
        style={[
          styles.content, 
          { opacity: fadeAnim, transform: [{ translateY: titleAnim }] }
        ]}
      >
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>ANADOLU</ThemedText>
          <ThemedText style={styles.title}>WELLNESS</ThemedText>
        </View>
        
        <ThemedText style={styles.subtitle}>
          Turkish Herbal Remedies{'\n'}& Wellness
        </ThemedText>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.imageContainer, 
          { 
            opacity: fadeAnim,
            transform: [
              { translateY: imageAnim },
              { translateY: floatTransform }
            ] 
          }
        ]}
      >
        {/* Tea cup placeholder */}
        <View style={styles.teaContainer}>
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={styles.teaCup}
            contentFit="contain"
          />
        </View>
      </Animated.View>
      
      <Animated.View style={{ 
        opacity: buttonAnim,
        transform: [{ scale: buttonAnim }]
      }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleGetStarted}
          activeOpacity={0.9}
        >
          <ThemedText style={styles.buttonText}>Get Started</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D3', // Beige/cream background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D462A', // Dark green color
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#2D462A', // Dark green color
    marginTop: 24,
    lineHeight: 30,
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  teaCup: {
    width: 240,
    height: 240,
    zIndex: 1,
  },
  ginger: {
    width: 120,
    height: 100,
    position: 'absolute',
    top: -30,
    right: 40,
    zIndex: 2,
  },
  topLeftHerb: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 100,
    height: 100,
  },
  topRightHerb: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 100,
  },
  bottomLeftHerb: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    width: 80,
    height: 80,
  },
  bottomRightHerb: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 80,
    height: 80,
  },
  button: {
    backgroundColor: '#BA4F35', // Rust/orange color
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 48,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
}); 
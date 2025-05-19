import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
} from 'firebase/auth';
import { Alert } from 'react-native';

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register a new user
export const registerUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || 'Registration failed';
    Alert.alert('Registration Error', errorMessage);
    return null;
  }
};

// Sign in existing user
export const signInUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || 'Sign in failed';
    Alert.alert('Sign In Error', errorMessage);
    return null;
  }
};

// Sign out current user
export const signOutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    const errorMessage = error.message || 'Sign out failed';
    Alert.alert('Sign Out Error', errorMessage);
    return false;
  }
};

// Observer for auth state changes
export const subscribeToAuthChanges = (onAuthChange: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    onAuthChange(user);
  });
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// User persistence helper
export const isUserLoggedIn = (): boolean => {
  return auth.currentUser !== null;
}; 
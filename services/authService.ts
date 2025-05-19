import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Kullanıcı veri anahtar sabitleri
const USER_STORAGE_KEY = 'anadolu_wellness_users';
const CURRENT_USER_KEY = 'anadolu_wellness_current_user';

// Dummy başlangıç kullanıcıları (test amaçlı)
const initialUsers = [
  { email: 'test@test.com', password: 'test123' }
];

// Kullanıcıları AsyncStorage'dan almak için yardımcı fonksiyon
const getUsers = async (): Promise<{ email: string; password: string }[]> => {
  try {
    const usersJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (usersJson) {
      return JSON.parse(usersJson);
    }
    // İlk çalıştırmada varsayılan kullanıcıları kaydet
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  } catch (error) {
    console.error('Kullanıcı verileri alınamadı:', error);
    return initialUsers;
  }
};

// Kullanıcıları AsyncStorage'a kaydetmek için yardımcı fonksiyon
const saveUsers = async (users: { email: string; password: string }[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Kullanıcı verileri kaydedilemedi:', error);
  }
};

// Mevcut kullanıcıyı AsyncStorage'dan almak için yardımcı fonksiyon
const loadCurrentUser = async (): Promise<{ email: string } | null> => {
  try {
    const currentUserJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (currentUserJson) {
      return JSON.parse(currentUserJson);
    }
    return null;
  } catch (error) {
    console.error('Mevcut kullanıcı verileri alınamadı:', error);
    return null;
  }
};

// Kullanıcı kayıt fonksiyonu
export const registerUser = async (email: string, password: string): Promise<any> => {
  try {
    // Kullanıcıları al
    const users = await getUsers();
    
    // Kullanıcı zaten var mı kontrol et
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      Alert.alert('Hata', 'Bu email adresi zaten kullanılıyor.');
      return null;
    }
    
    // Yeni kullanıcı ekle
    const newUser = { email, password };
    users.push(newUser);
    
    // Kullanıcıları kaydet
    await saveUsers(users);
    
    // Kullanıcıyı giriş yapmış olarak ayarla
    const currentUser = { email };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    
    // Kullanıcı bilgilerini döndür
    return currentUser;
  } catch (error) {
    console.error('Kayıt hatası:', error);
    Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
    return null;
  }
};

// Kullanıcı giriş fonksiyonu
export const signInUser = async (email: string, password: string): Promise<any> => {
  try {
    // Kullanıcıları al
    const users = await getUsers();
    
    // Kullanıcıyı kontrol et
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Kullanıcıyı giriş yapmış olarak ayarla
      const currentUser = { email: user.email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      return currentUser;
    } else {
      Alert.alert('Giriş Hatası', 'Email veya şifre hatalı.');
      return null;
    }
  } catch (error) {
    console.error('Giriş hatası:', error);
    Alert.alert('Hata', 'Giriş sırasında bir hata oluştu.');
    return null;
  }
};

// Çıkış yapma fonksiyonu
export const signOutUser = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return false;
  }
};

// Kullanıcının giriş yapmış olup olmadığını kontrol et
export const isUserLoggedIn = async (): Promise<boolean> => {
  const currentUser = await loadCurrentUser();
  return currentUser !== null;
};

// Kullanıcı bilgilerini al
export const getCurrentUser = async (): Promise<any> => {
  return await loadCurrentUser();
}; 
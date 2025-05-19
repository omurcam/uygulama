import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { signOutUser } from '@/services/authService';

// Sample user profile data
const USER_PROFILE = {
  name: 'Ayşe Yılmaz',
  email: 'ayse.yilmaz@gmail.com',
  location: 'Berlin, Germany',
  memberSince: 'September 2023',
  subscription: 'Free',
  preferences: {
    notifications: true,
    darkMode: false,
    language: 'Turkish',
  },
  healthInfo: {
    concerns: ['Seasonal allergies', 'Stress management'],
    favorites: ['Ihlamur (Linden)', 'Papatya (Chamomile)'],
  }
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [profile, setProfile] = useState(USER_PROFILE);
  const router = useRouter();
  
  // Toggle notification settings
  const toggleNotifications = () => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      }
    }));
  };
  
  // Handle subscription upgrade
  const handleUpgradePress = () => {
    router.push('/premium');
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOutUser();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Çıkış Hatası', 'Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title">Profilim</ThemedText>
        </View>
        
        {/* Profile Header */}
        <ThemedView style={styles.profileHeaderCard}>
          <View style={styles.profileAvatar}>
            <ThemedText style={styles.avatarText}>{profile.name.charAt(0)}</ThemedText>
          </View>
          
          <View style={styles.profileInfo}>
            <ThemedText type="title">{profile.name}</ThemedText>
            <ThemedText>{profile.email}</ThemedText>
            <View style={styles.locationRow}>
              <IconSymbol name="location.fill" size={14} color="#8BC34A" />
              <ThemedText style={styles.locationText}>{profile.location}</ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <IconSymbol name="pencil" size={20} color="#8BC34A" />
          </TouchableOpacity>
        </ThemedView>
        
        {/* Subscription */}
        <ThemedView style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <View>
              <ThemedText type="defaultSemiBold">Mevcut Plan</ThemedText>
              <ThemedText type="title" style={styles.planTitle}>{profile.subscription}</ThemedText>
            </View>
            {profile.subscription === 'Free' && (
              <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={handleUpgradePress}
              >
                <ThemedText style={styles.upgradeButtonText}>Yükselt</ThemedText>
              </TouchableOpacity>
            )}
          </View>
          
          {profile.subscription === 'Free' && (
            <View style={styles.premiumFeatures}>
              <ThemedText type="defaultSemiBold">Premium Özellikler</ThemedText>
              <View style={styles.featureRow}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#8BC34A" />
                <ThemedText style={styles.featureText}>Tüm şifalı bitki veritabanı (150+ bitki)</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#8BC34A" />
                <ThemedText style={styles.featureText}>Kişiselleştirilmiş sağlık planları</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#8BC34A" />
                <ThemedText style={styles.featureText}>Reklamsız deneyim</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#8BC34A" />
                <ThemedText style={styles.featureText}>Video eğitimleri ve rehberler</ThemedText>
              </View>
            </View>
          )}
        </ThemedView>
        
        {/* Health Information */}
        <ThemedView style={styles.sectionCard}>
          <ThemedText type="subtitle">Sağlık Bilgileri</ThemedText>
          
          <View style={styles.healthSection}>
            <ThemedText type="defaultSemiBold">Sağlık Sorunları</ThemedText>
            <View style={styles.tagsContainer}>
              {profile.healthInfo.concerns.map((concern, index) => (
                <View key={index} style={styles.tag}>
                  <ThemedText style={styles.tagText}>{concern}</ThemedText>
                </View>
              ))}
              <TouchableOpacity style={styles.addTag}>
                <IconSymbol name="plus" size={14} color="#8BC34A" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.healthSection}>
            <ThemedText type="defaultSemiBold">Favori Bitkiler</ThemedText>
            <View style={styles.tagsContainer}>
              {profile.healthInfo.favorites.map((herb, index) => (
                <View key={index} style={styles.tag}>
                  <ThemedText style={styles.tagText}>{herb}</ThemedText>
                </View>
              ))}
              <TouchableOpacity style={styles.addTag}>
                <IconSymbol name="plus" size={14} color="#8BC34A" />
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
        
        {/* Settings */}
        <ThemedView style={styles.sectionCard}>
          <ThemedText type="subtitle">Ayarlar</ThemedText>
          
          <View style={styles.settingRow}>
            <View>
              <ThemedText type="defaultSemiBold">Bildirimler</ThemedText>
              <ThemedText>Sağlık hatırlatıcılarını al</ThemedText>
            </View>
            <Switch
              value={profile.preferences.notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#767577', true: '#8BC34A' }}
              thumbColor={profile.preferences.notifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingButton}>
            <View>
              <ThemedText type="defaultSemiBold">Dil</ThemedText>
              <ThemedText>{profile.preferences.language}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingButton}>
            <ThemedText type="defaultSemiBold">Gizlilik Politikası</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingButton}>
            <ThemedText type="defaultSemiBold">Kullanım Şartları</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
          </TouchableOpacity>
        </ThemedView>
        
        {/* Logout */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <ThemedText style={styles.logoutText}>Çıkış Yap</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  profileHeaderCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    opacity: 0.7,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    color: '#8BC34A',
  },
  upgradeButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  premiumFeatures: {
    backgroundColor: 'rgba(139, 195, 74, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  featureText: {
    marginLeft: 8,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  healthSection: {
    marginTop: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
  },
  addTag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8BC34A',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(200, 200, 200, 0.3)',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 40,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
}); 
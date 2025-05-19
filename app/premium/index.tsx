import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PremiumScreen() {
  const colorScheme = useColorScheme();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const plans = {
    monthly: {
      price: '29.99',
      duration: 'ay',
      discount: null,
      billingText: 'Her ay otomatik yenilenir',
      saveText: '',
    },
    annual: {
      price: '199.99',
      duration: 'yıl',
      discount: '45%',
      billingText: 'Her yıl otomatik yenilenir',
      saveText: '4 ay bedava',
    }
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    // Burada gerçek uygulamada ödeme işlemi yapılır
    try {
      setTimeout(() => {
        Alert.alert(
          'Abonelik Başarılı',
          'Anadolu Wellness Premium özelliklerine erişim kazandınız. Teşekkür ederiz!',
          [{ text: 'Tamam', onPress: () => router.back() }]
        );
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert('Hata', 'İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Premium Başlık */}
          <View style={styles.premiumHeader}>
            <Image 
              source={require('@/assets/images/adaptive-icon.png')} 
              style={styles.icon} 
              resizeMode="contain"
            />
            <ThemedText type="title" style={styles.premiumTitle}>Anadolu Wellness Premium</ThemedText>
            <ThemedText style={styles.premiumSubtitle}>
              Geleneksel şifa yöntemlerinin tüm bilgisine erişin
            </ThemedText>
          </View>

          {/* Özellikler */}
          <View style={styles.featuresContainer}>
            <Feature 
              icon="leaf.fill" 
              title="150+ Şifalı Bitki" 
              description="Tüm şifalı bitkilere ve hazırlama talimatlarına erişim"
            />
            <Feature 
              icon="waveform.path.ecg" 
              title="Kişiselleştirilmiş Planlar" 
              description="Size özel şifalı bitki önerileri ve takip planları"
            />
            <Feature 
              icon="film.fill" 
              title="Video Eğitimleri" 
              description="Profesyonel eğitim videoları ve şifalı bitki hazırlama rehberleri"
            />
            <Feature 
              icon="xmark.octagon.fill" 
              title="Reklamsız Deneyim" 
              description="Reklamsız, kesintisiz kullanıcı deneyimi"
            />
          </View>

          {/* Abonelik Planları */}
          <View style={styles.plansContainer}>
            <ThemedText type="subtitle" style={styles.plansTitle}>Abonelik Planınızı Seçin</ThemedText>
            
            <View style={styles.plansSelector}>
              <TouchableOpacity 
                style={[
                  styles.planOption, 
                  selectedPlan === 'monthly' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <ThemedText style={selectedPlan === 'monthly' ? styles.selectedPlanText : styles.planText}>
                  Aylık
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.planOption, 
                  selectedPlan === 'annual' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('annual')}
              >
                <ThemedText style={selectedPlan === 'annual' ? styles.selectedPlanText : styles.planText}>
                  Yıllık
                </ThemedText>
                {selectedPlan === 'annual' && (
                  <View style={styles.discountBadge}>
                    <ThemedText style={styles.discountText}>%45</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.selectedPlanInfo}>
              <View style={styles.priceInfo}>
                <ThemedText style={styles.currencySymbol}>₺</ThemedText>
                <ThemedText style={styles.price}>{plans[selectedPlan].price}</ThemedText>
                <ThemedText style={styles.duration}>/{plans[selectedPlan].duration}</ThemedText>
              </View>
              {plans[selectedPlan].saveText && (
                <ThemedText style={styles.saveText}>{plans[selectedPlan].saveText}</ThemedText>
              )}
              <ThemedText style={styles.billingText}>{plans[selectedPlan].billingText}</ThemedText>
            </View>
          </View>

          {/* Abonelik Butonu */}
          <TouchableOpacity 
            style={[styles.subscribeButton, isLoading && styles.subscribeButtonDisabled]} 
            onPress={handleSubscribe}
            disabled={isLoading}
          >
            <ThemedText style={styles.subscribeButtonText}>
              {isLoading ? 'İşleniyor...' : 'Şimdi Abone Ol'}
            </ThemedText>
          </TouchableOpacity>
          
          {/* Yasal Uyarılar */}
          <ThemedText style={styles.legalText}>
            Aboneliğiniz seçtiğiniz plan süresince otomatik olarak yenilenir. 
            İstediğiniz zaman hesabınızın ayarlar bölümünden iptal edebilirsiniz.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Özellik bileşeni
function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconContainer}>
        <IconSymbol name={icon} size={24} color="#8BC34A" />
      </View>
      <View style={styles.featureTextContainer}>
        <ThemedText style={styles.featureTitle}>{title}</ThemedText>
        <ThemedText style={styles.featureDescription}>{description}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08711B',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  premiumHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#08711B',
  },
  premiumSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    maxWidth: '80%',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  plansContainer: {
    marginBottom: 32,
  },
  plansTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  plansSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  planOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedPlan: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  planText: {
    fontSize: 16,
    color: '#666',
  },
  selectedPlanText: {
    fontSize: 16,
    color: '#08711B',
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF5722',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedPlanInfo: {
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#08711B',
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#08711B',
  },
  duration: {
    fontSize: 16,
    marginTop: 12,
    color: '#666',
  },
  saveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 6,
  },
  billingText: {
    fontSize: 14,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#08711B',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  subscribeButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  legalText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
}); 
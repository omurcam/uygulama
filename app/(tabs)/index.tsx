import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  // Example featured herbs for the home screen
  const featuredHerbs = [
    { id: 1, name: 'Ihlamur (Linden)', benefit: 'Soothes colds and coughs' },
    { id: 2, name: 'Adaçayı (Sage)', benefit: 'Supports throat health' },
    { id: 3, name: 'Zencefil (Ginger)', benefit: 'Aids digestion and immunity' },
  ];

  // Example wellness tips
  const wellnessTips = [
    { id: 1, title: 'Daily Herb Tea Ritual', content: 'Start your morning with warm herbal tea' },
    { id: 2, title: 'Traditional Inhalation', content: 'Breathe in steam with eucalyptus for clear sinuses' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8BC34A', dark: '#345018' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Anadolu Wellness</ThemedText>
        <ThemedText type="subtitle">Traditional Turkish Herbal Remedies</ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Featured Herbs</ThemedText>
          <Link href="/herbs" asChild>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
        
        {featuredHerbs.map((herb) => (
          <Link key={herb.id} href={`/herbs/${herb.id}`} asChild>
            <TouchableOpacity>
              <ThemedView style={styles.herbCard}>
                <View style={styles.herbIconContainer}>
                  <IconSymbol name="leaf.fill" size={24} color="#8BC34A" />
                </View>
                <View style={styles.herbInfo}>
                  <ThemedText type="defaultSemiBold">{herb.name}</ThemedText>
                  <ThemedText>{herb.benefit}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
              </ThemedView>
            </TouchableOpacity>
          </Link>
        ))}
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Wellness Tips</ThemedText>
        </View>
        
        {wellnessTips.map((tip) => (
          <ThemedView key={tip.id} style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <IconSymbol name="lightbulb.fill" size={24} color="#FFC107" />
            </View>
            <View style={styles.tipInfo}>
              <ThemedText type="defaultSemiBold">{tip.title}</ThemedText>
              <ThemedText>{tip.content}</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.subscriptionCard}>
        <ThemedText type="subtitle">Unlock Premium Features</ThemedText>
        <ThemedText>Get access to our full herb database, personalized plans, and exclusive videos.</ThemedText>
        <TouchableOpacity style={styles.subscribeButton}>
          <ThemedText style={styles.subscribeButtonText}>Subscribe Now</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  logo: {
    height: 178,
    width: 290,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  sectionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seeAllText: {
    color: '#8BC34A',
  },
  herbCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  herbIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  herbInfo: {
    flex: 1,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipInfo: {
    flex: 1,
  },
  subscriptionCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    marginBottom: 24,
    alignItems: 'center',
    gap: 12,
  },
  subscribeButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 8,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

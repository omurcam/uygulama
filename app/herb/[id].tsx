import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Detailed herb data (in a real app, this would come from an API or database)
const DETAILED_HERBS = {
  '1': {
    id: '1',
    name: 'Ihlamur (Linden)',
    scientificName: 'Tilia cordata',
    category: 'Relaxation',
    description: 'Ihlamur (Linden) is a traditional Turkish herbal tea made from the dried flowers of the linden tree. It has been used for centuries in Anatolian folk medicine for its calming and healing properties.',
    benefits: [
      'Soothes colds, coughs, and sore throats',
      'Relieves nasal congestion',
      'Reduces fever',
      'Promotes relaxation and sleep',
      'Has antioxidant properties'
    ],
    preparation: 'Pour boiling water over 1-2 teaspoons of dried linden flowers. Cover and steep for 5-10 minutes. Strain and drink while warm. May add honey for sweetness.',
    dosage: 'Drink 2-3 cups daily for symptoms of cold or flu. For relaxation, drink 1 cup in the evening.',
    precautions: 'Generally safe for most people. Pregnant women, nursing mothers, and those with heart conditions should consult a healthcare provider before use. May cause drowsiness.',
    isFavorite: true,
    history: 'Linden tea has been used in Turkey since Ottoman times. It remains a staple remedy in Turkish households, especially during winter months.',
  },
  '2': {
    id: '2',
    name: 'Adaçayı (Sage)',
    scientificName: 'Salvia officinalis',
    category: 'Digestive',
    description: 'Adaçayı, or sage, is a fragrant herb with grayish-green leaves that has been used in Turkish traditional medicine for its healing properties, particularly for throat and digestive issues.',
    benefits: [
      'Relieves sore throat and cough',
      'Aids digestion',
      'Helps reduce excessive sweating',
      'Has anti-inflammatory properties',
      'Supports oral health'
    ],
    preparation: 'Pour boiling water over 1 teaspoon of dried sage leaves. Cover and steep for 5 minutes. Strain and drink. Can be used as a gargle for sore throat.',
    dosage: 'Drink 1-2 cups daily. For sore throat, gargle with sage tea 2-3 times daily.',
    precautions: 'Not recommended during pregnancy. May interact with certain medications including diabetes medication and anticonvulsants. Consult healthcare provider if on medication.',
    isFavorite: false,
    history: 'Sage has been used in Anatolia since ancient times. Its name "adaçayı" literally means "island tea" in Turkish, referring to its origin from Mediterranean islands.',
  },
};

const HerbDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  const herbId = Array.isArray(id) ? id[0] : id;
  const herb = DETAILED_HERBS[herbId];
  
  const [isFavorite, setIsFavorite] = useState(herb?.isFavorite || false);
  
  if (!herb) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.notFound}>
          <IconSymbol name="exclamationmark.triangle" size={50} color="#F44336" />
          <ThemedText type="title">Herb Not Found</ThemedText>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header with back button and favorite */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonHeader}>
          <IconSymbol name="chevron.left" size={28} color={Colors[colorScheme].text} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <IconSymbol 
            name={isFavorite ? "heart.fill" : "heart"} 
            size={28} 
            color={isFavorite ? "#E57373" : Colors[colorScheme].text} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Herb Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.herbImagePlaceholder}>
            <IconSymbol name="leaf.fill" size={80} color="#8BC34A" />
          </View>
        </View>
        
        {/* Herb Name and Category */}
        <View style={styles.titleContainer}>
          <ThemedText type="title">{herb.name}</ThemedText>
          <View style={styles.scientificContainer}>
            <ThemedText style={styles.scientificName}>{herb.scientificName}</ThemedText>
          </View>
          <View style={styles.categoryContainer}>
            <ThemedText style={styles.categoryText}>{herb.category}</ThemedText>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Description</ThemedText>
          <ThemedText style={styles.descriptionText}>{herb.description}</ThemedText>
        </View>
        
        {/* Benefits */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Health Benefits</ThemedText>
          {herb.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#8BC34A" style={styles.benefitIcon} />
              <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
            </View>
          ))}
        </View>
        
        {/* Preparation */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Preparation</ThemedText>
          <ThemedText style={styles.descriptionText}>{herb.preparation}</ThemedText>
        </View>
        
        {/* Dosage */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Recommended Dosage</ThemedText>
          <ThemedText style={styles.descriptionText}>{herb.dosage}</ThemedText>
        </View>
        
        {/* Precautions */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Precautions</ThemedText>
          <ThemedView style={styles.precautionsBox}>
            <IconSymbol name="exclamationmark.triangle" size={24} color="#FFC107" style={styles.warningIcon} />
            <ThemedText style={styles.precautionsText}>{herb.precautions}</ThemedText>
          </ThemedView>
        </View>
        
        {/* Historical Use */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Historical Use</ThemedText>
          <ThemedText style={styles.descriptionText}>{herb.history}</ThemedText>
        </View>
        
        {/* Related Herbs - In a real app, this would show related herbs */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Related Herbs</ThemedText>
          <ThemedText style={styles.emptyRelated}>No related herbs found for this item.</ThemedText>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.trackButton}>
            <ThemedText style={styles.trackButtonText}>Add to Daily Tracker</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  backButtonHeader: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  herbImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scientificContainer: {
    marginTop: 8,
  },
  scientificName: {
    fontStyle: 'italic',
    opacity: 0.7,
  },
  categoryContainer: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
  },
  categoryText: {
    color: '#689F38',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  descriptionText: {
    marginTop: 8,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  benefitIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
  },
  precautionsBox: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  precautionsText: {
    flex: 1,
    lineHeight: 22,
  },
  emptyRelated: {
    marginTop: 8,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  footer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  trackButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#8BC34A',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HerbDetailScreen; 
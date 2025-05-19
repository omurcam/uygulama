import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Sample herb data - in a real app, this would come from a database
const HERBS_DATA = [
  {
    id: '1',
    name: 'Ihlamur (Linden)',
    category: 'Relaxation',
    benefits: 'Soothes colds, fever and coughs',
    imageUrl: 'ihlamur.jpg'
  },
  {
    id: '2',
    name: 'Adaçayı (Sage)',
    category: 'Digestive',
    benefits: 'Supports throat health and digestion',
    imageUrl: 'adacayi.jpg'
  },
  {
    id: '3',
    name: 'Nane (Mint)',
    category: 'Digestive',
    benefits: 'Relieves digestive issues and refreshes breath',
    imageUrl: 'nane.jpg'
  },
  {
    id: '4',
    name: 'Papatya (Chamomile)',
    category: 'Relaxation',
    benefits: 'Calms nerves, aids sleep, soothes stomach',
    imageUrl: 'papatya.jpg'
  },
  {
    id: '5',
    name: 'Zencefil (Ginger)',
    category: 'Immunity',
    benefits: 'Supports immune system, aids digestion',
    imageUrl: 'zencefil.jpg'
  },
  {
    id: '6',
    name: 'Kuşburnu (Rosehip)',
    category: 'Immunity',
    benefits: 'Rich in vitamin C, supports immunity',
    imageUrl: 'kusburnu.jpg'
  },
];

// Categories for filtering
const CATEGORIES = [
  { id: 'all', name: 'All Herbs' },
  { id: 'Relaxation', name: 'Relaxation' },
  { id: 'Digestive', name: 'Digestive' },
  { id: 'Immunity', name: 'Immunity' },
];

export default function HerbsScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter herbs based on search query and category
  const filteredHerbs = HERBS_DATA.filter(herb => {
    const matchesSearch = herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         herb.benefits.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || herb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render each herb item
  const renderHerbItem = ({ item }) => (
    <Link href={`/herb/${item.id}`} asChild>
      <TouchableOpacity>
        <ThemedView style={styles.herbCard}>
          <View style={styles.herbIconContainer}>
            <IconSymbol name="leaf.fill" size={24} color="#8BC34A" />
          </View>
          <View style={styles.herbInfo}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText style={styles.categoryLabel}>{item.category}</ThemedText>
            <ThemedText numberOfLines={2}>{item.benefits}</ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <ThemedText type="title">Herbal Library</ThemedText>
        <ThemedText type="subtitle">Discover traditional Turkish herbs</ThemedText>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color={Colors[colorScheme].text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme].text }]}
          placeholder="Search herbs by name or benefit..."
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <IconSymbol name="xmark.circle.fill" size={20} color={Colors[colorScheme].text} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <ThemedText
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item.id && styles.selectedCategoryText
                ]}
              >
                {item.name}
              </ThemedText>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {/* Herbs List */}
      <FlatList
        data={filteredHerbs}
        renderItem={renderHerbItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.herbsList}
        ListEmptyComponent={
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" size={50} color="#8BC34A" />
            <ThemedText type="subtitle">No herbs found</ThemedText>
            <ThemedText>Try a different search term or category</ThemedText>
          </ThemedView>
        }
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
  },
  selectedCategoryButton: {
    backgroundColor: '#8BC34A',
  },
  categoryButtonText: {
    fontSize: 14,
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  herbsList: {
    paddingBottom: 16,
  },
  herbCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  herbIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  herbInfo: {
    flex: 1,
    gap: 4,
  },
  categoryLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
}); 
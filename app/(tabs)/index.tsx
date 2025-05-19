import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Ana bitki kategorileri, daha sadeleştirilmiş
const HERB_CATEGORIES = [
  {
    id: '1',
    name: 'Rahatlatıcılar',
    icon: <MaterialCommunityIcons name="flower" size={28} color={Colors.light.primary} />,
  },
  {
    id: '2',
    name: 'Sindirim',
    icon: <MaterialCommunityIcons name="stomach" size={28} color={Colors.light.primary} />,
  },
  {
    id: '3',
    name: 'Bağışıklık',
    icon: <MaterialCommunityIcons name="shield" size={28} color={Colors.light.primary} />,
  },
  {
    id: '4',
    name: 'Solunum',
    icon: <MaterialCommunityIcons name="lungs" size={28} color={Colors.light.primary} />,
  },
  {
    id: '5',
    name: 'Enerji',
    icon: <MaterialCommunityIcons name="flash" size={28} color={Colors.light.primary} />,
  },
];

// Popüler bitkiler
const POPULAR_HERBS = [
  {
    id: '1',
    name: 'Ihlamur',
    icon: <MaterialCommunityIcons name="flower-tulip" size={24} color={Colors.light.primary} />,
  },
  {
    id: '2',
    name: 'Adaçayı',
    icon: <MaterialCommunityIcons name="leaf" size={24} color={Colors.light.primary} />,
  },
  {
    id: '3',
    name: 'Papatya',
    icon: <MaterialCommunityIcons name="flower" size={24} color={Colors.light.primary} />,
  },
  {
    id: '4',
    name: 'Zencefil',
    icon: <MaterialCommunityIcons name="food-apple" size={24} color={Colors.light.primary} />,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = React.useState('');

  const handleSearch = () => {
    if (search.trim()) {
      router.push({ pathname: '/herbs', params: { q: search } });
    }
  };

  const handleCategoryPress = (id: string) => {
    router.push({ pathname: '/herbs', params: { category: id } });
  };

  const handleHerbPress = (id: string) => {
    router.push(`/herb/${id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Kategoriler - Yatay Scroll */}
        <View style={styles.sectionHeaderRow}>
          <ThemedText style={styles.sectionTitle}>Kategoriler</ThemedText>
        </View>
        <FlatList
          data={HERB_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIcon}>{item.icon}</View>
              <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
        />

        {/* Popüler Bitkiler */}
        <View style={styles.sectionHeaderRow}>
          <ThemedText style={styles.sectionTitle}>Popüler Bitkiler</ThemedText>
        </View>
        <View style={styles.popularHerbsRow}>
          {POPULAR_HERBS.map((herb) => (
            <TouchableOpacity
              key={herb.id}
              style={styles.popularHerbCard}
              onPress={() => handleHerbPress(herb.id)}
              activeOpacity={0.8}
            >
              <View style={styles.popularHerbIcon}>{herb.icon}</View>
              <ThemedText style={styles.popularHerbName}>{herb.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Alt kısımda uygulama adı ve arama çubuğu */}
      <View style={styles.bottomArea}>
        <ThemedText style={styles.bigTitle}>Anadolu Wellness</ThemedText>
        <ThemedText style={styles.subtitle}>Bitkisel sağlık, modern yaşam.</ThemedText>
        <View style={styles.searchBarWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.light.primary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Bitki veya kategori ara..."
              placeholderTextColor={Colors.light.primary + '99'}
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A6E8E',
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 0,
  },
  bigTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  searchBarWrap: {
    alignItems: 'center',
    marginBottom: 0,
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 44,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.light.primary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  categoriesList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 90,
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
    textAlign: 'center',
  },
  popularHerbsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  popularHerbCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: 72,
    marginHorizontal: 6,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  popularHerbIcon: {
    marginBottom: 4,
  },
  popularHerbName: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomArea: {
    width: '100%',
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: 'rgba(26,110,142,0.95)',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Post type tanımı
interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  userLiked: boolean;
}

// Sample forum posts
const FORUM_POSTS: Post[] = [
  {
    id: '1',
    author: 'AyşeH',
    title: 'Ihlamur tea preparation tips',
    content: "I've found that steeping linden flowers for exactly 7 minutes gives the perfect flavor and benefits. What's your preferred method?",
    likes: 24,
    comments: 8,
    time: '2 hours ago',
    userLiked: false,
  },
  {
    id: '2',
    author: 'MehmetK',
    title: 'Sage for sore throat - amazing results',
    content: "I've been using sage gargle for my sore throat as my grandmother taught me, and it works better than anything from the pharmacy!",
    likes: 36,
    comments: 15,
    time: '5 hours ago',
    userLiked: true,
  },
  {
    id: '3',
    author: 'ZeynepT',
    title: 'Mixing herbs - safe combinations?',
    content: "I'm wondering which traditional herbs can be safely mixed together for maximum benefit? Anyone have experience with this?",
    likes: 12,
    comments: 20,
    time: '1 day ago',
    userLiked: false,
  },
  {
    id: '4',
    author: 'OzanB',
    title: 'Rosehip tea recipe from my village',
    content: 'In my village near Kars, we make rosehip tea with a special technique. First, we crush the dried rosehips slightly to release more flavor...',
    likes: 57,
    comments: 23,
    time: '2 days ago',
    userLiked: false,
  },
];

// Forum categories
const CATEGORIES = [
  { id: 'all', name: 'All Posts' },
  { id: 'recipes', name: 'Recipes' },
  { id: 'questions', name: 'Questions' },
  { id: 'success', name: 'Success Stories' },
];

export default function ForumScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(FORUM_POSTS);

  // Toggle like for a post
  const toggleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.userLiked ? post.likes - 1 : post.likes + 1,
            userLiked: !post.userLiked
          };
        }
        return post;
      })
    );
  };

  // Filter posts (in a real app would include category filtering)
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each forum post
  const renderPost = ({ item }: { item: Post }) => (
    <ThemedView style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <ThemedText style={styles.avatarText}>{item.author.charAt(0)}</ThemedText>
          </View>
          <ThemedText type="defaultSemiBold">{item.author}</ThemedText>
        </View>
        <ThemedText style={styles.timeText}>{item.time}</ThemedText>
      </View>
      
      <ThemedText type="defaultSemiBold" style={styles.postTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.postContent}>{item.content}</ThemedText>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => toggleLike(item.id)}
        >
          <IconSymbol 
            name={item.userLiked ? "heart.fill" : "heart"} 
            size={22} 
            color={item.userLiked ? "#E57373" : Colors[colorScheme ?? 'light'].text} 
          />
          <ThemedText style={styles.actionText}>{item.likes}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="bubble.right" size={22} color={Colors[colorScheme ?? 'light'].text} />
          <ThemedText style={styles.actionText}>{item.comments}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="arrow.uturn.right" size={22} color={Colors[colorScheme ?? 'light'].text} />
          <ThemedText style={styles.actionText}>Share</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <ThemedText type="title">Community Forum</ThemedText>
        <ThemedText type="subtitle">Connect with other wellness enthusiasts</ThemedText>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color={Colors[colorScheme ?? 'light'].text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Search posts..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <IconSymbol name="xmark.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {/* Categories */}
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
      
      {/* Posts List */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
        ListEmptyComponent={
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="bubble.left.and.bubble.right" size={50} color="#8BC34A" />
            <ThemedText type="subtitle">No posts found</ThemedText>
            <ThemedText>Try a different search term</ThemedText>
          </ThemedView>
        }
      />
      
      {/* Create Post Button */}
      <TouchableOpacity style={styles.createPostButton}>
        <IconSymbol name="plus" size={24} color="white" />
      </TouchableOpacity>
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
  postsList: {
    paddingBottom: 80, // Space for the create post button
  },
  postCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    opacity: 0.6,
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  postContent: {
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 200, 200, 0.3)',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 
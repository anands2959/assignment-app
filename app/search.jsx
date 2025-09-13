import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const suggestions = [
    'Over the counter drugs',
    'Safe for children',
    'Pregnancy safe',
    'Halal certified'
  ];
  const allowedCategories = ['Safe for children'];
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUpload = async () => {
    console.log('Upload image');
  };

  const handleSuggestionPress = (suggestion) => {
    if (allowedCategories.includes(suggestion)) {
      navigation.navigate('Drugs', { category: suggestion });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Section */}
      <LinearGradient
        colors={['#D6EDFF', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.3]}
        style={styles.searchSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Drugs</Text>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search by Drug name"
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <View style={styles.uploadIconContainer}>
            <Image
                  source={require('../assets/images/image.png')}
                  style={{width: 24, height: 24}}
                />
          </View>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Suggestions */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.suggestionsTitle}>Suggestions</Text>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: 242,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
    color: '#333',
    backgroundColor: '#EEEEEE',
    borderRadius: 50,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  uploadIconContainer: {
    width: 32,
    height: 25,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  suggestionChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
  },
});
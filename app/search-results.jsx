import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default function SearchResults({ navigation, route }) {
  const { imageUri } = route?.params || {};

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReUpload = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#D6EDFF', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.5]}
        style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search results</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Result Container */}
        <View style={styles.imageResultContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.resultImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="image-outline" size={40} color="#A0A0A0" />
            </View>
          )}
          
          {/* Re-upload Button */}
          <TouchableOpacity style={styles.reUploadButton} onPress={handleReUpload}>
            <Text style={styles.reUploadText}>Re-upload</Text>
            <Ionicons name="refresh" size={16} color="#666" style={styles.reUploadIcon} />
          </TouchableOpacity>
        </View>

        {/* Drug Information */}
        <View style={styles.drugInfoContainer}>
          <View style={styles.drugHeader}>
            <View style={styles.drugIconContainer}>
              <Ionicons name="medical" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.drugDetails}>
              <Text style={styles.drugName}>ACT-HIB VACCINE</Text>
              <Text style={styles.drugDescription}>10mcg · Solution for Injection</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: 142,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  imageResultContainer: {
    borderRadius: 16,
    marginBottom: 20,
    position: 'relative',
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  placeholderContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  reUploadButton: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reUploadText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  reUploadIcon: {
    marginLeft: 4,
  },
  drugInfoContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  drugHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drugIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drugDetails: {
    flex: 1,
  },
  drugName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  drugDescription: {
    fontSize: 14,
    color: '#666',
  },
  
});
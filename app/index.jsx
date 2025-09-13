import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { useEffect, useState } from 'react';

import {
  Alert,
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



export default function Index({ navigation }) {
  const searchTerms = ['Drug name', 'Code', 'Symptom', 'Brand', 'Drug name'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [translateY] = useState(new Animated.Value(0));


  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % searchTerms.length);
        
        translateY.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim, translateY, searchTerms.length]);

  const handleSearchPress = () => {
    navigation.navigate('Search'); 
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        navigation.navigate('ImagePreview', { imageUri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#D6EDFF', '#F5F5F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.3]}
          style={styles.headerBackground}>
          <View style={styles.headerContainer}>
            <View style={styles.topRow}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/images/brand-logo.gif')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg' }}
                  style={styles.profileImage}
                />
              </View>
            </View>
            <View style={styles.greetingRow}>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>Ahmed Abdulla</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
              <Ionicons name="search" size={18} color="#333" style={styles.searchIcon} />
              <View style={styles.placeholderContainer}>
                <Text style={styles.searchPlaceholderPrefix}>Search by </Text>
                <Animated.Text 
                  style={[
                    styles.searchPlaceholderAnimated,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: translateY }]
                    }
                  ]}
                >
                  {searchTerms[currentIndex]}
                </Animated.Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
                <Image
                  source={require('../assets/images/image.png')}
                  style={{width: 24, height: 24}}
                />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Drug Cards */}
        <View style={styles.cardsContainer}>
          {/* UPP Drugs Card */}
          <View style={[styles.drugCard, styles.uppCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>List of UPP Drugs</Text>
              <Text style={styles.cardSubtitle}>
                A list of trusted medicines{"\n"}used in hospitals and clinics
              </Text>
            </View>
            <View style={styles.cardImageContainer}>
              <Image
                source={require('../assets/images/card1-back.png')}
                style={styles.cardBackImage}
              />
              <Image
                source={require('../assets/images/card1-front.png')}
                style={styles.cardFrontImage}
              />
            </View>
          </View>

          {/* OTC Drugs Card */}
          <View style={[styles.drugCard, styles.otcCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>List of OTC Drugs</Text>
              <Text style={styles.cardSubtitle}>
                A list of trusted medicines{"\n"}used in hospitals and clinics
              </Text>
            </View>
            <View style={styles.cardImageContainer}>
              <Image
                source={require('../assets/images/card1-back.png')}
                style={styles.cardBackImage}
              />
              <Image
                source={require('../assets/images/card1-front.png')}
                style={styles.cardFrontImage}
              />
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
  scrollView: {
    flex: 1,
  },
  headerBackground: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
    height: 246,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingRow: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 40,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'System',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
    backgroundColor: '#EEEEEE',
    color: '#333',
    borderRadius: 50,
    padding: 8,
  },
  placeholderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    overflow: 'hidden',
  },
  searchPlaceholderPrefix: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  searchPlaceholderAnimated: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  uploadButton: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cardsContainer: {
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  drugCard: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 196,
    flexDirection: 'row',
  },
  uppCard: {
    backgroundColor: '#F5F5F5',
  },
  otcCard: {
    backgroundColor: '#FFF4DF',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop:10,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

  },
  cardBackImage: {
    width: 181,
    height: 140,
    position: 'absolute',
    resizeMode: 'contain',
  },
  cardFrontImage: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
    zIndex: 1,
  },

});

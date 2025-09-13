import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DrugList({ navigation, route }) {
  const { category } = route?.params || {};

  const handleBack = () => {
    navigation.goBack();
  };


  const drugData = [
    {
      id: 1,
      name: 'Delictase',
      dosage: '30 mg',
      form: 'Capsule',
      type: 'UPP',
      color: '#4ECDC4',
      icon: 'medical'
    },
    {
      id: 2,
      name: 'Lariago',
      dosage: '250 mg',
      form: 'Tablets',
      type: '',
      color: '#FFB84D',
      icon: 'medical'
    },
    {
      id: 3,
      name: 'Nemocid',
      dosage: '250 mg/5ml',
      form: 'Oral Suspe...',
      type: '',
      color: '#4A90E2',
      icon: 'water'
    },
    {
      id: 4,
      name: 'Multivitamin (Vifact Sy...',
      dosage: 'Combination',
      form: 'Syrup',
      type: 'UPP',
      color: '#4A90E2',
      icon: 'water'
    },
    {
      id: 5,
      name: 'O.R.S Soluble tablets bla...',
      dosage: '176 mg',
      form: 'Dispersible Tablets',
      type: '',
      color: '#FFB84D',
      icon: 'medical'
    },
    {
      id: 6,
      name: 'Betlor',
      dosage: '2.5 mg/5ml',
      form: 'Syrup',
      type: 'UPP',
      color: '#4A90E2',
      icon: 'water'
    },
    {
      id: 7,
      name: 'Cabenuva',
      dosage: '200 mg/ml',
      form: 'Suspension f...',
      type: '',
      color: '#8B5CF6',
      icon: 'medical'
    },
    {
      id: 8,
      name: 'Trivacy',
      dosage: '50 mg',
      form: 'Tablets',
      type: 'UPP',
      color: '#FFB84D',
      icon: 'medical'
    },
    {
      id: 9,
      name: 'Vinpat',
      dosage: '10 mg/ml',
      form: 'Syrup',
      type: 'UPP',
      color: '#4A90E2',
      icon: 'water'
    },
    {
      id: 10,
      name: 'Taxacin',
      dosage: '7 g/0.25 g',
      form: 'Powder For S...',
      type: 'UPP',
      color: '#8B5CF6',
      icon: 'medical'
    },
    {
      id: 11,
      name: 'Influvac Tetra',
      dosage: '15 mcg/0.5ml',
      form: 'Solution f...',
      type: 'UPP',
      color: '#8B5CF6',
      icon: 'medical'
    }
  ];

  const getIconName = (icon) => {
    switch (icon) {
      case 'water':
        return 'water';
      case 'medical':
      default:
        return 'medical';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#D6EDFF', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.3]}
        style={styles.headerSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Drugs</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={category || 'Safe for children'}
            placeholderTextColor="#333"
            value={category || 'Safe for children'}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Drug List */}
      <ScrollView style={styles.drugList} showsVerticalScrollIndicator={false}>
        {drugData.map((drug) => (
          <TouchableOpacity key={drug.id} style={styles.drugItem}>
            <View style={styles.drugContent}>
              <View style={[styles.drugIcon, { backgroundColor: `${drug.color}20` }]}>
                <Ionicons name={getIconName(drug.icon)} size={20} color={drug.color} />
              </View>
              <View style={styles.drugInfo}>
                <Text style={styles.drugName}>{drug.name}</Text>
                <Text style={styles.drugDetails}>
                  {drug.dosage} · {drug.form}
                </Text>
              </View>
              {drug.type && (
                <View style={styles.typeTag}>
                  <Text style={styles.typeText}>{drug.type}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    borderRadius: 50,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
    color: '#333',
    backgroundColor: '#EEEEEE',
    borderRadius: 50,
    padding: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  filterSection: {
    paddingBottom: 0,
  },
  filterTab: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#333',
  },
  drugList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  drugItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 16,
    
  },
  drugContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  drugIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  drugInfo: {
    flex: 1,
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  drugDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  typeTag: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
});
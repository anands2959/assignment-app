
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from "expo-status-bar";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import DrugList from './drug-list';
import ImagePreview from './image-preview';
import Index from './index';
import Search from './search';
import SearchResults from './search-results';

const Stack = createStackNavigator();


function MainTabNavigator() {
  const stackNavigation = useNavigation();
  
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';
    let label = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        label = 'Home';
        break;
      case 'Prescription':
        icon = 'clipboard-outline';
        label = 'Prescription';
        break;
    }

    return (
      <View style={styles.tabIconContainer}>
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? '#0E47A6' : '#999'}
        />
        <Text style={[styles.tabLabel, { color: routeName === selectedTab ? '#0E47A6' : '#999' }]}>
          {label}
        </Text>
      </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        stackNavigation.navigate('ImagePreview', { imageUri });
      }
    } catch (error) {
      console.error('Error picking image:', error); 
    }
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={80}
      circleWidth={90}
      bgColor="#EEEEEE"
      initialRouteName="Home"
      borderTopLeftRight
      screenOptions={{
        headerShown: false,
      }}
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleImagePicker()}
          >
            <Ionicons name={'scan'} color="#FFFFFF" size={28} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={Index}
      />
      <CurvedBottomBarExpo.Screen
        name="Prescription"
        component={DrugList}
        position="RIGHT"
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ImagePreview" component={ImagePreview} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Drugs" component={DrugList} />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  searchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C5282',
    bottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
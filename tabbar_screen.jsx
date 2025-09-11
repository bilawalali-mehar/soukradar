// tabbar_screen.jsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './home_screen';
import MoreScreen from './more_screen'; // Import your MoreScreen

const Tab = createBottomTabNavigator();

export default function TabbarScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: '#fff',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/homeicon.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? '#26A69A' : '#999',
              }}
            />
          ),
        }}
      />

      {/* Star Tab (Center Floating Button) */}
      <Tab.Screen
        name="Star"
        component={HomeScreen} // Placeholder screen
        options={{
          tabBarIcon: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.fabContainer}
              onPress={() => Alert.alert('Star Button', 'Star button pressed!')}
            >
              <View style={styles.fab}>
                <Image
                  source={require('./assets/starlogo.png')}
                  style={{ width: 35, height: 35, tintColor: '#fff' }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* More Tab */}
      <Tab.Screen
        name="More"
        component={MoreScreen} // Open the actual MoreScreen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/moreicon.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? '#26A69A' : '#999',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#26A69A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
});

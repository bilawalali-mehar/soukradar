import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import Edit Profile Screen
import EditProfileScreen from './edit_profile_screen';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const profileDetails = [
    { title: 'Full Name', value: 'Cash Back' },
    { title: 'Phone Number', value: '+92 300 1234567' },
    { title: 'Email Address', value: 'info@cashbackproject.com' },
    { title: 'Address', value: '123, Main Street, Karachi, Pakistan' },
  ];

  return (
    <ScrollView style={styles.profileContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Page Title with Back Button and Right-side Edit Logo */}
      <View style={styles.pageTitleContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* Profile Title */}
        <Text style={styles.pageTitle}>Profile</Text>

        {/* Edit Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
          <Image
            source={require('./assets/editprofile.png')}
            style={styles.pageLogo}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={require('./assets/profilelogoforhome.png')}
          style={styles.profilePic}
        />
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        {profileDetails.map((item, index) => (
          <View key={index}>
            <Text style={styles.detailTitle}>{item.title}</Text>
            <Text style={styles.detailText}>{item.value}</Text>
            {index !== profileDetails.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },

  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  backButton: { padding: 5 },
  backIcon: { width: 30, height: 30, resizeMode: 'contain' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center', flex: 1 },
  pageLogo: { width: 20, height: 20, resizeMode: 'contain' },

  profilePicContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50 },

  detailsContainer: { paddingHorizontal: 20 },
  detailTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginTop: 10 },
  detailText: { fontSize: 16, color: '#000', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
});

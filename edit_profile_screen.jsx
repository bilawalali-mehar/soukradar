// edit_profile_screen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('Cash Back');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [email, setEmail] = useState('info@cashbackproject.com');
  const [address, setAddress] = useState('123, Main Street, Karachi, Pakistan');

  const handleSave = () => {
    alert(`Saved:\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}`);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <View style={styles.profilePicBackground}>
          <Image
            source={require('./assets/editprofilelogo.png')}
            style={styles.profilePic}
          />
        </View>
      </View>

      {/* Editable Fields moved closer to top */}
      <View style={styles.detailsContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.inputField}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter Full Name"
        />

        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.inputField}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={[styles.inputField, { height: 80, textAlignVertical: 'top' }]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  backButton: { padding: 5 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },

  profilePicContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,  // reduced top space
    marginBottom: 10 // reduced bottom space
  },
  profilePicBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e6eeedff', // light blue background
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dotted', // dotted border
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: { 
    width: 30, 
    height: 30, 
    borderRadius: 15 
  },

  detailsContainer: { paddingHorizontal: 20 },

  inputLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#333' },
  inputField: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9' },

  saveButton: { marginTop: 20, backgroundColor: '#26A69A', paddingVertical: 15, borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


// create_account.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Agbalumo_400Regular } from "@expo-google-fonts/agbalumo";

export default function CreateAccountScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false); // Checkbox state

  const [fontsLoaded] = useFonts({
    Agbalumo_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleCreateAccount = () => {
    if (!accepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    // Navigate to OTP verification screen
    navigation.navigate('VerifyScreen'); // replace with your actual route name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#26A69A" />
        </TouchableOpacity>
        <Text style={styles.appName}>SoukRadar</Text>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Create New Account</Text>

      {/* Circular Image Container */}
      <View style={styles.circularContainer}>
        <Image
          source={require('./assets/createaccounticon.png')}
          style={styles.circularImage}
        />
      </View>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput placeholder="Full Name" style={styles.input} />
      </View>

      {/* Contact Number */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput placeholder="Contact Number" style={styles.input} keyboardType="phone-pad" />
      </View>

      {/* Email Address */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      </View>

      {/* Address */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput placeholder="Address" style={styles.input} />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#26A69A" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showConfirm}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={22} color="#26A69A" />
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
      <TouchableOpacity style={styles.termsContainer} onPress={() => setAccepted(!accepted)}>
        <View style={[styles.checkbox, accepted && styles.checked]} />
        <Text style={styles.termsText}>
          I accept <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: { 
  flexGrow: 1, 
  padding: 10, 
  backgroundColor: '#f7efef', 
  alignItems: 'center',
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginTop: 40,
  marginBottom: 20,
  justifyContent: 'center',
  position: 'relative',
},
appName: {
  fontSize: 35,
  color: '#26A69A',
  fontFamily: 'Agbalumo_400Regular',
  textAlign: 'center',
  flex: 1,
},
heading: { 
  fontSize: 28, 
  fontWeight: '700', 
  color: '#26A69A', 
  marginBottom: 20, 
  textAlign: 'left', 
  width: '100%',
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: '#fff',
},
icon: { marginRight: 8 },
input: { flex: 1, height: 50 },

button: { 
  backgroundColor: '#26A69A', 
  paddingVertical: 15, 
  borderRadius: 25, 
  width: '100%', 
  alignItems: 'center', 
  marginTop: 20 
},
buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

circularContainer: {
  marginBottom: 20,
  width: 60,
  height: 60,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#d8e6e4ff',
},
circularImage: {
  width: 20,
  height: 20,
  resizeMode: 'cover',
},

termsContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: 15,
},
checkbox: {
  width: 20,
  height: 20,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: '#ccc',
  marginRight: 10,
  backgroundColor: '#f0f0f0',
},
checked: {
  backgroundColor: '#26A69A',
  borderColor: '#26A69A',
},
termsText: {
  fontSize: 14,
  color: '#666',
},
termsLink: {
  color: '#26A69A',
  fontWeight: '600',
},
});


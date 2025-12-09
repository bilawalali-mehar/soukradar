<<<<<<< HEAD
// create_account.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Agbalumo_400Regular } from "@expo-google-fonts/agbalumo";
import axios from 'axios';

export default function CreateAccountScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // form fields (split name into first/last)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState(''); // required by API
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Agbalumo_400Regular,
  });

  if (!fontsLoaded) return null;

  const validateEmail = (em) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setContact('');
    setEmail('');
    setAddress('');
    setCountry('');
    setPassword('');
    setConfirmPassword('');
    setAccepted(false);
  };

  const handleCreateAccount = async () => {
    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !contact.trim() || !email.trim() || !password) {
      Alert.alert('Validation', 'Please fill all required fields (first name, last name, contact, email, password).');
      return;
    }
    if (!validateEmail(email.trim())) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }
    if (!accepted) {
      Alert.alert('Validation', 'Please accept the Terms & Conditions');
      return;
    }
    if (!country.trim()) {
      Alert.alert('Validation', 'Please enter your country (required by server).');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: contact.trim(),
        email: email.trim(),
        address: address.trim(),
        country: country.trim(),
        password: password,
        terms_accepted: true,
      };

      console.log('Register payload:', payload);

      const resp = await axios.post(
        'https://soukradar.com/v1/mobile/auth/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 15000,
        }
      );

      console.log('Register response status:', resp.status);
      console.log('Register response data:', resp.data);

      if (resp && resp.data) {
        const data = resp.data;
        const ok =
          resp.status === 201 ||
          resp.status === 200 ||
          data.success === true ||
          data.status === 'ok' ||
          data.error === false ||
          (data.message && /register|success|created/i.test(String(data.message)));

        if (ok) {
          // Show success message then send user to Login screen
          const successMessage = data.message || 'Data saved successfully!';
          Alert.alert('Success', successMessage, [
            {
              text: 'OK',
              onPress: () => {
                clearForm();
                navigation.replace('LoginScreen');
              },
            },
          ]);
          return;
        } else {
          const serverMsg =
            data.message ||
            (data.errors ? JSON.stringify(data.errors) : null) ||
            JSON.stringify(data);
          Alert.alert('Registration failed', serverMsg);
          return;
        }
      }

      Alert.alert('Registration failed', 'Unexpected response from server');
    } catch (err) {
      console.log('Register error (full):', err);
      let errMsg = 'Network error';
      try {
        if (axios.isAxiosError && axios.isAxiosError(err)) {
          if (err.response) {
            console.log('Server response data:', err.response.data);
            errMsg =
              err.response.data?.message ||
              (err.response.data?.errors ? JSON.stringify(err.response.data.errors) : null) ||
              `Status ${err.response.status}`;
          } else if (err.request) {
            errMsg = 'No response from server (timeout or network).';
          } else {
            errMsg = err.message;
          }
        } else {
          errMsg = err.message || String(err);
        }
      } catch (parseErr) {
        console.log('Error parsing axios error:', parseErr);
      }
      Alert.alert('Register error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back-outline" size={28} color="#26A69A" />
        </TouchableOpacity>
        <Text style={styles.appName}>SoukRadar</Text>
      </View>

      <Text style={styles.heading}>Create New Account</Text>

      <View style={styles.circularContainer}>
        <Image
          source={require('./assets/createaccounticon.png')}
          style={styles.circularImage}
        />
      </View>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Contact Number */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Contact Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />
      </View>

      {/* Email Address */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Country (required) */}
      <View style={styles.inputContainer}>
        <Ionicons name="flag-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Country (e.g., Pakistan)"
          style={styles.input}
          value={country}
          onChangeText={setCountry}
        />
      </View>

      {/* Address (optional) */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={22} color="#26A69A" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.termsContainer} onPress={() => setAccepted(!accepted)}>
        <View style={[styles.checkbox, accepted && styles.checked]} />
        <Text style={styles.termsText}>
          I accept <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.8 }]} onPress={handleCreateAccount} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
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
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 6,
  },
  appName: {
    fontSize: 35,
    color: '#26A69A',
    fontFamily: 'Agbalumo_400Regular',
    textAlign: 'center',
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
    marginTop: 20,
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
=======
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

>>>>>>> 93d136f6e42040af1cea938952ccb1ae2481ab70

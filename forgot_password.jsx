// ForgotScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function ForgotScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (em) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const handleSend = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email');
      return;
    }
    if (!validateEmail(email.trim())) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const payload = { email: email.trim() };
      console.log('Forgot payload:', payload);

      const resp = await axios.post(
        'https://soukradar.com/v1/mobile/auth/forgot-password',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 15000,
        }
      );

      console.log('Forgot response status:', resp.status);
      console.log('Forgot response data:', resp.data);

      // Interpret success
      const ok =
        resp.status === 200 ||
        resp.status === 201 ||
        resp.data?.success === true ||
        resp.data?.status === 'ok' ||
        resp.data?.error === false;

      if (ok) {
        const msg = resp.data?.message || 'Verification code sent to your email.';
        Alert.alert('Success', msg, [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Verify screen (pass email and any server response)
              navigation.navigate('VerifyScreen', { email: email.trim(), forgotResponse: resp.data });
            },
          },
        ]);
      } else {
        const msg =
          resp.data?.message ||
          (resp.data?.errors ? JSON.stringify(resp.data.errors) : 'Could not send verification code.');
        Alert.alert('Error', msg);
      }
    } catch (err) {
      console.log('Forgot error (full):', err);
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
      Alert.alert('Error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Title with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#26A69A" />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        We will send you a verification code to your registered email address.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#26A69A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
      </View>

      {/* Send Button */}
      <TouchableOpacity style={[styles.button, loading && { opacity: 0.8 }]} onPress={handleSend} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7efef',
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#26A69A',
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

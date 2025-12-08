// Verify.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);

  const { phone, email } = route?.params || {};

  const focusNext = (index) => {
    if (index < 5 && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    } else {
      // dismiss keyboard when last input filled
      Keyboard.dismiss();
    }
  };

  const focusPrevIfEmpty = (index, text) => {
    if (!text && index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleChange = (text, index) => {
    // allow only digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned) {
      focusNext(index);
    } else {
      focusPrevIfEmpty(index, cleaned);
    }

    // auto submit when last digit entered
    if (index === 5 && cleaned) {
      const otpValue = newOtp.join('');
      if (otpValue.length === 6) {
        // small timeout to ensure state update/render complete
        setTimeout(() => {
          handleVerify(otpValue);
        }, 120);
      }
    }
  };

  const handleVerify = async (prefilledOtp) => {
    const otpValue = prefilledOtp ?? otp.join('');
    if (otpValue.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const payload = { otp: otpValue };
      if (phone) payload.phone = phone;
      if (email) payload.email = email;

      console.log('Verify payload:', payload);

      const resp = await axios.post(
        'https://soukradar.com/v1/mobile/auth/verify-otp',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // add API key or auth header here if backend requires it
          },
          timeout: 15000,
        }
      );

      console.log('Verify response status:', resp.status);
      console.log('Verify response data:', resp.data);

      // Interpret success based on common patterns
      const ok =
        resp.status === 200 ||
        resp.data?.success === true ||
        resp.data?.status === 'ok' ||
        resp.data?.error === false;

      if (ok) {
        Alert.alert('Verified', 'Your account has been verified.');
        // replace stack so user can't go back to verification
        navigation.replace('TabbarScreen');
      } else {
        const msg =
          resp.data?.message ||
          (resp.data?.errors ? JSON.stringify(resp.data.errors) : 'Verification failed');
        Alert.alert('Verification failed', msg);
      }
    } catch (err) {
      console.log('Verify error (full):', err);
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
      Alert.alert('Verification error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // If backend has a resend endpoint, use that.
    // Since you didn't provide a resend endpoint, we're attempting a best-effort:
    // 1) If your backend supports sending OTP again via the same verify endpoint pattern, it usually won't.
    // 2) Please replace the URL below with your actual resend endpoint if available.
    // Example placeholder (uncomment and change if you have one):
    // POST https://soukradar.com/v1/mobile/auth/resend-otp  { phone, email }
    try {
      setLoading(true);
      // If you have a real resend endpoint, replace the URL and payload below.
      const resendUrl = 'https://soukradar.com/v1/mobile/auth/resend-otp';
      const payload = {};
      if (phone) payload.phone = phone;
      if (email) payload.email = email;

      // Try calling resend endpoint — if 404 or not available, user will see error message
      const resp = await axios.post(resendUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      console.log('Resend response:', resp.data);
      const ok = resp.status === 200 || resp.data?.success === true || resp.data?.status === 'ok';
      if (ok) {
        Alert.alert('OTP Sent', 'A new OTP has been sent to your number/email.');
        // Clear inputs for user convenience
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        Alert.alert('Resend failed', resp.data?.message || 'Could not resend OTP.');
      }
    } catch (err) {
      console.log('Resend error:', err);
      // Friendly fallback if resend endpoint does not exist
      Alert.alert(
        'Resend failed',
        'Could not resend OTP. If you have not received the code, please try again later or contact support.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Verify OTP</Text>
      </View>

      <Text style={styles.subtitle}>Enter the 6-digit OTP sent to your number</Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            textAlign="center"
            returnKeyType="done"
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.button} onPress={() => handleVerify()} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
      </TouchableOpacity>

      {/* Didn't receive OTP + Resend Button */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <TouchableOpacity style={styles.resendButtonContainer} onPress={handleResend} disabled={loading}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#26A69A',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resendContainer: {
    alignItems: 'center',
    width: '100%',
  },
  resendText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resendButtonContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#26A69A',
    width: '100%',
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#26A69A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

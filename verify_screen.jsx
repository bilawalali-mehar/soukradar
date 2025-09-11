// Verify.js
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OTPVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input automatically
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      Alert.alert('Success', `OTP ${otpValue} verified successfully!`);
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  const handleResend = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your number.');
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
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={text => handleChange(text, index)}
            textAlign="center"
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      {/* Didn't receive OTP + Resend Button */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <TouchableOpacity style={styles.resendButtonContainer} onPress={handleResend}>
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
    paddingTop: 60, // start content a bit lower from top
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center', // center title horizontally
  },
  backButton: {
    position: 'absolute', // keep back button on left
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
    backgroundColor: '#ffffff', // white background
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,          // black border
    borderColor: '#26A69A',
    width: '100%',
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#26A69A', // accent text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

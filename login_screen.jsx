import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useFonts, Agbalumo_400Regular } from "@expo-google-fonts/agbalumo";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Agbalumo_400Regular });
  const [showPassword, setShowPassword] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26A69A" />
        <Text style={{ marginTop: 10, color: '#26A69A' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appname}>SoukRadar</Text>

        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.description}>
            Create your account to get started.{"\n"}It's quick and easy!
          </Text>

          {/* Email input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color="#26A69A" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color="#26A69A" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#26A69A" />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Main Sign Up Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TabbarScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>


          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR connect with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
              <FontAwesome name="google" size={22} color="#fff" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000' }]}>
              <FontAwesome name="apple" size={22} color="#fff" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#26A69A' }]}>
              <MaterialCommunityIcons name="account-outline" size={22} color="#fff" />
              <Text style={styles.socialText}>Guest</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.footerLink}>Create new account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7efef' },
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f7efef' },
  appname: { fontSize: 35, color: '#26A69A', fontFamily: 'Agbalumo_400Regular', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  content: { marginTop: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 15, color: '#26A69A', textAlign: 'left' },
  description: { fontSize: 16, color: '#4A4A4A', textAlign: 'left', marginBottom: 30, lineHeight: 22 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 5, backgroundColor: '#fff' },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 50 },
  forgotContainer: { width: '100%', alignItems: 'flex-end', marginBottom: 15 },
  forgotText: { color: '#26A69A', fontWeight: '600', fontSize: 14 },
  button: { backgroundColor: '#26A69A', paddingVertical: 15, borderRadius: 25, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, width: '100%' },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ccc' },
  dividerText: { marginHorizontal: 10, color: '#4A4A4A', fontSize: 14 },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  socialButton: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center', paddingVertical: 12, borderRadius: 10, marginHorizontal: 5 },
  socialText: { color: '#fff', fontSize: 14, marginLeft: 6, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingVertical: 15 },
  footerText: { color: '#000', fontSize: 14 },
  footerLink: { color: '#26A69A', fontSize: 14, fontWeight: '600' },
});

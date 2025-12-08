// LoginScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

// Expo Auth Session (Google)
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // NOTE: Replace these client IDs with yours from Google Cloud Console
  // If using Expo Go, set expoClientId (optional). For web/id_token you need webClientId.
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    // redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), // optional
  });

  useEffect(() => {
    if (!response) return;

    if (response.type === 'success') {
      const { authentication } = response;
      const idToken = authentication?.idToken;
      const accessToken = authentication?.accessToken;

      if (idToken) {
        handleGoogleLoginToBackend({ idToken, accessToken });
      } else {
        Alert.alert('Google Sign-In', 'No id_token returned. Check your client IDs (webClientId required).');
      }
    } else if (response.type === 'error') {
      Alert.alert('Google Sign-In', 'Sign in cancelled or failed.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const validateEmail = (em) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }
    if (!validateEmail(email.trim())) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: email.trim(),
        password: password,
      };

      console.log('Login payload:', payload);

      const resp = await axios.post(
        'https://soukradar.com/v1/mobile/auth/login',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 15000,
        }
      );

      console.log('Login response status:', resp.status);
      console.log('Login response data:', resp.data);

      const ok =
        resp.status === 200 ||
        resp.data?.success === true ||
        resp.data?.status === 'ok' ||
        resp.data?.error === false;

      if (ok) {
        const token = resp.data?.token || resp.data?.access_token || null;
        const user = resp.data?.user || resp.data?.data || null;

        navigation.replace('TabbarScreen', { user, token });
      } else {
        const msg =
          resp.data?.message ||
          (resp.data?.errors ? JSON.stringify(resp.data.errors) : 'Login failed. Check credentials.');

        if (typeof msg === 'string' && msg.toLowerCase().includes('inactive')) {
          Alert.alert(
            'Account inactive',
            msg,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Verify now', onPress: () => navigation.navigate('VerifyScreen', { email }) },
            ],
            { cancelable: true }
          );
        } else {
          Alert.alert('Login failed', msg);
        }
      }
    } catch (err) {
      console.log('Login error (full):', err);
      let errMsg = 'Network error';
      try {
        if (axios.isAxiosError && axios.isAxiosError(err)) {
          if (err.response) {
            console.log('Server response data:', err.response.data);
            const serverMsg = err.response.data?.message;
            errMsg =
              serverMsg ||
              (err.response.data?.errors ? JSON.stringify(err.response.data.errors) : null) ||
              `Status ${err.response.status}`;

            if (serverMsg && typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('inactive')) {
              Alert.alert(
                'Account inactive',
                serverMsg,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Verify now', onPress: () => navigation.navigate('VerifyScreen', { email }) },
                ],
                { cancelable: true }
              );
              setLoading(false);
              return;
            }
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
      Alert.alert('Login error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Send Google idToken to backend
  const handleGoogleLoginToBackend = async ({ idToken, accessToken }) => {
    setLoading(true);
    try {
      const payload = {
        provider: 'google',
        id_token: idToken,
        access_token: accessToken || null,
      };

      console.log('Google login payload -> backend:', payload);

      const resp = await axios.post(
        'https://soukradar.com/v1/mobile/auth/google-login',
        payload,
        {
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          timeout: 15000,
        }
      );

      console.log('Google-login response:', resp.status, resp.data);

      const ok =
        resp.status === 200 ||
        resp.status === 201 ||
        resp.data?.success === true ||
        resp.data?.status === 'ok' ||
        resp.data?.error === false;

      if (ok) {
        const token = resp.data?.token || resp.data?.access_token || null;
        const user = resp.data?.user || resp.data?.data || null;

        Alert.alert('Success', resp.data?.message || 'Logged in with Google', [
          { text: 'OK', onPress: () => navigation.replace('TabbarScreen', { user, token }) },
        ]);
      } else {
        const msg = resp.data?.message || JSON.stringify(resp.data) || 'Google login failed';
        Alert.alert('Google login failed', msg);
      }
    } catch (err) {
      console.log('Google login error:', err);
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
      Alert.alert('Google login error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGooglePress = async () => {
    if (!request) {
      Alert.alert('Google Sign-In', 'Google auth request not ready. Check client IDs.');
      return;
    }
    // useProxy: true often works for Expo Go
    await promptAsync({ useProxy: true, showInRecents: true });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appname}>SoukRadar</Text>

        <View style={styles.content}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>
            Login with your registered account to continue.
          </Text>

          {/* Email input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color="#26A69A" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color="#26A69A" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
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

          {/* Main Sign In Button */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR connect with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            {/* Google */}
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
              onPress={handleGooglePress}
              disabled={loading}
            >
              <FontAwesome name="google" size={22} color="#fff" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            {/* Apple (placeholder) */}
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000' }]}>
              <FontAwesome name="apple" size={22} color="#fff" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>

            {/* Guest */}
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#26A69A' }]} onPress={() => navigation.replace('TabbarScreen')}>
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
  appname: { fontSize: 35, color: '#26A69A', textAlign: 'center', marginTop: 40, marginBottom: 20 },
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

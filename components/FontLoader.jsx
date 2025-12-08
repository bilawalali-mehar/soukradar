import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useFonts, Agbalumo_400Regular } from '@expo-google-fonts/agbalumo';

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({ Agbalumo_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26A69A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 10, color: '#26A69A' },
});

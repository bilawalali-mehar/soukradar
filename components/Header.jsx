import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import theme from '../styles/theme';

export default function Header({ userName = 'SoukRadar User', onProfilePress, onNotificationsPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={require('../assets/profile.png')} style={styles.avatar} />
        <View>
          <CustomText style={styles.welcome}>Welcome,</CustomText>
          <CustomText style={styles.name}>{userName}</CustomText>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onNotificationsPress} style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress} style={styles.iconBtn}>
          <Image source={require('../assets/profile.png')} style={styles.smallAvatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12, backgroundColor: theme.colors.inputBackground },
  welcome: { fontSize: 13, color: theme.colors.muted },
  name: { fontSize: 16, fontWeight: '700' },
  right: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 8, padding: 6 },
  smallAvatar: { width: 36, height: 36, borderRadius: 18 },
});

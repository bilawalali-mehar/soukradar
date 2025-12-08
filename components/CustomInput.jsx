import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function CustomInput({ value, onChangeText, placeholder, leftComponent, style, ...rest }) {
  return (
    <View style={[styles.container, style]}>
      {leftComponent}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomText from './CustomText';

export default function CustomButton({ title, onPress, style, textStyle, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style, disabled && styles.disabled]} disabled={disabled}>
      <CustomText style={[styles.text, textStyle]} weight="regular">
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#26A69A', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, alignItems: 'center' },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.6 },
});

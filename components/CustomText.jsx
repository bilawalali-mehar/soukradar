import React from 'react';
import { Text } from 'react-native';
import theme from '../styles/theme';

export default function CustomText({ children, style, numberOfLines, ...rest }) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors.text, fontSize: 14 }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

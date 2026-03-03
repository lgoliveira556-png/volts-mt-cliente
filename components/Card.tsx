import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          ...Shadows.md,
        };
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: Colors.border,
        };
      case 'default':
      default:
        return {
          ...Shadows.sm,
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyles(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
});

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'vip' | 'premium' | 'pro' | 'success' | 'warning' | 'error' | 'default';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'vip':
        return {
          backgroundColor: Colors.vipBadge,
          borderColor: Colors.vipBadge,
          textColor: Colors.background,
        };
      case 'premium':
        return {
          backgroundColor: 'transparent',
          borderColor: Colors.premiumBorder,
          textColor: Colors.premiumBorder,
        };
      case 'pro':
        return {
          backgroundColor: 'transparent',
          borderColor: Colors.proBorder,
          textColor: Colors.proBorder,
        };
      case 'success':
        return {
          backgroundColor: Colors.success,
          borderColor: Colors.success,
          textColor: Colors.text,
        };
      case 'warning':
        return {
          backgroundColor: Colors.warning,
          borderColor: Colors.warning,
          textColor: Colors.background,
        };
      case 'error':
        return {
          backgroundColor: Colors.error,
          borderColor: Colors.error,
          textColor: Colors.text,
        };
      case 'default':
      default:
        return {
          backgroundColor: Colors.surface,
          borderColor: Colors.border,
          textColor: Colors.text,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          paddingHorizontal: isSm ? Spacing.sm : Spacing.md,
          paddingVertical: isSm ? 2 : Spacing.xs,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: isSm ? 11 : 12,
            color: variantStyles.textColor,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});

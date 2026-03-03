import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
  edges = ['top', 'bottom'],
}) => {
  return (
    <RNSafeAreaView
      style={[styles.container, style]}
      edges={edges}
    >
      {children}
    </RNSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

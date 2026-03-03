import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/theme';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <RNSafeAreaView
      style={[styles.container, style]}
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

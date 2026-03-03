import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, Button } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function AuthInitialScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>⚡</Text>
          </View>
          <Text style={styles.logoName}>VOLTS MT</Text>
          <Text style={styles.logoSubtitle}>Cliente</Text>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>
            Bem-vindo ao Volts MT
          </Text>
          <Text style={styles.subtitle}>
            Entregas rápidas e confiáveis em Cuiabá e Várzea Grande
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon="🚀"
            title="Rápido"
            description="Entregas em tempo real"
          />
          <FeatureItem
            icon="💳"
            title="Seguro"
            description="Pagamento seguro com carteira digital"
          />
          <FeatureItem
            icon="🎯"
            title="Confiável"
            description="Parceiros verificados"
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Entrar"
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            title="Criar Conta"
            onPress={() => router.push('/(auth)/signup')}
            variant="outline"
            size="lg"
            fullWidth
            style={styles.signupButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  logoText: {
    fontSize: 40,
  },
  logoName: {
    fontSize: Typography.h2.fontSize,
    fontWeight: Typography.h2.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  logoSubtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: Spacing.xxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: Spacing.lg,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  buttonsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  signupButton: {
    marginTop: Spacing.sm,
  },
});

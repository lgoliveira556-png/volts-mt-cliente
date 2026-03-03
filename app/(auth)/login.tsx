import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, Button, Input, Checkbox, Card } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { validateEmail } from '@/utils/validation';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signIn({
        email,
        password,
      });

      router.replace('/(app)');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Entrar</Text>
          <View style={styles.backButton} />
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>⚡</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="email"
            error={errors.email}
          />

          <Input
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
            error={errors.password}
          />

          {/* Remember Me */}
          <View style={styles.rememberContainer}>
            <Checkbox
              label="Manter sessão ativa por 15 dias"
              value={rememberMe}
              onValueChange={setRememberMe}
            />
            <TouchableOpacity>
              <Text style={styles.forgotLink}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoContent}>
            <MaterialIcons
              name="info"
              size={20}
              color={Colors.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              Use suas credenciais de cadastro para entrar na sua conta.
            </Text>
          </View>
        </Card>

        {/* Login Button */}
        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          size="lg"
          fullWidth
          style={styles.loginButton}
        />

        {/* Signup Link */}
        <View style={styles.signupLinkContainer}>
          <Text style={styles.signupLinkText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupLink}>Crie uma agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  logoText: {
    fontSize: 32,
  },
  formContainer: {
    marginBottom: Spacing.xl,
  },
  rememberContainer: {
    marginTop: Spacing.lg,
  },
  forgotLink: {
    fontSize: Typography.small.fontSize,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: Spacing.md,
    textAlign: 'right',
  },
  infoCard: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: Spacing.md,
  },
  infoText: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  loginButton: {
    marginBottom: Spacing.lg,
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  signupLinkText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    fontWeight: '600',
  },
});

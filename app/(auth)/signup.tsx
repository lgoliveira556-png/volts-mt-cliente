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
import { SafeAreaView, Button, Input, Card } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { validateEmail, validateCPF, validatePhone } from '@/utils/validation';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [city, setCity] = useState<'Cuiabá' | 'Várzea Grande'>('Cuiabá');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!validatePhone(phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!validateCPF(cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signUp({
        email,
        password,
        full_name: fullName,
        phone,
        cpf,
        city,
      });

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso! Faça login para continuar.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
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
          <Text style={styles.title}>Criar Conta</Text>
          <View style={styles.backButton} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            label="Nome Completo"
            placeholder="Seu nome completo"
            value={fullName}
            onChangeText={setFullName}
            icon="person"
            error={errors.fullName}
          />

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
            label="Telefone"
            placeholder="(65) 99999-9999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="phone"
            error={errors.phone}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            icon="badge"
            error={errors.cpf}
            maxLength={14}
          />

          {/* City Selection */}
          <Text style={styles.label}>Cidade</Text>
          <View style={styles.cityContainer}>
            {(['Cuiabá', 'Várzea Grande'] as const).map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCity(c)}
                style={[
                  styles.cityButton,
                  city === c && styles.cityButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.cityButtonText,
                    city === c && styles.cityButtonTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock"
            error={errors.password}
          />

          <Input
            label="Confirmar Senha"
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon="lock"
            error={errors.confirmPassword}
          />
        </View>

        {/* Terms */}
        <Card style={styles.termsCard}>
          <Text style={styles.termsText}>
            Ao criar uma conta, você concorda com nossos{' '}
            <Text style={styles.termsLink}>Termos de Serviço</Text> e{' '}
            <Text style={styles.termsLink}>Política de Privacidade</Text>.
          </Text>
        </Card>

        {/* Button */}
        <Button
          title="Criar Conta"
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}
          size="lg"
          fullWidth
          style={styles.submitButton}
        />

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Faça login</Text>
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
  formContainer: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.smallBold.fontSize,
    fontWeight: Typography.smallBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  cityContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  cityButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  cityButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  cityButtonText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  cityButtonTextActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  termsCard: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  termsText: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    marginBottom: Spacing.lg,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  loginLinkText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    fontWeight: '600',
  },
});

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
import { SafeAreaView, Card, Button, Input } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { formatCPF, formatPhone } from '@/utils/validation';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await updateProfile({
        id: user?.id || '',
        full_name: fullName,
        phone,
        email: user?.email || '',
        cpf: user?.cpf || null,
        city: user?.city || null,
        avatar_url: user?.avatar_url || null,
        created_at: user?.created_at || '',
        updated_at: new Date().toISOString(),
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/(auth)');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao fazer logout');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
          {!isEditing && (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            >
              <MaterialIcons name="edit" size={20} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.avatarName}>{user?.full_name || 'Usuário'}</Text>
          <Text style={styles.avatarEmail}>{user?.email}</Text>
        </View>

        {/* Profile Info */}
        {isEditing ? (
          <View style={styles.editContainer}>
            <Input
              label="Nome Completo"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Seu nome"
              icon="person"
            />

            <Input
              label="Telefone"
              value={phone}
              onChangeText={setPhone}
              placeholder="(65) 99999-9999"
              icon="phone"
              keyboardType="phone-pad"
            />

            <View style={styles.editButtonsContainer}>
              <Button
                title="Salvar"
                onPress={handleUpdateProfile}
                loading={loading}
                disabled={loading}
                size="md"
                fullWidth
              />
              <Button
                title="Cancelar"
                onPress={() => {
                  setIsEditing(false);
                  setFullName(user?.full_name || '');
                  setPhone(user?.phone || '');
                }}
                variant="secondary"
                size="md"
                fullWidth
                style={styles.cancelButton}
              />
            </View>
          </View>
        ) : (
          <>
            {/* Info Cards */}
            <View style={styles.infoSection}>
              <InfoCard
                icon="email"
                label="Email"
                value={user?.email || '—'}
              />
              <InfoCard
                icon="phone"
                label="Telefone"
                value={user?.phone ? formatPhone(user.phone) : '—'}
              />
              <InfoCard
                icon="badge"
                label="CPF"
                value={user?.cpf ? formatCPF(user.cpf) : '—'}
              />
              <InfoCard
                icon="location-on"
                label="Cidade"
                value={user?.city || '—'}
              />
            </View>

            {/* Settings Section */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Configurações</Text>

              <SettingItem
                icon="notifications"
                label="Notificações"
                onPress={() => {}}
              />
              <SettingItem
                icon="security"
                label="Segurança"
                onPress={() => {}}
              />
              <SettingItem
                icon="help"
                label="Ajuda e Suporte"
                onPress={() => {}}
              />
              <SettingItem
                icon="description"
                label="Termos e Privacidade"
                onPress={() => {}}
              />
            </View>

            {/* Logout Button */}
            <Button
              title="Sair da Conta"
              onPress={handleLogout}
              variant="outline"
              size="lg"
              fullWidth
              style={styles.logoutButton}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => (
  <Card style={styles.infoCard}>
    <View style={styles.infoCardContent}>
      <View style={styles.infoCardIcon}>
        <MaterialIcons name={icon as any} size={20} color={Colors.primary} />
      </View>
      <View style={styles.infoCardText}>
        <Text style={styles.infoCardLabel}>{label}</Text>
        <Text style={styles.infoCardValue}>{value}</Text>
      </View>
    </View>
  </Card>
);

interface SettingItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingItem} activeOpacity={0.7}>
    <View style={styles.settingItemContent}>
      <MaterialIcons name={icon as any} size={20} color={Colors.textSecondary} />
      <Text style={styles.settingItemLabel}>{label}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={20} color={Colors.textSecondary} />
  </TouchableOpacity>
);

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
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatarName: {
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  avatarEmail: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  editContainer: {
    marginBottom: Spacing.xl,
  },
  editButtonsContainer: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cancelButton: {
    marginTop: Spacing.sm,
  },
  infoSection: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  infoCard: {
    backgroundColor: Colors.surface,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  infoCardText: {
    flex: 1,
  },
  infoCardLabel: {
    fontSize: Typography.xs.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  infoCardValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
  },
  settingsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingItemLabel: {
    fontSize: Typography.body.fontSize,
    color: Colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
});

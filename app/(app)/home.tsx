import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, Card } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/database';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (slug: string): string => {
    const icons: Record<string, string> = {
      restaurantes: '🍽️',
      bebidas: '🥤',
      farmacias: '💊',
      'pet-shop': '🐾',
      acessorios: '🎁',
    };
    return icons[slug] || '📦';
  };

  const handleCategoryPress = (category: Category) => {
    // Navegar para tela de produtos da categoria
    router.push({
      pathname: '/(app)/category/[slug]',
      params: { slug: category.slug, name: category.name },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.full_name || 'Usuário'}! 👋</Text>
            <Text style={styles.subgreeting}>Bem-vindo ao Volts MT</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color={Colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <Card style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View>
              <Text style={styles.promoTitle}>Primeira Compra?</Text>
              <Text style={styles.promoSubtitle}>Ganhe 10% de desconto</Text>
            </View>
            <Text style={styles.promoIcon}>🎉</Text>
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="account-balance-wallet"
            label="Carteira"
            value="R$ 0,00"
            onPress={() => router.push('/(app)/wallet')}
          />
          <StatCard
            icon="local-shipping"
            label="Pedidos"
            value="0"
            onPress={() => router.push('/(app)/history')}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>Ver tudo</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator color={Colors.primary} size="large" />
          ) : (
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.8}
                >
                  <Card style={styles.categoryCardContent}>
                    <Text style={styles.categoryIcon}>
                      {getCategoryIcon(category.slug)}
                    </Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Featured Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          <Card style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <View>
                <Text style={styles.featuredTitle}>Entrega Rápida</Text>
                <Text style={styles.featuredSubtitle}>
                  Receba em até 30 minutos
                </Text>
              </View>
              <MaterialIcons name="arrow-forward" size={24} color={Colors.primary} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.statCard} activeOpacity={0.7}>
    <Card style={styles.statCardContent}>
      <MaterialIcons name={icon as any} size={28} color={Colors.primary} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </Card>
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
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subgreeting: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  promoBanner: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  promoSubtitle: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  promoIcon: {
    fontSize: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
  },
  statCardContent: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statLabel: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.text,
  },
  seeAllLink: {
    fontSize: Typography.small.fontSize,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  categoryCard: {
    width: '48%',
  },
  categoryCardContent: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  categoryName: {
    fontSize: Typography.small.fontSize,
    fontWeight: Typography.smallBold.fontWeight,
    color: Colors.text,
    textAlign: 'center',
  },
  featuredCard: {
    backgroundColor: Colors.surface,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featuredSubtitle: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
});

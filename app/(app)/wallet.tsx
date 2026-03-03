import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, Card, Button } from '@/components';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Wallet, WalletTransaction } from '@/types/database';
import { formatCurrency, formatDate } from '@/utils/validation';

export default function WalletScreen() {
  const { user } = useAuthStore();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);

      // Buscar carteira
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (walletError) throw walletError;
      setWallet(walletData);

      // Buscar transações
      const { data: transactionsData, error: transError } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('wallet_id', walletData.id)
        .order('created_at', { ascending: false });

      if (transError) throw transError;
      setTransactions(transactionsData || []);
    } catch (error) {
      console.error('Erro ao buscar carteira:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: { item: WalletTransaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <MaterialIcons
          name={item.type === 'credit' ? 'add' : 'remove'}
          size={20}
          color={item.type === 'credit' ? Colors.success : Colors.error}
        />
      </View>
      <View style={styles.transactionContent}>
        <Text style={styles.transactionDescription}>
          {item.description || (item.type === 'credit' ? 'Crédito' : 'Débito')}
        </Text>
        <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.type === 'credit' ? styles.creditAmount : styles.debitAmount,
        ]}
      >
        {item.type === 'credit' ? '+' : '-'} {formatCurrency(item.amount)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Minha Carteira</Text>
        </View>

        {/* Balance Card */}
        <Card style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceLabel}>Saldo Disponível</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(wallet?.balance || 0)}
            </Text>
            <Text style={styles.balanceSubtitle}>
              Pronto para usar em seus pedidos
            </Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="Adicionar Saldo"
            onPress={() => {}}
            variant="primary"
            size="md"
            fullWidth
          />
        </View>

        {/* Transactions Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Histórico de Movimentações</Text>
            <TouchableOpacity>
              <Text style={styles.filterLink}>Filtrar</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <Card style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <MaterialIcons name="receipt" size={48} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>Nenhuma movimentação ainda</Text>
              </View>
            </Card>
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
  },
  balanceCard: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  balanceContent: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  balanceSubtitle: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  actionsContainer: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
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
  filterLink: {
    fontSize: Typography.small.fontSize,
    color: Colors.primary,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  transactionDate: {
    fontSize: Typography.xs.fontSize,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
  },
  creditAmount: {
    color: Colors.success,
  },
  debitAmount: {
    color: Colors.error,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
});

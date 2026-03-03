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
import { SafeAreaView, Card, Badge } from '@/components';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types/database';
import { formatCurrency, formatDate } from '@/utils/validation';

export default function HistoryScreen() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: Colors.warning,
      confirmed: Colors.primary,
      preparing: Colors.primary,
      ready: Colors.success,
      delivering: Colors.secondary,
      delivered: Colors.success,
      cancelled: Colors.error,
    };
    return colors[status] || Colors.textSecondary;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      ready: 'Pronto',
      delivering: 'Entregando',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity activeOpacity={0.7}>
      <Card style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderCode}>Pedido #{item.confirmation_code}</Text>
            <Text style={styles.orderDate}>{formatDate(item.created_at)}</Text>
          </View>
          <Badge
            label={getStatusLabel(item.status)}
            variant="default"
            size="sm"
          />
        </View>

        <View style={styles.orderDivider} />

        <View style={styles.orderContent}>
          <View style={styles.orderInfo}>
            <MaterialIcons name="location-on" size={16} color={Colors.textSecondary} />
            <Text style={styles.orderCity}>{item.delivery_city}</Text>
          </View>
          <Text style={styles.orderAmount}>{formatCurrency(item.total_amount)}</Text>
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={Colors.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
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
          <Text style={styles.title}>Meus Pedidos</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterTabActive}>
            <Text style={styles.filterTabTextActive}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Entregues</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Cancelados</Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card style={styles.emptyCard}>
            <View style={styles.emptyContent}>
              <MaterialIcons name="shopping-bag" size={48} color={Colors.textSecondary} />
              <Text style={styles.emptyText}>Nenhum pedido realizado ainda</Text>
              <Text style={styles.emptySubtext}>
                Comece a fazer pedidos para vê-los aqui
              </Text>
            </View>
          </Card>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
          />
        )}
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
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
  },
  filterTabActive: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterTabTextActive: {
    fontSize: Typography.small.fontSize,
    color: Colors.text,
    fontWeight: '600',
  },
  orderCard: {
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  orderCode: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  orderDate: {
    fontSize: Typography.xs.fontSize,
    color: Colors.textSecondary,
  },
  orderDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  orderCity: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
  },
  orderAmount: {
    fontSize: Typography.bodyBold.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.xl,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.bodyBold.fontWeight,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: Typography.small.fontSize,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

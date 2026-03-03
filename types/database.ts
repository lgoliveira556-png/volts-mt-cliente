// ============================================================================
// TIPOS DO BANCO DE DADOS
// ============================================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  cpf: string | null;
  city: 'Cuiabá' | 'Várzea Grande' | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string | null;
  order_id: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'delivering' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 'wallet' | 'credit_card' | 'debit_card';

export interface Order {
  id: string;
  user_id: string;
  confirmation_code: string;
  status: OrderStatus;
  total_amount: number;
  delivery_fee: number;
  payment_method: PaymentMethod | null;
  delivery_address: string | null;
  delivery_city: 'Cuiabá' | 'Várzea Grande' | null;
  apartment_delivery: boolean;
  door_delivery: boolean;
  extra_delivery_fee: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  changed_at: string;
  notes: string | null;
}

// ============================================================================
// TIPOS DE REQUISIÇÃO/RESPOSTA
// ============================================================================

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  cpf: string;
  city: 'Cuiabá' | 'Várzea Grande';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateOrderData {
  delivery_address: string;
  delivery_city: 'Cuiabá' | 'Várzea Grande';
  apartment_delivery: boolean;
  door_delivery: boolean;
  extra_delivery_fee: number;
  payment_method: PaymentMethod;
  items: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

export interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

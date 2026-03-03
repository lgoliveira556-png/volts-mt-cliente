import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';

// Screens
import HomeScreen from './home';
import WalletScreen from './wallet';
import HistoryScreen from './history';
import ProfileScreen from './profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="home-index" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function WalletStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="wallet-index" component={WalletScreen} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="history-index" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="profile-index" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function AppLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outlined';
          } else if (route.name === 'wallet') {
            iconName = focused ? 'account-balance-wallet' : 'account-balance-wallet';
          } else if (route.name === 'history') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.sm,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -Spacing.xs,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          title: 'Início',
        }}
      />
      <Tab.Screen
        name="wallet"
        component={WalletStack}
        options={{
          title: 'Carteira',
        }}
      />
      <Tab.Screen
        name="history"
        component={HistoryStack}
        options={{
          title: 'Histórico',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStack}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

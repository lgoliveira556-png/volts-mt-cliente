import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inicial' }} />
      <Stack.Screen name="signup" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}

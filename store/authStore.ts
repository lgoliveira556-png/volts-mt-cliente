import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Profile, SignUpData, LoginData, AuthState } from '@/types/database';

interface AuthStore extends AuthState {
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: LoginData) => Promise<void>;
  signOut: () => Promise<void>;
  restoreToken: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isSignout: false,
  userToken: null,

  // ==============================
  // SIGN UP
  // ==============================
  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone,
            cpf: data.cpf,
            city: data.city,
          },
        },
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Falha ao criar usuário');

      set({
        user: null,
        userToken: authData.session?.access_token || null,
        isSignout: false,
      });

    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ==============================
  // SIGN IN
  // ==============================
  signIn: async (data: LoginData) => {
    try {
      set({ isLoading: true });

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Falha ao fazer login');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      set({
        user: profile ?? null,
        userToken: authData.session?.access_token || null,
        isSignout: false,
      });

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ==============================
  // SIGN OUT
  // ==============================
  signOut: async () => {
    try {
      set({ isLoading: true });

      await supabase.auth.signOut();

      set({
        user: null,
        userToken: null,
        isSignout: true,
      });

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ==============================
  // RESTORE SESSION
  // ==============================
  restoreToken: async () => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        set({
          user: profile ?? null,
          userToken: data.session.access_token,
          isSignout: false,
        });

      } else {
        set({
          user: null,
          userToken: null,
          isSignout: true,
        });
      }

    } catch (error) {
      console.error('Erro ao restaurar token:', error);

      set({
        user: null,
        userToken: null,
        isSignout: true,
      });

    } finally {
      set({ isLoading: false });
    }
  },

  // ==============================
  // UPDATE PROFILE
  // ==============================
  updateProfile: async (updates: Partial<Profile>) => {
    try {
      if (!updates.id) throw new Error('ID é obrigatório para atualizar');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', updates.id)
        .select()
        .maybeSingle();

      if (error) throw error;

      set({ user: data ?? null });

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },
}));

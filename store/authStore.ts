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

  signUp: async (data: SignUpData) => {
    try {
      set({ isLoading: true });

      // Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Falha ao criar usuário');

      // Criar perfil
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.full_name,
        phone: data.phone,
        cpf: data.cpf,
        city: data.city,
      });

      if (profileError) throw profileError;

      set({
        user: {
          id: authData.user.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          cpf: data.cpf,
          city: data.city,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
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

  signIn: async (data: LoginData) => {
    try {
      set({ isLoading: true });

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Falha ao fazer login');

      // Buscar perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      set({
        user: profile,
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
          .single();

        if (profileError) throw profileError;

        set({
          user: profile,
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

  updateProfile: async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', updates.id)
        .select()
        .single();

      if (error) throw error;

      set({ user: data });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },
}));

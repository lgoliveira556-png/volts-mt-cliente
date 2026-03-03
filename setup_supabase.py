#!/usr/bin/env python3
"""
Script para executar o schema SQL no Supabase
"""

import os
import sys
from supabase import create_client, Client

# Credenciais do Supabase
SUPABASE_URL = "https://ehxmonwgkimzokvkdirx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeG1vbndna2ltem9rdmtkaXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDkzMDQsImV4cCI6MjA4ODEyNTMwNH0.mZuX6LexxlfOb1SJ9FyP88Gh63rBYrSNHwVBouEVmYo"

def setup_supabase():
    """Executar schema no Supabase"""
    try:
        # Criar cliente Supabase
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print("✅ Conectado ao Supabase com sucesso!")
        print(f"URL: {SUPABASE_URL}")
        
        # Ler schema SQL
        with open('supabase/schema_fixed.sql', 'r', encoding='utf-8') as f:
            schema_sql = f.read()
        
        print("\n📋 Schema SQL carregado com sucesso!")
        print(f"Tamanho: {len(schema_sql)} caracteres")
        
        print("\n⚠️  IMPORTANTE:")
        print("=" * 60)
        print("Para executar o schema, você precisa:")
        print("1. Acessar o painel do Supabase")
        print("2. Ir para SQL Editor")
        print("3. Clicar em 'New Query'")
        print("4. Copiar e colar o conteúdo de: supabase/schema_fixed.sql")
        print("5. Clicar em 'Run'")
        print("=" * 60)
        print("\nOu execute este comando no terminal:")
        print("psql -h db.ehxmonwgkimzokvkdirx.supabase.co -U postgres -d postgres < supabase/schema_fixed.sql")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro: {str(e)}")
        return False

if __name__ == "__main__":
    success = setup_supabase()
    sys.exit(0 if success else 1)

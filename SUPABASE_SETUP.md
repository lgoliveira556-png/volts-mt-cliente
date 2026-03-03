# Setup do Supabase - Volts MT Cliente

Este guia passo a passo para configurar o Supabase com o schema do projeto.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **"New Project"**
3. Preencha os dados:
   - **Project Name**: `volts-mt-cliente`
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a mais próxima (ex: `sa-east-1` para Brasil)
4. Clique em **"Create new project"** e aguarde a criação

## 2. Executar Schema SQL

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **"New Query"**
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou Ctrl+Enter)
6. Aguarde a execução (deve completar sem erros)

## 3. Obter Credenciais

1. Vá para **Settings → API**
2. Copie:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public** (em Project API keys) → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
EXPO_PUBLIC_APP_NAME=Volts MT Cliente
EXPO_PUBLIC_SESSION_DURATION=1296000
```

## 5. Verificar Tabelas

1. Vá para **Table Editor**
2. Você deve ver as seguintes tabelas:
   - `profiles`
   - `wallets`
   - `wallet_transactions`
   - `categories`
   - `orders`
   - `order_items`
   - `order_status_history`

## 6. Testar Conexão

Execute no terminal:

```bash
npm start
```

Escolha Android (a) e teste o login/cadastro.

## 🔐 Segurança

- **Nunca compartilhe** sua chave anônima publicamente
- Use variáveis de ambiente para todas as credenciais
- O arquivo `.env.local` está no `.gitignore`

## 📝 Notas

- O schema cria automaticamente:
  - Tabelas com índices
  - Políticas de Row Level Security (RLS)
  - Triggers para atualizar `updated_at`
  - Função para gerar código de confirmação
  - Função para criar carteira ao registrar usuário

- As categorias são inseridas automaticamente:
  - Restaurantes
  - Bebidas
  - Farmácias
  - Pet Shop
  - Acessórios

## 🆘 Troubleshooting

### Erro ao executar schema

Se receber erro de permissão, certifique-se de:
- Estar logado como administrador do projeto
- Usar a conta correta do Supabase

### Tabelas não aparecem

Atualize a página do navegador (F5).

### Erro de conexão no app

Verifique:
- URL e chave estão corretas em `.env.local`
- Arquivo foi salvo
- Reinicie o app (`npm start`)

## 📚 Documentação

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)

# Volts MT Cliente

Aplicativo mobile de entregas para Cuiabá e Várzea Grande, desenvolvido com Expo, React Native e TypeScript.

## 🚀 Tecnologias

- **Expo** - Framework React Native
- **TypeScript** - Tipagem estática
- **Supabase** - Backend (Auth, Database, Realtime)
- **Zustand** - State Management
- **React Navigation** - Navegação
- **Expo Router** - Roteamento
- **Linear Gradient** - Gradientes
- **Material Icons** - Ícones

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Conta Supabase
- Conta EAS (para builds)

## 🔧 Setup

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/volts-mt-cliente.git
cd volts-mt-cliente
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
EXPO_PUBLIC_APP_NAME=Volts MT Cliente
EXPO_PUBLIC_SESSION_DURATION=1296000
```

### 4. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá para SQL Editor
4. Execute o script em `supabase/schema.sql`
5. Copie a URL e chave anônima para `.env.local`

### 5. Iniciar o app

```bash
npm start
```

Escolha a plataforma:
- `a` para Android
- `i` para iOS
- `w` para Web

## 📱 Estrutura do Projeto

```
volts-mt-cliente/
├── app/
│   ├── (auth)/              # Telas de autenticação
│   │   ├── index.tsx        # Tela inicial
│   │   ├── login.tsx        # Login
│   │   └── signup.tsx       # Cadastro
│   ├── (app)/               # Telas do app autenticado
│   │   ├── home.tsx         # Home com categorias
│   │   ├── wallet.tsx       # Carteira
│   │   ├── history.tsx      # Histórico de pedidos
│   │   └── profile.tsx      # Perfil do usuário
│   └── _layout.tsx          # Layout raiz
├── components/              # Componentes reutilizáveis
├── constants/               # Constantes
├── lib/                     # Bibliotecas
├── store/                   # State Management
├── types/                   # Tipos TypeScript
├── utils/                   # Utilitários
├── supabase/               # Scripts SQL
├── app.json                # Configuração Expo
├── eas.json                # Configuração EAS Build
└── package.json
```

## 🎨 Identidade Visual

### Cores

- **Fundo Principal**: `#0F0F14` (Preto elegante)
- **Superfície**: `#1C1C24`
- **Gradiente Primário**: `#7C3AED` → `#2563EB`
- **Texto Principal**: `#FFFFFF`
- **Texto Secundário**: `#9CA3AF`

## 🔐 Autenticação

O app usa Supabase Auth com:
- Email e senha
- Sessão persistente por 15 dias
- Armazenamento seguro com Expo Secure Store

## 💾 Banco de Dados

Tabelas principais:
- `profiles` - Dados do usuário
- `wallets` - Carteira digital
- `wallet_transactions` - Histórico de movimentações
- `orders` - Pedidos
- `categories` - Categorias de produtos

## 🚀 Build e Deploy

### Build para Android APK (desenvolvimento)

```bash
eas build --platform android --profile development
```

### Build para Android AAB (produção)

```bash
eas build --platform android --profile production
```

## 📝 Funcionalidades

- ✅ Autenticação com email/senha
- ✅ Cadastro com validação de CPF
- ✅ Home com categorias
- ✅ Carteira digital
- ✅ Histórico de pedidos
- ✅ Perfil do usuário
- ✅ Integração Supabase
- ✅ Identidade visual completa

## 📄 Licença

MIT

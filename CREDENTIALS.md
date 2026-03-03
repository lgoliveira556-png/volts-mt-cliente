# Credenciais de Teste - Volts MT Cliente

## 🔐 Contas de Teste

Após configurar o Supabase, você pode criar contas de teste usando a interface do app.

### Dados de Exemplo para Teste

**Usuário 1:**
- Email: `teste1@voltsmtcliente.com`
- Senha: `Teste@123`
- Nome: `João Silva`
- Telefone: `(65) 99999-0001`
- CPF: `123.456.789-10`
- Cidade: `Cuiabá`

**Usuário 2:**
- Email: `teste2@voltsmtcliente.com`
- Senha: `Teste@123`
- Nome: `Maria Santos`
- Telefone: `(65) 99999-0002`
- CPF: `987.654.321-09`
- Cidade: `Várzea Grande`

## 📱 Como Testar

### 1. Criar Conta

1. Abra o app
2. Clique em "Criar Conta"
3. Preencha os dados acima
4. Clique em "Criar Conta"

### 2. Fazer Login

1. Clique em "Entrar"
2. Use email e senha criados
3. Marque "Manter sessão ativa por 15 dias"
4. Clique em "Entrar"

### 3. Explorar Telas

- **Home**: Veja as categorias
- **Carteira**: Veja o saldo (inicialmente R$ 0,00)
- **Histórico**: Veja pedidos (inicialmente vazio)
- **Perfil**: Edite seus dados

## 🧪 Testes Recomendados

### Autenticação
- [ ] Criar conta com dados válidos
- [ ] Tentar criar conta com email duplicado
- [ ] Tentar login com senha errada
- [ ] Verificar se sessão persiste após fechar app
- [ ] Fazer logout

### Validações
- [ ] Email inválido
- [ ] CPF inválido
- [ ] Telefone inválido (não de Cuiabá/Várzea Grande)
- [ ] Senhas não conferem
- [ ] Campos vazios

### Navegação
- [ ] Navegar entre abas (Home, Carteira, Histórico, Perfil)
- [ ] Voltar nas telas de autenticação
- [ ] Editar perfil

## 📊 Verificar Dados no Supabase

1. Vá para [supabase.com](https://supabase.com)
2. Acesse seu projeto
3. Vá para **Table Editor**
4. Clique em **profiles** para ver usuários criados
5. Clique em **wallets** para ver carteiras criadas

## 🔗 Conexão com Expo Go

### Android

1. Instale **Expo Go** do Google Play
2. No terminal, execute: `npm start`
3. Escaneie o QR code com a câmera do Android
4. O app abrirá no Expo Go

### iOS

1. Instale **Expo Go** da App Store
2. No terminal, execute: `npm start`
3. Abra o Expo Go e escaneie o QR code

## 📝 Notas

- As credenciais de teste são **apenas para desenvolvimento**
- Não use dados reais de CPF em testes
- Limpe dados de teste antes de ir para produção
- Altere as senhas padrão em produção

## 🆘 Problemas Comuns

### "Email já existe"

Significa que a conta foi criada com sucesso. Use outro email para testar.

### "Sessão expirada"

Faça login novamente. A sessão dura 15 dias.

### "Erro ao conectar"

Verifique:
- Variáveis de ambiente em `.env.local`
- Conexão com internet
- URL do Supabase está correta

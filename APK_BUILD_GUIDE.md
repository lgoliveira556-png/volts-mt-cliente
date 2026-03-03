# 📱 Guia Completo - Como Gerar APK do Volts MT Cliente

Este guia mostra como gerar um APK (Android Package) para distribuir seu app.

## 🔧 Pré-requisitos

1. **Node.js 18+** instalado
2. **npm** ou **yarn**
3. **Conta EAS** (gratuita em [eas.dev](https://eas.dev))
4. **Expo CLI** instalado globalmente

### Instalar Expo CLI

```bash
npm install -g expo-cli
```

### Instalar EAS CLI

```bash
npm install -g eas-cli
```

---

## 📋 Opção 1: Build com EAS (Recomendado)

EAS é a forma mais fácil e confiável de gerar APK. Você não precisa de Android Studio ou SDK.

### Passo 1: Criar Conta EAS

1. Acesse [eas.dev](https://eas.dev)
2. Clique em **"Sign up"**
3. Use sua conta GitHub ou email
4. Confirme o email

### Passo 2: Fazer Login no EAS

```bash
eas login
```

Você será redirecionado para o navegador. Faça login com suas credenciais.

### Passo 3: Configurar Projeto

```bash
cd /home/ubuntu/volts-mt-cliente
eas build:configure
```

Escolha:
- Platform: **Android**
- Build type: **APK** (para desenvolvimento) ou **AAB** (para Play Store)

### Passo 4: Iniciar Build

#### Para APK (Desenvolvimento)

```bash
eas build --platform android --profile development
```

#### Para APK (Produção)

```bash
eas build --platform android --profile preview
```

#### Para AAB (Google Play Store)

```bash
eas build --platform android --profile production
```

### Passo 5: Acompanhar Build

O build será processado na nuvem. Você verá:

```
✓ Build started
  https://eas.dev/builds/...

Waiting for build to complete...
```

Isso pode levar **5-15 minutos**. Você pode fechar o terminal e acompanhar em [eas.dev/builds](https://eas.dev/builds).

### Passo 6: Baixar APK

Quando o build terminar, você verá:

```
✓ Build finished
  Download: https://...apk
```

Clique no link ou acesse o dashboard do EAS para baixar.

---

## 🏗️ Opção 2: Build Local (Avançado)

Se quiser fazer build localmente, você precisa do Android SDK.

### Pré-requisitos

1. **Android Studio** instalado
2. **Android SDK** (mínimo API 24)
3. **Java Development Kit (JDK)** 11+

### Passo 1: Instalar Dependências

```bash
# Instalar dependências do projeto
npm install

# Instalar Expo CLI
npm install -g expo-cli
```

### Passo 2: Gerar APK

```bash
cd /home/ubuntu/volts-mt-cliente
expo build:android -t apk
```

Você será solicitado a:
- Fazer login na Expo
- Escolher se quer usar keystore existente ou criar novo

### Passo 3: Acompanhar Build

O build será processado. Você pode verificar o status em [expo.dev/builds](https://expo.dev/builds).

---

## 📥 Instalando o APK

### No Android Físico

1. **Baixe o APK** para seu computador
2. **Transfira para o Android** (via USB ou email)
3. **Abra o arquivo** no Android
4. **Permita instalação** de fontes desconhecidas (se necessário)
5. **Clique em Instalar**

### No Emulador Android

```bash
# Instalar APK no emulador
adb install caminho/para/volts-mt-cliente.apk
```

---

## 🔑 Configurações Importantes

### app.json

Certifique-se de que `app.json` está configurado corretamente:

```json
{
  "expo": {
    "name": "Volts MT Cliente",
    "slug": "volts-mt-cliente",
    "version": "1.0.0",
    "android": {
      "package": "com.voltsmtcliente.app",
      "versionCode": 1
    }
  }
}
```

### eas.json

Verifique `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

---

## 🚀 Fluxo Rápido (Resumido)

```bash
# 1. Instalar EAS CLI
npm install -g eas-cli

# 2. Fazer login
eas login

# 3. Gerar APK
cd /home/ubuntu/volts-mt-cliente
eas build --platform android --profile development

# 4. Aguardar e baixar
# Você receberá um link para download
```

---

## 📊 Comparação: EAS vs Build Local

| Aspecto | EAS | Build Local |
|---------|-----|-------------|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Tempo** | 5-15 min | 10-30 min |
| **Requisitos** | Conta EAS | Android SDK |
| **Custo** | Gratuito (com limite) | Gratuito |
| **Confiabilidade** | Alta | Depende da máquina |
| **Recomendado** | ✅ Sim | ❌ Não |

---

## 🐛 Troubleshooting

### Erro: "Build failed"

**Solução:**
1. Verifique se `app.json` está correto
2. Verifique se `.env.local` tem credenciais válidas
3. Tente novamente: `eas build --platform android --profile development`

### Erro: "Not authenticated"

**Solução:**
```bash
eas logout
eas login
```

### Erro: "Invalid package name"

**Solução:** Altere `android.package` em `app.json` para um nome válido:
```json
"android": {
  "package": "com.voltsmtcliente.app"
}
```

### Build muito lento

**Solução:** Isso é normal. EAS processa na nuvem. Você pode fechar o terminal e acompanhar em [eas.dev/builds](https://eas.dev/builds).

---

## 📱 Testando o APK

### Verificar Funcionalidades

- [ ] Tela inicial carrega
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Home mostra categorias
- [ ] Carteira mostra saldo
- [ ] Histórico mostra pedidos
- [ ] Perfil mostra dados

### Verificar Conexão Supabase

- [ ] Consegue fazer login
- [ ] Dados são salvos no banco
- [ ] Sessão persiste após fechar app

---

## 📈 Próximas Versões

Para atualizar a versão:

1. Altere `version` em `app.json`:
```json
"version": "1.0.1"
```

2. Altere `versionCode` em `app.json`:
```json
"android": {
  "versionCode": 2
}
```

3. Faça novo build:
```bash
eas build --platform android --profile production
```

---

## 🔗 Links Úteis

- **EAS Docs**: https://docs.expo.dev/eas/
- **EAS Build**: https://eas.dev/builds
- **Expo Docs**: https://docs.expo.dev/
- **Android Docs**: https://developer.android.com/

---

## ✅ Checklist Antes de Publicar

- [ ] Testou o APK em dispositivo real
- [ ] Verificou todas as funcionalidades
- [ ] Atualizou `version` e `versionCode`
- [ ] Configurou `android.package` corretamente
- [ ] Testou login/cadastro com Supabase
- [ ] Verificou identidade visual
- [ ] Criou screenshots para Play Store

---

## 🎉 Pronto!

Seu APK está pronto para distribuição! 

**Próximos passos:**
1. Distribuir para testers
2. Coletar feedback
3. Corrigir bugs
4. Publicar na Google Play Store (opcional)

Boa sorte! 🚀

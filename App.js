import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ─── Navigators ──────────────────────────────────────────────────────────────

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Reusable UI Components ───────────────────────────────────────────────────

function Avatar({ source, size = 64 }) {
  return (
    <Image
      source={{ uri: source }}
      style={[baseStyles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

function Heading({ children }) {
  return <Text style={baseStyles.heading}>{children}</Text>;
}

function Title({ children, style }) {
  return <Text style={[baseStyles.title, style]}>{children}</Text>;
}

function WoofCard({ name, avatar }) {
  return (
    <View style={woofCardStyles.card}>
      <Avatar source={avatar} size={62} />
      <Title style={woofCardStyles.name}>{name}</Title>
    </View>
  );
}

function WoofPost({ image, title, description }) {
  return (
    <View style={woofPostStyles.container}>
      <Image source={{ uri: image }} style={woofPostStyles.image} />
      <View style={woofPostStyles.content}>
        <Title style={woofPostStyles.postTitle}>{title}</Title>
        <Text style={woofPostStyles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

// ─── Tab Screens ──────────────────────────────────────────────────────────────

function HomeScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <ScrollView contentContainerStyle={screenStyles.container}>
        <Heading>Trending Woofs</Heading>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={screenStyles.woofsRow}
        >
          {data.woofs.map((woof) => (
            <WoofCard key={woof.id} name={woof.name.toUpperCase()} avatar={woof.avatar} />
          ))}
        </ScrollView>

        <Heading>New Woof Posts</Heading>

        <View style={screenStyles.postsList}>
          {data.posts.map((post) => (
            <WoofPost
              key={post.id}
              image={post.image}
              title={post.title.toUpperCase()}
              description={post.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeedScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <View style={placeholderStyles.container}>
        <Text style={placeholderStyles.emoji}>🐾</Text>
        <Text style={placeholderStyles.title}>Feed</Text>
        <Text style={placeholderStyles.subtitle}>Your woof feed will appear here</Text>
      </View>
    </SafeAreaView>
  );
}

function AccountScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <View style={placeholderStyles.container}>
        <Text style={placeholderStyles.emoji}>🐶</Text>
        <Text style={placeholderStyles.title}>Account</Text>
        <Text style={placeholderStyles.subtitle}>Manage your woof profile here</Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Main (Tab) Navigator ─────────────────────────────────────────────────────

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#261B5E',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: tabStyles.bar,
        tabBarLabelStyle: tabStyles.label,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// ─── Auth Screens ─────────────────────────────────────────────────────────────

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <View style={authStyles.container}>
        <Text style={authStyles.logo}>🐾</Text>
        <Text style={authStyles.appName}>Woofstagram</Text>
        <Text style={authStyles.tagline}>Compartilhe seus woofs favoritos</Text>

        <View style={signUpStyles.form}>
          <InputWithLabel
            label="E-mail"
            placeholder="voce@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputWithLabel
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={authStyles.primaryButton}
          onPress={handleSignIn}
          activeOpacity={0.85}
        >
          <Text style={authStyles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} activeOpacity={0.7}>
          <Text style={authStyles.linkText}>Não tem conta? Ir para cadastro</Text>
        </TouchableOpacity>

        <Text style={authStyles.hintText}>Acesso liberado sem autenticação de credenciais</Text>
      </View>
    </SafeAreaView>
  );
}

function InputWithLabel({ label, ...inputProps }) {
  return (
    <View style={signUpStyles.fieldWrapper}>
      <Text style={signUpStyles.label}>{label}</Text>
      <TextInput
        style={signUpStyles.input}
        placeholderTextColor="#9CA3AF"
        {...inputProps}
      />
    </View>
  );
}

function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [petName, setPetName] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [favoriteToy, setFavoriteToy] = useState('');

  function formatBirthdayInput(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);

    if (digits.length <= 2) {
      return digits;
    }

    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  function handleCreateAccount() {
    if (!passwordsMatch) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={signUpStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={authStyles.logo}>🐾</Text>
          <Text style={authStyles.appName}>Criar Conta</Text>
          <Text style={authStyles.tagline}>Junte-se à comunidade woof</Text>

          <View style={signUpStyles.form}>
            <InputWithLabel
              label="E-mail"
              placeholder="voce@exemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputWithLabel
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputWithLabel
              label="Confirmar senha"
              placeholder="Digite novamente"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <InputWithLabel
              label="Nome do pet"
              placeholder="Ex: Thor"
              value={petName}
              onChangeText={setPetName}
              autoCapitalize="words"
            />
            <InputWithLabel
              label="Data de aniversário"
              placeholder="DD/MM/AAAA"
              value={petBirthday}
              onChangeText={(value) => setPetBirthday(formatBirthdayInput(value))}
              keyboardType="numeric"
              maxLength={10}
            />
            <InputWithLabel
              label="Raça"
              placeholder="Ex: Golden Retriever"
              value={petBreed}
              onChangeText={setPetBreed}
              autoCapitalize="words"
            />
            <InputWithLabel
              label="Brinquedo favorito"
              placeholder="Ex: Bolinha"
              value={favoriteToy}
              onChangeText={setFavoriteToy}
              autoCapitalize="words"
            />

            <View style={signUpStyles.liveDataBox}>
              <Text style={signUpStyles.liveTitle}>Valores em tempo real</Text>
              <Text style={signUpStyles.liveItem}>Email: {email || '-'}</Text>
              <Text style={signUpStyles.liveItem}>Senha: {password ? '*'.repeat(password.length) : '-'}</Text>
              <Text style={signUpStyles.liveItem}>Confirma senha: {confirmPassword ? '*'.repeat(confirmPassword.length) : '-'}</Text>
              <Text style={signUpStyles.liveItem}>Nome do pet: {petName || '-'}</Text>
              <Text style={signUpStyles.liveItem}>Aniversário: {petBirthday || '-'}</Text>
              <Text style={signUpStyles.liveItem}>Raça: {petBreed || '-'}</Text>
              <Text style={signUpStyles.liveItem}>Brinquedo favorito: {favoriteToy || '-'}</Text>
              <Text
                style={[
                  signUpStyles.passwordStatus,
                  passwordsMatch ? signUpStyles.ok : signUpStyles.error,
                ]}
              >
                {password.length === 0 && confirmPassword.length === 0
                  ? 'Digite senha e confirmação'
                  : passwordsMatch
                  ? 'Senhas conferem ✓'
                  : 'Senhas não conferem ✗'}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                !passwordsMatch && signUpStyles.primaryButtonDisabled,
              ]}
              onPress={handleCreateAccount}
              activeOpacity={0.85}
            >
              <Text style={authStyles.primaryButtonText}>Criar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Text style={authStyles.linkText}>Já tem uma conta? Entre aqui</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const baseStyles = StyleSheet.create({
  avatar: {
    backgroundColor: '#D4D4D8',
  },
  heading: {
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#111827',
    marginBottom: 14,
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#261B5E',
  },
});

const woofCardStyles = StyleSheet.create({
  card: {
    width: 118,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8DF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    marginTop: 12,
    textAlign: 'center',
  },
});

const woofPostStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
  },
  image: {
    flex: 1,
    height: 108,
    borderRadius: 14,
  },
  content: {
    flex: 2,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  postTitle: {
    marginBottom: 6,
    lineHeight: 18,
  },
  description: {
    color: '#2E2566',
    fontSize: 16,
    lineHeight: 22,
  },
});

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F4',
  },
  container: {
    paddingTop: 12,
    paddingBottom: 30,
  },
  woofsRow: {
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  postsList: {
    paddingHorizontal: 18,
  },
});

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#261B5E',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#261B5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  hintText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#261B5E',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4,
  },
});

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingTop: 4,
    height: 60,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

const signUpStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 36,
  },
  form: {
    width: '100%',
    marginTop: 8,
  },
  fieldWrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#111827',
  },
  liveDataBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  liveTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3730A3',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  liveItem: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 3,
  },
  passwordStatus: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  ok: {
    color: '#16A34A',
  },
  error: {
    color: '#DC2626',
  },
});

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
  },
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const data = {
  woofs: [
    {
      id: 'woof-1',
      name: 'Rex',
      avatar:
        'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=648&q=80',
    },
    {
      id: 'woof-2',
      name: 'Ball-r',
      avatar:
        'https://images.unsplash.com/photo-1585584114963-503344a119b0?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-3',
      name: 'Happy',
      avatar:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-4',
      name: 'Fluffy',
      avatar:
        'https://images.unsplash.com/photo-1554956615-1ba6dc39921b?auto=format&fit=crop&h=64&q=80',
    },
    {
      id: 'woof-5',
      name: 'Spirit',
      avatar:
        'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?auto=format&fit=crop&h=64&q=80',
    },
  ],
  posts: [
    {
      id: 'post-1',
      image:
        'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=967&q=80',
      title: 'Happy Woofs',
      description:
        "How to keep your woof happy and healthy. We've asked some of the best experts out there.",
    },
    {
      id: 'post-2',
      image:
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=850&q=80',
      title: 'Woofs & friends',
      description: 'Best friends are important for humans, but also for dogs.',
    },
    {
      id: 'post-3',
      image:
        'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae?auto=format&fit=crop&w=634&q=80',
      title: 'Good Woofs',
      description: 'When they behave right, they are not a danger to society.',
    },
    {
      id: 'post-4',
      image:
        'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1100&q=80',
      title: 'Wild Woofs',
      description: 'Wild woofs can be common in some places. Learn safe interactions.',
    },
    {
      id: 'post-5',
      image:
        'https://images.unsplash.com/photo-1567014543648-e4391c989aab?auto=format&fit=crop&w=1050&q=80',
      title: 'Sleepy Woofs',
      description: 'Sleep is just as important for woofs as it is for humans.',
    },
    {
      id: 'post-6',
      image:
        'https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?auto=format&fit=crop&w=967&q=80',
      title: 'Exploring Woofs',
      description: 'How do woofs explore the world around them every day?',
    },
  ],
};

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';

function InputWithLabel({ label, placeholder, value, onChangeText, secureTextEntry = false }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8A8A8A"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}

function ManualForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [petName, setPetName] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [favoriteToy, setFavoriteToy] = useState('');

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <View>
      <Text style={styles.sectionTitle}>Cadastro com useState</Text>

      <InputWithLabel
        label="E-mail"
        placeholder="voce@exemplo.com"
        value={email}
        onChangeText={setEmail}
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
      />
      <InputWithLabel
        label="Data de aniversario"
        placeholder="DD/MM/AAAA"
        value={petBirthday}
        onChangeText={setPetBirthday}
      />
      <InputWithLabel
        label="Raca"
        placeholder="Ex: Golden Retriever"
        value={petBreed}
        onChangeText={setPetBreed}
      />
      <InputWithLabel
        label="Brinquedo favorito"
        placeholder="Ex: Bolinha"
        value={favoriteToy}
        onChangeText={setFavoriteToy}
      />

      <View style={styles.liveDataBox}>
        <Text style={styles.liveTitle}>Valores em tempo real</Text>
        <Text style={styles.liveItem}>Email: {email || '-'}</Text>
        <Text style={styles.liveItem}>Senha: {password ? '***' : '-'}</Text>
        <Text style={styles.liveItem}>Confirma senha: {confirmPassword ? '***' : '-'}</Text>
        <Text style={styles.liveItem}>Nome do pet: {petName || '-'}</Text>
        <Text style={styles.liveItem}>Aniversario: {petBirthday || '-'}</Text>
        <Text style={styles.liveItem}>Raca: {petBreed || '-'}</Text>
        <Text style={styles.liveItem}>Brinquedo favorito: {favoriteToy || '-'}</Text>
        <Text style={[styles.passwordStatus, passwordsMatch ? styles.ok : styles.error]}>
          {password.length === 0 && confirmPassword.length === 0
            ? 'Digite senha e confirmacao'
            : passwordsMatch
              ? 'Senhas conferem'
              : 'Senhas nao conferem'}
        </Text>
      </View>
    </View>
  );
}

function FormikForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        petName: '',
        petBirthday: '',
        petBreed: '',
        favoriteToy: '',
      }}
      onSubmit={(values) => {
        if (values.password !== values.confirmPassword) {
          console.log('Erro: senhas nao conferem.');
          return;
        }

        console.log('Dados do formulario enviados:', values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <View>
          <Text style={styles.sectionTitle}>Cadastro com Formik</Text>

          <InputWithLabel
            label="E-mail"
            placeholder="voce@exemplo.com"
            value={values.email}
            onChangeText={handleChange('email')}
          />
          <InputWithLabel
            label="Senha"
            placeholder="Digite sua senha"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
          />
          <InputWithLabel
            label="Confirmar senha"
            placeholder="Digite novamente"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry
          />
          <InputWithLabel
            label="Nome do pet"
            placeholder="Ex: Thor"
            value={values.petName}
            onChangeText={handleChange('petName')}
          />
          <InputWithLabel
            label="Data de aniversario"
            placeholder="DD/MM/AAAA"
            value={values.petBirthday}
            onChangeText={handleChange('petBirthday')}
          />
          <InputWithLabel
            label="Raca"
            placeholder="Ex: Golden Retriever"
            value={values.petBreed}
            onChangeText={handleChange('petBreed')}
          />
          <InputWithLabel
            label="Brinquedo favorito"
            placeholder="Ex: Bolinha"
            value={values.favoriteToy}
            onChangeText={handleChange('favoriteToy')}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar com Formik</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

export default function App() {
  const [mode, setMode] = useState('manual');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Woofstagram</Text>
        <Text style={styles.subtitle}>Instagram para pets</Text>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchButton, mode === 'manual' && styles.switchButtonActive]}
            onPress={() => setMode('manual')}
          >
            <Text style={styles.switchText}>useState</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchButton, mode === 'formik' && styles.switchButtonActive]}
            onPress={() => setMode('formik')}
          >
            <Text style={styles.switchText}>Formik</Text>
          </TouchableOpacity>
        </View>

        {mode === 'manual' ? <ManualForm /> : <FormikForm />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F7EF',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 18,
  },
  switchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  switchButton: {
    flex: 1,
    backgroundColor: '#ECE8DB',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  switchButtonActive: {
    backgroundColor: '#D7A86E',
  },
  switchText: {
    fontWeight: '700',
    color: '#1D1D1D',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2E2E2E',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#3A3A3A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7C1B0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1F1F1F',
  },
  liveDataBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D2BD',
    backgroundColor: '#FFFCF3',
  },
  liveTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#2A2A2A',
  },
  liveItem: {
    fontSize: 13,
    marginBottom: 4,
    color: '#3A3A3A',
  },
  passwordStatus: {
    marginTop: 8,
    fontWeight: '700',
  },
  ok: {
    color: '#1E7D38',
  },
  error: {
    color: '#B32020',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

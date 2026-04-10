# Woofstagram (Projeto 7)

Aplicativo React Native com formulario de inscricao para pets.

Este projeto inclui duas abordagens:

- Formulario com estado local usando `useState`
- Formulario com biblioteca de terceiros usando `Formik`

Campos implementados:

- E-mail
- Senha
- Confirmar senha
- Nome do pet
- Data de aniversario
- Raca
- Brinquedo favorito

## Requisitos atendidos

- Componente reutilizavel `InputWithLabel`
- Uso de `ScrollView` para suportar telas menores
- Senha com `secureTextEntry`
- Validacao de senha no envio da versao Formik

## Como executar

1. Instale dependencias:

```bash
npm install
```

2. Inicie o app:

```bash
npm run start
```

3. Abra no Expo Go, emulador Android/iOS ou navegador.

## Snack

Para usar no Expo Snack, copie o conteudo de `App.js` e adicione a dependencia `formik` no painel de dependencias do Snack.
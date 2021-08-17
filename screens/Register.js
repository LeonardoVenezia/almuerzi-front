import React from "react";
import { Alert, View, StyleSheet, TextInput, Text, Button } from "react-native";

import useForm from "../hooks/useForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});

const Login = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    fetch("https://serverless-leovenezia.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        if (x === "Usuario creado con éxito") {
          return Alert.alert("Éxito", x, [
            { text: "Ir al inicio", onPress: navigation.navigate("Login") },
          ]);
        }
        Alert.alert("Error", x);
      });
  };
  const { suscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <TextInput
        autoCapitalize="none"
        value={inputs.email}
        style={styles.input}
        placeholder="Email"
        onChangeText={suscribe("email")}
      />
      <TextInput
        autoCapitalize="none"
        value={inputs.password}
        style={styles.input}
        placeholder="Password"
        onChangeText={suscribe("password")}
        secureTextEntry={true}
      />
      <Button title="Enviar" onPress={handleSubmit} />
      <Button
        title="Volver al inicio"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

export default Login;

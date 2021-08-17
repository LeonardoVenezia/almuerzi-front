import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";

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
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        try {
          return JSON.parse(x);
        } catch {
          throw x;
        }
      })
      .then((x) => {
        AsyncStorage.setItem("token", x.token);
        navigation.navigate("Meals");
      })
      .catch((e) => Alert.alert("Error", e));
  };

  const { suscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
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
        onChangeText={suscribe("password")}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Iniciar sesión" onPress={handleSubmit} />
      <Button
        title="Registrarse"
        onPress={() => {
          navigation.navigate("register");
        }}
      />
    </View>
  );
};

export default Login;

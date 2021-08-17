import React from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    "https://serverless-leovenezia.vercel.app/api/meals/" + id
  );
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{data._id}</Text>
      <Text>{data.name}</Text>
      <Text>{data.desc}</Text>
      <Button
        title="Aceptar"
        onPress={() => {
          AsyncStorage.getItem("token").then((x) => {
            if (x) {
              fetch("https://serverless-leovenezia.vercel.app/api/orders", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: x,
                },
                body: JSON.stringify({
                  meal_id: id,
                }),
              }).then((x) => {
                if (x.status !== 201) {
                  return alert("La orden no pudo ser generada");
                }
                alert("Orden generada con éxito");
                navigation.navigate("Meals");
              });
            }
          });
        }}
      ></Button>
      <Button
        title="Cancelar"
        onPress={() => navigation.navigate("Meals")}
      ></Button>
    </View>
  );
};

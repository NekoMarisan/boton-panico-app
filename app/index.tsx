/*import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    //await AsyncStorage.removeItem("usuarioRegistrado"); // solo para pruebas

    const registrado = await AsyncStorage.getItem("usuarioRegistrado");

    if (registrado === "true") {
      router.replace("/panic");
    } else {
      router.replace("/permissions");
    }
  };

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" />
    </View>
  );
}*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    router.replace("/testscreen" as any);
  };

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" />
    </View>
  );
}
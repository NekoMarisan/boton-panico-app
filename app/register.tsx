import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import * as Notifications from 'expo-notifications';
import { supabase } from '../services/supabase';

export default function Register() {

  const params = useLocalSearchParams();

  const nombreScan = typeof params.nombre === "string" ? params.nombre : "";
  const ciScan = typeof params.ci === "string" ? params.ci : "";
  const fotoCI = typeof params.foto === "string" ? params.foto : "";
  const selfie = typeof params.selfie === "string" ? params.selfie : "";

  const [nombre, setNombre] = useState(nombreScan);
  const [ci, setCi] = useState(ciScan);
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");

  const guardarUsuario = async () => {

    if (!nombre || !ci || !celular) {
      Alert.alert("Error", "Debes completar los campos obligatorios");
      return;
    }

    try {

      // Pedir permiso y obtener push token
      const { status } = await Notifications.requestPermissionsAsync();
      let pushToken = null;

      if (status === 'granted') {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        pushToken = tokenData.data;
      }

      // Insertar usuario en Supabase incluyendo el push_token
      const { data, error } = await supabase
        .from('usuario_ciudadano')
        .insert([{
          nombre_completo: nombre,
          ci,
          celular,
          email,
          foto_ci: fotoCI,
          selfie,
          push_token: pushToken,
          id_estado_ciudadano: 2
        }])
        .select()
        .single();

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // Guardar localmente
      await AsyncStorage.setItem("usuarioDatos", JSON.stringify(data));
      await AsyncStorage.setItem("usuarioRegistrado", "true");

      Alert.alert(
        "Registro exitoso",
        "Usuario registrado correctamente",
        [
          {
            text: "Continuar",
            onPress: () => router.replace("/panic")
          }
        ]
      );

    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        REGISTRAR USUARIO
      </Text>

      {fotoCI ? (
        <Image
          source={{ uri: fotoCI }}
          style={styles.avatar}
        />
      ) : (
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          No hay foto disponible
        </Text>
      )}

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de usuario"
      />

      <TextInput
        style={styles.input}
        value={ci}
        onChangeText={setCi}
        placeholder="C.I."
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        value={celular}
        onChangeText={setCelular}
        placeholder="Celular"
        keyboardType="phone-pad"
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable
        style={styles.button}
        onPress={guardarUsuario}
      >
        <Text style={styles.buttonText}>
          REGISTRAR USUARIO
        </Text>
      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },

  title: {
    textAlign: "center",
    color: "#0b5f1b",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#0b5f1b"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: "#0b5f1b",
    padding: 15,
    borderRadius: 8,
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});
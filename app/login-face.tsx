import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function Register() {

  /* recibir datos enviados desde scanDni */
  const params = useLocalSearchParams();

  // 👇 aseguramos que sean strings
  const nombreScan = typeof params.nombre === "string" ? params.nombre : "";
  const ciScan = typeof params.ci === "string" ? params.ci : "";
  const fotoCI = typeof params.foto === "string" ? params.foto : "";

  /* estados del formulario */
  const [nombre,setNombre] = useState(nombreScan);
  const [ci,setCi] = useState(ciScan);
  const [celular,setCelular] = useState("");
  const [email,setEmail] = useState("");

  /* guardar usuario */
  const guardarUsuario = async () => {

    if(!nombre || !ci || !celular){
      Alert.alert("Error","Debes completar los campos obligatorios");
      return;
    }

    try{

      const response = await fetch("http://192.168.11.115:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          ci,
          celular,
          email,
          foto_ci: fotoCI,   // ✅ ahora sí existe
          selfie: fotoCI     // ⚠️ temporal (luego usarás selfie real)
        })
      });

      const data = await response.json();

      if(!response.ok){
        Alert.alert("Error", data.error || "No se pudo registrar");
        return;
      }

      // guardar localmente
      await AsyncStorage.setItem("usuarioDatos", JSON.stringify(data));
      await AsyncStorage.setItem("usuarioRegistrado","true");

      Alert.alert(
        "Registro exitoso",
        "Usuario registrado correctamente",
        [
          {
            text:"Continuar",
            onPress:()=> router.replace("/panic")
          }
        ]
      );

    }catch(error){
      Alert.alert("Error","No se pudo conectar con el servidor");
    }

  };

  return(

    <View style={styles.container}>

      <Text style={styles.title}>
        REGISTRAR USUARIO
      </Text>

      {/* mostrar foto del carnet */}
      {fotoCI ? (
        <Image
          source={{uri:fotoCI}}
          style={styles.avatar}
        />
      ) : (
        <Text style={{textAlign:"center", marginBottom:20}}>
          No hay foto disponible
        </Text>
      )}

      {/* nombre */}
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de usuario"
      />

      {/* CI */}
      <TextInput
        style={styles.input}
        value={ci}
        onChangeText={setCi}
        placeholder="C.I."
        keyboardType="numeric"
        maxLength={10}
      />

      {/* celular */}
      <TextInput
        style={styles.input}
        value={celular}
        onChangeText={setCelular}
        placeholder="Celular"
        keyboardType="phone-pad"
        maxLength={8}
      />

      {/* email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* botón */}
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

  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:20
  },

  title:{
    textAlign:"center",
    color:"#0b5f1b",
    fontWeight:"bold",
    fontSize:20,
    marginBottom:20
  },

  avatar:{
    width:140,
    height:140,
    borderRadius:10,
    alignSelf:"center",
    marginBottom:20,
    borderWidth:3,
    borderColor:"#0b5f1b"
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:8,
    padding:12,
    marginBottom:15
  },

  button:{
    backgroundColor:"#0b5f1b",
    padding:15,
    borderRadius:8,
    marginTop:10
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }

});
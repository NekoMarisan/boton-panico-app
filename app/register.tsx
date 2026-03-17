import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function Register() {

/* recibir datos enviados desde scanDni */

const { nombre: nombreScan, ci: ciScan, fotoCI } = useLocalSearchParams();

/* estados del formulario */

const [nombre,setNombre] = useState(nombreScan || "");
const [ci,setCi] = useState(ciScan || "");
const [celular,setCelular] = useState("");
const [email,setEmail] = useState("");

/* guardar usuario */

const guardarUsuario = async () => {

/* validar campos */

if(!nombre || !ci || !celular){

Alert.alert(
"Error",
"Debes completar todos los campos obligatorios"
);

return;

}

/* validar celular */

if(celular.length < 8){

Alert.alert(
"Error",
"El número de celular debe tener 8 dígitos"
);

return;

}

/* crear objeto usuario */

const usuario = {

nombre,
ci,
celular,
email,

/* foto del carnet obtenida del escaneo */

fotoCI

};

try{

/* guardar datos */

await AsyncStorage.setItem(
"usuarioDatos",
JSON.stringify(usuario)
);

/* marcar usuario registrado */

await AsyncStorage.setItem(
"usuarioRegistrado",
"true"
);

/* ir a verificación facial */

Alert.alert(
"Registro completado",
"Ahora debes verificar tu identidad con una selfie",
[
{
text:"Continuar",
onPress:()=> router.replace("/login-face")
}
]
);

}catch(error){

Alert.alert(
"Error",
"No se pudo guardar la información"
);

}

};

return(

<View style={styles.container}>

<Text style={styles.title}>
REGISTRAR USUARIO
</Text>

{/* mostrar foto del carnet */}

{fotoCI && (

<Image
source={{uri:fotoCI}}
style={styles.avatar}
/>

)}

{/* nombre (llenado automáticamente desde el carnet) */}

<TextInput
style={styles.input}
value={nombre}
onChangeText={setNombre}
placeholder="Nombre de usuario"
/>

{/* CI (llenado automáticamente desde el carnet) */}

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

{/* botón registrar */}

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
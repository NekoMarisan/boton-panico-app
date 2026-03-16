import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Register() {

const [nombre,setNombre] = useState("Juan Perez");
const [ci,setCi] = useState("1234567");
const [celular,setCelular] = useState("");
const [email,setEmail] = useState("");

const foto = "https://i.imgur.com/2yaf2wb.png";

const guardarUsuario = async () => {

if(!nombre || !ci || !celular){
Alert.alert("Error","Debes completar todos los campos obligatorios");
return;
}

if(celular.length < 8){
Alert.alert("Error","El número de celular debe tener 8 dígitos");
return;
}

const usuario = {
nombre,
ci,
celular,
email
};

try{

await AsyncStorage.setItem(
"usuarioDatos",
JSON.stringify(usuario)
);

await AsyncStorage.setItem(
"usuarioRegistrado",
"true"
);

Alert.alert(
"Registro completado",
"Se han registrado tus datos correctamente",
[
{
text:"Continuar",
onPress:()=> router.replace("/panic")
}
]
);

}catch(error){

Alert.alert("Error","No se pudo guardar la información");

}

};

return(

<View style={styles.container}>

<Text style={styles.title}>REGISTRAR USUARIO</Text>

<Image
source={{uri:foto}}
style={styles.avatar}
/>

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

container:{
flex:1,
backgroundColor:"#fff",
padding:20
},

title:{
textAlign:"center",
color:"#0b5f1b",
fontWeight:"bold",
fontSize:18,
marginBottom:20
},

avatar:{
width:120,
height:120,
borderRadius:60,
alignSelf:"center",
marginBottom:20,
borderWidth:4,
borderColor:"#0b5f1b"
},

input:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
padding:10,
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
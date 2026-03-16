import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

export default function Perfil(){

const [usuario,setUsuario] = useState(null);

useEffect(()=>{
cargarUsuario();
},[]);

const cargarUsuario = async () => {

const datos = await AsyncStorage.getItem("usuarioDatos");

if(datos){
setUsuario(JSON.parse(datos));
}

};

return(

<View style={{flex:1}}>

<Header title="PERFIL DE USUARIO"/>

<ScrollView contentContainerStyle={styles.container}>

{usuario && (

<>

<Text style={styles.label}>Nombre</Text>
<Text style={styles.value}>{usuario.nombre}</Text>

<Text style={styles.label}>CI</Text>
<Text style={styles.value}>{usuario.ci}</Text>

<Text style={styles.label}>Teléfono</Text>
<Text style={styles.value}>{usuario.telefono}</Text>


<Text style={styles.section}>Documento de identidad</Text>

<Image
source={{uri:usuario.fotoCI}}
style={styles.image}
/>


<Text style={styles.section}>Selfie de verificación</Text>

<Image
source={{uri:usuario.selfie}}
style={styles.image}
/>

</>

)}

</ScrollView>

</View>

);

}

const styles = StyleSheet.create({

container:{
padding:20
},

label:{
fontSize:14,
color:"#666"
},

value:{
fontSize:18,
fontWeight:"bold",
marginBottom:15
},

section:{
fontSize:16,
fontWeight:"bold",
marginTop:20,
marginBottom:10
},

image:{
width:"100%",
height:200,
borderRadius:10,
resizeMode:"cover"
}

});
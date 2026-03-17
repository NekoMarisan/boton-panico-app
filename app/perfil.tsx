import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

type Usuario = {
nombre:string
ci:string
celular:string
email?:string
fotoCI?:string
selfie?:string
}

export default function Perfil(){

const [usuario,setUsuario] = useState<Usuario | null>(null);

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

<View style={styles.card}>

{usuario.selfie && (
<Image
source={{uri:usuario.selfie}}
style={styles.avatar}
/>
)}

<Text style={styles.name}>{usuario.nombre}</Text>

<Text style={styles.info}>CI: {usuario.ci}</Text>
<Text style={styles.info}>Celular: {usuario.celular}</Text>
<Text style={styles.info}>Email: {usuario.email}</Text>

</View>


{usuario.fotoCI && (

<View style={styles.section}>

<Text style={styles.sectionTitle}>
Documento de identidad
</Text>

<Image
source={{uri:usuario.fotoCI}}
style={styles.image}
/>

</View>

)}

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

card:{
backgroundColor:"#fff",
borderRadius:15,
padding:20,
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.2,
shadowRadius:8,
elevation:5,
marginBottom:25
},

avatar:{
width:120,
height:120,
borderRadius:60,
marginBottom:10,
borderWidth:3,
borderColor:"#0b5f1b"
},

name:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

info:{
fontSize:16,
color:"#444",
marginBottom:5
},

section:{
marginBottom:20
},

sectionTitle:{
fontSize:18,
fontWeight:"bold",
marginBottom:10
},

image:{
width:"100%",
height:200,
borderRadius:10,
resizeMode:"cover"
}

});
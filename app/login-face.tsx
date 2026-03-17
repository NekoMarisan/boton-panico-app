import { View, Text, StyleSheet, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginFace() {

const [permission, requestPermission] = useCameraPermissions();
const cameraRef = useRef<any>(null);

/* tomar selfie */

const tomarSelfie = async () => {

if(!cameraRef.current) return;

/* tomar foto */

const photo = await cameraRef.current.takePictureAsync();

console.log("Selfie tomada:",photo.uri);

/* obtener usuario guardado */

const datos = await AsyncStorage.getItem("usuarioDatos");

if(datos){

const usuario = JSON.parse(datos);

/* agregar selfie al usuario */

usuario.selfie = photo.uri;

/* guardar nuevamente */

await AsyncStorage.setItem(
"usuarioDatos",
JSON.stringify(usuario)
);

}

/* ir a pantalla principal */

router.replace("/panic");

};

/* permisos cámara */

if (!permission) {
return <Text>Cargando cámara...</Text>;
}

if (!permission.granted) {
return (
<View style={styles.center}>
<Text>Necesitamos permiso para usar la cámara</Text>

<Pressable onPress={requestPermission}>
<Text style={{color:"#0b5f1b",marginTop:10}}>
Conceder permiso
</Text>
</Pressable>

</View>
);
}

/* interfaz */

return (

<View style={styles.container}>

<CameraView
ref={cameraRef}
style={StyleSheet.absoluteFillObject}
facing="front"
/>

<View style={styles.overlay}>

<View style={styles.faceFrame}/>

<Text style={styles.title}>
Coloque su rostro dentro del círculo
</Text>

<Pressable
style={styles.button}
onPress={tomarSelfie}
>

<Text style={styles.buttonText}>
TOMAR SELFIE
</Text>

</Pressable>

</View>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

overlay:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

faceFrame:{
width:220,
height:220,
borderRadius:110,
borderWidth:4,
borderColor:"#00ff88"
},

title:{
color:"white",
fontSize:18,
marginTop:20,
fontWeight:"bold"
},

button:{
marginTop:30,
backgroundColor:"#0b5f1b",
paddingHorizontal:40,
paddingVertical:15,
borderRadius:10
},

buttonText:{
color:"#fff",
fontWeight:"bold"
}

});
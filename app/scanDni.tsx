import { View, Text, StyleSheet, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { router } from "expo-router";

export default function ScanDni() {

const [permission, requestPermission] = useCameraPermissions();
const cameraRef = useRef<any>(null);

/* detectar nombre y CI */

const extraerDatosCarnet = (texto:string) => {

const lineas = texto.split("\n");

let nombre = "";
let ci = "";

for(let linea of lineas){

// CI (6-10 números)
if(!ci){
const matchCI = linea.match(/\b\d{6,10}\b/);
if(matchCI){
ci = matchCI[0];
}
}

// nombre (letras grandes)
if(!nombre){
const matchNombre = linea.match(/[A-ZÁÉÍÓÚÑ]{3,}\s[A-ZÁÉÍÓÚÑ]{3,}/);
if(matchNombre){
nombre = matchNombre[0];
}
}

}

return {nombre,ci};

};

/* tomar foto del carnet */

const tomarFoto = async () => {

if(!cameraRef.current) return;

/* tomar foto */
const photo = await cameraRef.current.takePictureAsync();

console.log("Foto carnet:",photo.uri);

/* simulación OCR (extraer datos del carnet) */

const datos = {
nombre: "",
ci: ""
};

/* enviar datos al registro */

router.push({
pathname:"/register",
params:{
nombre:datos.nombre, // nombre detectado
ci:datos.ci, // CI detectado
fotoCI:photo.uri // FOTO DEL CARNET
}
});

};

/* permisos */

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
/>

<View style={styles.overlay}>

<View style={styles.scanFrame}/>

<Text style={styles.title}>
Coloque el carnet dentro del marco
</Text>

<Pressable
style={styles.button}
onPress={tomarFoto}
>

<Text style={styles.buttonText}>
CAPTURAR
</Text>

</Pressable>

</View>

</View>

);

}

/* estilos */

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

scanFrame:{
width:300,
height:190,
borderWidth:3,
borderColor:"#00ff88",
borderRadius:10
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
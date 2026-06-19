import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Notifications from 'expo-notifications';

export default function Permissions(){

const aceptar = async () => {
  // Pedir permiso de notificaciones al presionar Aceptar
  await Notifications.requestPermissionsAsync();
  router.replace("/scanDni");
};

return(

<View style={styles.container}>

<Text style={styles.title}>Permisos necesarios</Text>

<Text style={styles.subtitle}>
Para ofrecerte la mejor experiencia, necesitamos acceder a los siguientes permisos:
</Text>

<View style={styles.permissionItem}>
<MaterialIcons name="location-on" size={28} color="#0b5f1b"/>
<Text style={styles.permissionText}>
<Text style={styles.bold}>Ubicación:</Text> Para mostrar contenido relevante según tu zona.
</Text>
</View>

<View style={styles.permissionItem}>
<MaterialIcons name="credit-card" size={28} color="#0b5f1b"/>
<Text style={styles.permissionText}>
<Text style={styles.bold}>Galería:</Text> Para que puedas seleccionar y subir tus fotos.
</Text>
</View>

<View style={styles.permissionItem}>
<MaterialIcons name="photo-camera" size={28} color="#0b5f1b"/>
<Text style={styles.permissionText}>
<Text style={styles.bold}>Cámara:</Text> Para que puedas tomar fotos y videos directamente desde la app.
</Text>
</View>

{/* NUEVO: permiso de notificaciones */}
<View style={styles.permissionItem}>
<MaterialIcons name="notifications" size={28} color="#0b5f1b"/>
<Text style={styles.permissionText}>
<Text style={styles.bold}>Notificaciones:</Text> Para avisarte sobre el estado de tus alertas y denuncias.
</Text>
</View>

<Pressable style={styles.button} onPress={aceptar}>
<Text style={styles.buttonText}>Aceptar</Text>
</Pressable>

</View>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:25,
justifyContent:"center"
},

title:{
fontSize:24,
fontWeight:"bold",
color:"#0b5f1b",
textAlign:"center",
marginBottom:20
},

subtitle:{
textAlign:"center",
marginBottom:30
},

permissionItem:{
flexDirection:"row",
alignItems:"center",
marginBottom:20,
gap:10
},

permissionText:{
flex:1
},

bold:{
fontWeight:"bold"
},

button:{
backgroundColor:"#0b5f1b",
padding:15,
borderRadius:10,
marginTop:30
},

buttonText:{
color:"#fff",
textAlign:"center",
fontWeight:"bold"
}

});
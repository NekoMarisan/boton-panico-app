import { View, Text, StyleSheet } from "react-native";

export default function AlertCard({alerta}:any){

function estadoColor(){

switch(alerta.estado){

case "verificacion":
return {backgroundColor:"#FFD54F"}

case "patrulla":
return {backgroundColor:"#64B5F6"}

case "intervencion":
return {backgroundColor:"#81C784"}

case "rechazada":
return {backgroundColor:"#E57373"}

default:
return {}

}

}

function estadoTexto(){

switch(alerta.estado){

case "verificacion":
return "Verificación"

case "patrulla":
return "Patrulla asignada"

case "intervencion":
return "Intervención realizada"

case "rechazada":
return "Rechazada"

default:
return ""

}

}

return(

<View style={styles.card}>

<View style={styles.header}>

<Text style={styles.id}>
{alerta.id}
</Text>

<Text style={[styles.estado,estadoColor()]}>
{estadoTexto()}
</Text>

</View>

<Text style={styles.fecha}>
{alerta.fecha}
</Text>

<Text>
<Text style={styles.bold}>Tipo de Alerta:</Text> {alerta.tipo}
</Text>

<Text>
<Text style={styles.bold}>Descripción:</Text> {alerta.descripcion}
</Text>

<Text>
<Text style={styles.bold}>Ubicación:</Text> {alerta.ubicacion}
</Text>

</View>

);

}

const styles = StyleSheet.create({

card:{
backgroundColor:"#fff",
borderRadius:10,
padding:12,
marginBottom:12,
borderWidth:1,
borderColor:"#ddd"
},

header:{
flexDirection:"row",
justifyContent:"space-between"
},

id:{
fontWeight:"bold"
},

fecha:{
fontSize:12,
color:"#666",
marginBottom:5
},

estado:{
paddingHorizontal:8,
paddingVertical:2,
borderRadius:5,
fontSize:11
},

bold:{
fontWeight:"bold"
}

});
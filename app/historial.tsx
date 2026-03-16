import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";

// componente que creamos para mostrar cada alerta
import AlertCard from "../components/AlertCard";

// header verde de la app
import Header from "../components/Header";

export default function Historial(){

// estado para controlar el filtro seleccionado
const [filtro,setFiltro] = useState("todas");


// LISTA DE DENUNCIAS (por ahora simuladas)
// luego aquí vendrán las denuncias reales guardadas
const denuncias = [

{
id:"ALT-0001",
fecha:"28/03/2025 - 12:35",
tipo:"Robo",
descripcion:"Robo de celular mientras caminaba",
ubicacion:"-17.3895, -66.1568",
estado:"verificacion"
},

{
id:"ALT-0002",
fecha:"28/03/2025 - 12:40",
tipo:"Robo",
descripcion:"Intento de robo",
ubicacion:"-17.3895, -66.1568",
estado:"patrulla"
},

{
id:"ALT-0003",
fecha:"28/03/2025 - 13:10",
tipo:"Robo",
descripcion:"Robo en avenida principal",
ubicacion:"-17.3895, -66.1568",
estado:"intervencion"
}

];


// FILTRO DE DENUNCIAS
// si filtro = todas → muestra todo
// si filtro = verificacion/patrulla/intervencion → filtra por estado
const denunciasFiltradas =
filtro === "todas"
? denuncias
: denuncias.filter(d => d.estado === filtro);


return(

<View style={{flex:1}}>

{/* HEADER VERDE */}
<Header title="ALERTAS REALIZADAS"/>

{/* BOTONES DE FILTRO DESLIZABLES */}
{/* CONTENEDOR FIJO DE FILTROS */}
<View style={styles.filtersContainer}>

<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
contentContainerStyle={styles.filters}
>

<Pressable
style={[styles.filter, filtro === "todas" && styles.filterActive]}
onPress={()=>setFiltro("todas")}
>
<Text style={[styles.filterText, filtro === "todas" && styles.filterTextActive]}>
Todas
</Text>
</Pressable>

<Pressable
style={[styles.filter, filtro === "verificacion" && styles.filterActive]}
onPress={()=>setFiltro("verificacion")}
>
<Text style={[styles.filterText, filtro === "verificacion" && styles.filterTextActive]}>
Verificación
</Text>
</Pressable>

<Pressable
style={[styles.filter, filtro === "patrulla" && styles.filterActive]}
onPress={()=>setFiltro("patrulla")}
>
<Text style={[styles.filterText, filtro === "patrulla" && styles.filterTextActive]}>
Intervención
</Text>
</Pressable>

<Pressable
style={[styles.filter, filtro === "intervencion" && styles.filterActive]}
onPress={()=>setFiltro("intervencion")}
>
<Text style={[styles.filterText, filtro === "intervencion" && styles.filterTextActive]}>
Resuelto
</Text>
</Pressable>

</ScrollView>
</View>

{/* LISTA DE ALERTAS */}
<ScrollView 
style={styles.container}
contentContainerStyle={{paddingBottom:40}}
>

{/* aquí recorremos todas las denuncias filtradas */}
{denunciasFiltradas.map((item,index)=>(

/*
en vez de crear toda la tarjeta aquí,
usamos el componente AlertCard
y le enviamos la alerta como prop
*/

<AlertCard
key={index}
alerta={item}
/>

))}

</ScrollView>

</View>

);

}


// ESTILOS
const styles = StyleSheet.create({

container:{
padding:15
},

filters:{
flexDirection:"row",
alignItems:"center",
gap:10,
paddingHorizontal:10,
paddingVertical:10
},

filter:{
backgroundColor:"#fff",
paddingVertical:6,
paddingHorizontal:14,
borderRadius:20,
borderWidth:1,
borderColor:"#0b5f1b",
alignItems:"center"
},

filterActive:{
backgroundColor:"#0b5f1b"
},

filterText:{
color:"#0b5f1b",
textAlign:"center"
},

filterTextActive:{
color:"#fff",
fontWeight:"bold",
textAlign:"center"
},

filtersContainer:{
backgroundColor:"#fff",
paddingVertical:5,
borderBottomWidth:1,
borderBottomColor:"#ddd"
},

});
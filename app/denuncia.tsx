import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";

import { useState } from "react";

import Header from "../components/Header";

import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function Denuncia(){

  const fecha = new Date().toLocaleString();

  const [ubicacion,setUbicacion] = useState("");
  const [descripcion,setDescripcion] = useState("");
  const [archivo,setArchivo] = useState<any>(null);


  const obtenerUbicacion = async () => {

    let permiso = await Location.requestForegroundPermissionsAsync();

    if(permiso.status !== "granted"){
      alert("Permiso de ubicación denegado");
      return;
    }

    let posicion = await Location.getCurrentPositionAsync({});

    const coords =
      posicion.coords.latitude + ", " +
      posicion.coords.longitude;

    setUbicacion(coords);

  };


  const seleccionarArchivo = async () => {

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality:1
    });

    if(!resultado.canceled){

      const file = resultado.assets[0];

      if(file.fileSize && file.fileSize > 10000000){
        alert("El archivo supera los 10MB");
        return;
      }

      setArchivo(file);

    }

  };


  const enviarDenuncia = () => {

    const denuncia = {
      fecha,
      ubicacion,
      descripcion,
      archivo
    };

    console.log("Denuncia:",denuncia);

    alert("Alerta enviada");

  };


  return(

    <View style={{flex:1}}>

      <Header title="ALERTAS CIUDADANAS"/>

      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.section}>
          Detalle de la alerta
        </Text>


        {/* FECHA */}

        <Text style={styles.label}>
          Fecha y Hora del incidente
        </Text>

        <View style={styles.inputIcon}>

          <Text style={styles.inputText}>
            {fecha}
          </Text>

          <MaterialIcons
            name="calendar-today"
            size={22}
            color="#666"
          />

        </View>


        {/* UBICACIÓN */}

        <Text style={styles.label}>
          Ubicación del hecho
        </Text>

        <Pressable
          style={styles.inputIcon}
          onPress={obtenerUbicacion}
        >

          <Text style={styles.inputText}>
            {ubicacion || "Obtener ubicación actual"}
          </Text>

          <MaterialIcons
            name="location-on"
            size={22}
            color="#666"
          />

        </Pressable>


        {/* DESCRIPCIÓN */}

        <Text style={styles.label}>
          Descripción detallada
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Describe los hechos con el mayor detalle posible..."
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />


        {/* ARCHIVO */}

        <Text style={styles.section}>
          Adjuntar archivos
        </Text>

        <View style={styles.fileArea}>

          <Text style={{marginBottom:10,color:"#888"}}>
            Arrastra los archivos aquí
            {"\n"}o
          </Text>

          <Pressable
            style={styles.fileButton}
            onPress={seleccionarArchivo}
          >

            <Text style={{color:"#fff"}}>
              Seleccionar archivos
            </Text>

          </Pressable>

        </View>


        {/* BOTONES */}

        <View style={styles.buttons}>

          <Pressable style={styles.cancel}>
            <Text style={{color:"#fff"}}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={styles.send}
            onPress={enviarDenuncia}
          >

            <Text style={{color:"#fff"}}>
              Enviar Alerta
            </Text>

          </Pressable>

        </View>

      </ScrollView>

    </View>

  );

}

const styles = StyleSheet.create({

container:{
padding:20,
backgroundColor:"#f3f3f3"
},

section:{
fontWeight:"bold",
fontSize:16,
marginVertical:15
},

label:{
marginBottom:5
},

inputIcon:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
backgroundColor:"#fff",
padding:12,
borderRadius:8,
marginBottom:15,
borderWidth:1,
borderColor:"#ddd"
},

inputText:{
color:"#333"
},

textArea:{
height:120,
backgroundColor:"#fff",
padding:12,
borderRadius:8,
borderWidth:1,
borderColor:"#ddd",
textAlignVertical:"top"
},

fileArea:{
borderWidth:1,
borderColor:"#ccc",
borderStyle:"dashed",
padding:30,
alignItems:"center",
textAlignVertical:"center",
marginVertical:20
},

fileButton:{
backgroundColor:"#0b5f1b",
padding:10,
borderRadius:6
},

buttons:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  fontWeight:"bold",
  textAlign:"center"
},

cancel:{
  backgroundColor:"#777",
  padding:14,
  borderRadius:6,
  width:"45%",
  justifyContent:"center",
  alignItems:"center"
},

send:{
  backgroundColor:"#0b5f1b",
  padding:14,
  borderRadius:6,
  width:"45%",
  justifyContent:"center",
  alignItems:"center"
}

});
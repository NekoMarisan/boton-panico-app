import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";

export default function Register(){

  return(

    <View style={styles.container}>

      <Text style={styles.title}>
        REGISTRAR USUARIO
      </Text>

      <View style={styles.avatar} />

      <InputField label="Nombre de Usuario"/>
      <InputField label="Celular"/>
      <InputField label="C.I."/>

      <ButtonPrimary title="REGISTRAR USUARIO"/>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#F5F5F5"
  },

  title:{
    textAlign:"center",
    marginBottom:20,
    fontWeight:"bold"
  },

  avatar:{
    width:120,
    height:120,
    borderRadius:60,
    backgroundColor:"#0B6E3D",
    alignSelf:"center",
    marginBottom:20
  }

});
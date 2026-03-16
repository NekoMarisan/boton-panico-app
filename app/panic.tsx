import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import TopButton from "../components/TopButton";
import PanicButton from "../components/PanicButton";
import ServiceCard from "../components/ServiceCard";

export default function Panic(){

  const router = useRouter(); // router activo

  const enviarAlerta = () => {
    alert("ALERTA ENVIADA");
  };

  return(

    <ScrollView contentContainerStyle={styles.container}>

      {/* BOTONES SUPERIORES */}

      <View style={styles.topMenu}>

        <TopButton
          icon="menu-book"
          title="Tutorial"
        />

        <TopButton
          icon="report"
          title="Denuncia"
          onPress={() => router.push("/denuncia")}
        />

        <TopButton
          icon="history"
          title="Historial"
          onPress={() => router.push("/historial")}
        />

        <TopButton
          icon="person"
          title="Perfil"
          onPress={()=>router.push("/perfil")}
        />

      </View>

      {/* BOTÓN CENTRAL */}

      <View style={styles.centerArea}>
        <PanicButton onPress={enviarAlerta}/>
      </View>

      {/* SERVICIOS */}

      <View style={styles.services}>

        <ServiceCard
          icon="local-hospital"
          title="Asistencia Médica"
          subtitle="Servicio médico de emergencia"
        />

        <ServiceCard
          icon="local-fire-department"
          title="Bomberos"
          subtitle="Emergencias por incendio"
        />

        <ServiceCard
          icon="local-police"
          title="Policía"
          subtitle="Seguridad pública"
          onPress={() => alert("Asistencia policial solicitada")}
        />

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container:{
    flexGrow:1,
    backgroundColor:"#ffffff",
    alignItems:"center",
    paddingBottom:40
  },

  topMenu:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:30
  },

  centerArea:{
    justifyContent:"center",
    alignItems:"center",
    marginVertical:30
  },

  services:{
    width:"100%",
    alignItems:"center",
    marginBottom:20
  }

});
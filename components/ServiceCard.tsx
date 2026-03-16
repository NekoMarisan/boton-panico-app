import { Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ServiceCard({ icon, title, subtitle, onPress }: any){

  return(

    <Pressable
      style={({pressed}) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={onPress}
    >

        <MaterialIcons
            name={icon}
            size={30}
            color="#ff0000"
        />

        <Text style={styles.title}>
            {title}
        </Text>

        <Text style={styles.subtitle}>
            {subtitle}
        </Text>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  card:{
    width:"90%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f2f2f2",
    padding:18,
    borderRadius:10,
    marginBottom:10
  },

  cardPressed:{
    backgroundColor:"#e8e8e8",
    transform:[{scale:0.97}]
  },

  title:{
    fontWeight:"bold",
    marginTop:6,
    textAlign:"center"
  },

  subtitle:{
    fontSize:12,
    color:"#666",
    textAlign:"center",
    marginTop:2
  }

});
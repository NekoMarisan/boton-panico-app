import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TopButton({ icon, title, onPress }: any){

  return(

    <TouchableOpacity style={styles.button} onPress={onPress}>

        <MaterialIcons
          name={icon}
          size={28}
          color="#005900"
        />

        <Text style={styles.text}>
            {title}
        </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button:{
    width:85,
    height:85,
    backgroundColor:"#f2f2f2",
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center"
  },

  text:{
    marginTop:5,
    fontSize:12,
    textAlign:"center"
  }

});
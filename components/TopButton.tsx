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
button: {
  width: 70,
  height: 70,
  backgroundColor: "#f2f2f2",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 3, // espacio entre cada botón
},

text: {
  marginTop: 4,
  fontSize: 11,
  textAlign: "center",
}
});
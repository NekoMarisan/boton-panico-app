import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function ButtonPrimary({ title, onPress }: any) {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({

  button:{
    backgroundColor: colors.primary,
    padding:15,
    borderRadius:8,
    alignItems:"center"
  },

  text:{
    color:"white",
    fontWeight:"bold"
  }

});
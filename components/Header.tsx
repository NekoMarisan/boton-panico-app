import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function Header({ title }: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

}

const styles = StyleSheet.create({

  container:{
    width:"100%",
    padding:18,
    backgroundColor: colors.primary,
    alignItems:"center"
  },

  title:{
    color:"white",
    fontSize:18,
    fontWeight:"bold"
  }

});
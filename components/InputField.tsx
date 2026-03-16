import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({ label, value, onChangeText }: any) {

  return (

    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    marginBottom:15
  },

  label:{
    marginBottom:5
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:8,
    padding:10
  }

});
import { useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";

export default function PanicButton({ onPress }: any){

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    Animated.loop(

      Animated.sequence([

        Animated.timing(scale,{
          toValue:1.15,
          duration:800,
          useNativeDriver:true
        }),

        Animated.timing(scale,{
          toValue:1,
          duration:800,
          useNativeDriver:true
        })

      ])

    ).start();

  },[]);

  return(

    <Animated.View
      style={[
        styles.outerCircle,
        { transform:[{ scale }] }
      ]}
    >

      <TouchableOpacity
        style={styles.innerCircle}
        onPress={onPress}
      >

        <Text style={styles.text}>
          EMERGENCIA
        </Text>

        <Text style={styles.subText}>
          Presionar aquí
        </Text>

      </TouchableOpacity>

    </Animated.View>

  );

}

const styles = StyleSheet.create({

  outerCircle:{
    width:240,
    height:240,
    borderRadius:120,
    backgroundColor:"#ffd6d6",
    justifyContent:"center",
    alignItems:"center"
  },

  innerCircle:{
    width:180,
    height:180,
    borderRadius:90,
    backgroundColor:"#E53935",
    justifyContent:"center",
    alignItems:"center",
    elevation:10,
    shadowColor:"#000",
    shadowOpacity:0.3,
    shadowRadius:10
  },

  text:{
    color:"white",
    fontSize:18,
    fontWeight:"bold"
  },

  subText:{
    color:"white",
    fontSize:12
  }

});
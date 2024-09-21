import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utilis/AsyncStorage";

const OnBoardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Signup");
    setItem('onboarded','1');
  };

  const donebutton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.donebutton} {...props}>
        <Text style={{color:'white'}}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={donebutton}
        bottomBarHeight={100}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animation/meeting.json")}
                autoPlay
                loop
              />
            ),
            title: "Busy Schedule ?",
            subtitle: "Take a break and Yummifi yourself",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animation/eatingfod.json")}
                autoPlay
                loop
              />
            ),
            title: "Beginner in Cooking ?",
            subtitle: "We're there to help you out",
          },
          {
            backgroundColor: "#a78bfa",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animation/eating.json")}
                autoPlay
                loop
              />
            ),
            title: "Follow some easy steps",
            subtitle: "Enjoy Your meal!!! Have a nice day",
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  donebutton:{
    padding:20,
    backgroundColor:'white',
     //borderTopLeftRadius:'100%',
    // borderBottomLeftRadius:'100%'
    borderRadius:20,
    backgroundColor:'#a78bfa',
    marginRight:10
  }
});

export default OnBoardingScreen;

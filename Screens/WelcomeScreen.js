import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(()=>{
    ring1padding.value = 0;
    ring2padding.value = 0;
   setTimeout(()=> ring1padding.value = withSpring(ring1padding.value + hp(4)),100)
   setTimeout(()=> ring2padding.value = withSpring(ring2padding.value + hp(4.5)),300)

   setTimeout(()=> navigation.navigate('home'),2500)
  },[])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-400">
      <StatusBar style="light" />

      <Animated.View
        className="bg-white/40 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/30 rounded-full "
          style={{ padding: ring1padding }}
        >
          <Image
            source={require("../assets/icon1.png")}
            style={{ width: hp(25), height: hp(25) }}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest "
        >
          YummiFi
        </Text>
        <Text
          style={{ fontSize: hp(3) }}
          className="font-medium text-white tracking-widest text-lg"
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

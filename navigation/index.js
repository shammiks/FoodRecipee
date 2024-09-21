import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react'
import HomeScreen from "../Screens/HomeScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import RecipeDetails from "../Screens/RecipeDetails";
import SignUpScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";
import UserProfile from "../Screens/UserProfile";
import OnBoardingScreen from "../Screens/OnBoardingScreen";
import { getItem } from "../utilis/AsyncStorage";

const Stack = createNativeStackNavigator();

function Navigation(){
const[showonboarding , setshowonboarding] = useState(null)

  
  useEffect(()=>{
    checkIfAlreadyOnboarded();
    
  },[])

  
 
  const checkIfAlreadyOnboarded = async ()=> {
      let onboarded = await getItem('onboarded');
      if(onboarded == 1){
        //hide onboarding
        setshowonboarding(false);
      }else{
        //show onboarding
        setshowonboarding(true);
      }
  }

  if(showonboarding == null){
    return null;
  }

   if(showonboarding){
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="onboarding" screenOptions={{headerShown:false}}>
          <Stack.Screen name="home" component={HomeScreen}/>
          <Stack.Screen name="welcome" component={WelcomeScreen}/>
          <Stack.Screen name="recipeDetails" component={RecipeDetails}/>
          <Stack.Screen name="Signup" component={SignUpScreen}/>
          <Stack.Screen name="login" component={LoginScreen}/>
          <Stack.Screen name="User" component={UserProfile}/>
          <Stack.Screen name="onboarding" component={OnBoardingScreen}/>
        
          </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
          <Stack.Screen name="home" component={HomeScreen}/>
          <Stack.Screen name="welcome" component={WelcomeScreen}/>
          <Stack.Screen name="recipeDetails" component={RecipeDetails}/>
          <Stack.Screen name="Signup" component={SignUpScreen}/>
          <Stack.Screen name="login" component={LoginScreen}/>
          <Stack.Screen name="User" component={UserProfile}/>
          <Stack.Screen name="onboarding" component={OnBoardingScreen}/>

          </Stack.Navigator>
      </NavigationContainer>
    )
  }

 
}

export default Navigation;
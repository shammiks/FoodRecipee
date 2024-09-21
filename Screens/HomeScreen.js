import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert,   } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {  MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { HeartIcon} from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [activecategory, setactivecategory] = useState("Chicken");
  const [categories, setcategories] = useState([]);
  const [meals, setmeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleCategory = (category) => {
    getRecipes(category);
    setactivecategory(category);
    setmeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
      if (response && response.data) {
        setcategories(response.data.categories);
      }
    } catch (error) {
      console.log("error :", error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setmeals(response.data.meals);
      }
    } catch (error) {
      console.log("error :", error.message);
    }
  };

  // Handle Search
  const handleSearch = () => {
    if (!searchQuery) {
      Alert.alert("Please enter a recipe name to search.");
      return;
    }

    // Find the recipe by name
    const foundMeal = meals.find((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundMeal) {
      // Navigate to RecipeDetails screen
      navigation.navigate("recipeDetails", { ...foundMeal });
    } else {
      Alert.alert("Recipe not found. Please try a different search term.");
    }
  };

  

  return (
    
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        
        <View className="mx-4 flex-row justify-between items-center mb-2">
        <TouchableOpacity onPress={()=> navigation.navigate('User')}>
          <Image
            source={require("../assets/usericon.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
        </TouchableOpacity>

      
            {/* <TouchableOpacity>
          <BellIcon size={hp(4)} color="gray" />
          </TouchableOpacity> */}
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello User
          </Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
              Make your own food
            </Text>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
              Stay at <Text className="text-amber-400">Home</Text>
          
            </Text>
          </View>
        </View>
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={setSearchQuery} // Track input changes
          />
          <TouchableOpacity onPress={handleSearch} className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color={"gray"} />
          </TouchableOpacity>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activecategory={activecategory}
              handleCategory={handleCategory}
            />
          )}
        </View>

        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
   
  );
};

export default HomeScreen;

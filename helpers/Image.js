import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Check if the image is already cached
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          // If cached, set it as the image source
          setCachedSource({ uri: cachedImageData });
        } else {
          // Otherwise, fetch the image and cache it
          const response = await fetch(uri);
          const imageBlob = await response.blob();

          // Convert the image to base64
          const base64Data = await convertBlobToBase64(imageBlob);

          // Cache the image
          await AsyncStorage.setItem(uri, base64Data);

          // Set the image source to the cached data
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.log("Error caching image", error);
        // If an error occurs, fallback to using the original URI
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]);

  return <Animated.Image source={cachedSource} {...props} />;
};

// Convert Blob to Base64
const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

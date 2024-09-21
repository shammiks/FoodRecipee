import { View, Text ,ScrollView, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import Animated ,{ FadeInDown} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

import { CachedImage } from '../helpers/Image';


const Categories = ({categories, activecategory,handleCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className = "space-x-4"
      contentContainerStyle={{paddingHorizontal:15}}
      >
       {
                categories.map((cat,index)=>{
                let isActive = cat.strCategory === activecategory;
                let activeButtonClass =  isActive? 'bg-amber-400':'bg-black/10';

                return(
                    <TouchableOpacity
                    key={index}
                    onPress={()=> handleCategory(cat.strCategory)}
                        className="flex items-center space-y-1"
                    
                    >
                        <View collapsable={false} className={"rounded-full p-[6px] " + activeButtonClass}>
                                {/* 
                            <Image 
                            source={{uri:cat.strCategoryThumb}}
                            style={{width:hp(6),height:hp(6)}}
                            className="rounded-full"
                            /> */}

                            <CachedImage 
                            uri={cat.strCategoryThumb}
                            style={{width:hp(6),height:hp(6)}}
                            className="rounded-full"
                            />
                        </View>
                    <Text className="text-neutral-600" style={{fontSize:hp(1)}}>{cat.strCategory}</Text>

                    </TouchableOpacity>
                )
            })
       }
      </ScrollView>
    </Animated.View>
  )
}

export default Categories
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import RestaurantCard from './RestaurantCard'
import createClient from '../sanity';


const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);     
 
    useEffect(() => {        
        createClient.fetch(            
            `*[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type-> {
                    name
                    }                
                },
            }[0]
        `,
            { id }
        ).then((data) => {
                setRestaurants(data?.restaurants);
            });
    }, []);
   


 

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>
            <ScrollView horizontal contentContainerStyle={{
                paddingHorizontal: 15,
            }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {restaurants?.map((restaurants) => {
                    return (
                       <RestaurantCard
                        key={restaurants._id}
                        id={restaurants._id}
                        imgUrl={restaurants.image.asset._ref}
                        address={restaurants.address}
                        title={restaurants.name}
                        dishes={restaurants.dishes}
                        rating={restaurants.rating}
                        short_description={restaurants.short_description}
                        genre={restaurants.type?.name}
                        long={restaurants.long}
                        lat={restaurants.lat}
                    />
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow


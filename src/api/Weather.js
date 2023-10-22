import React, {useState} from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import axios from "axios";

const Weather = () => {
    const [city,setCity] = useState("");
    const [weather, setWeather] = useState("");
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    const API_KEY = "61aeec21e3ba5a0bb6c8729f33ea38fd";

    const getWeather = async() => {
        try{
            const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            setWeather(response.data);
        } 
        catch (error) {
            console.error("Error Fetching Weather Data",error);
        }
        
    };

    return(
        <View style={style.container}>
            <Text style={style.title}>Weather🌦️: {city}</Text>
            <TextInput
                placeholder="City Name i.e. London or Bangkok"
                value={city}
                onChangeText={(newText) => setCity(newText)}
                style={style.input}
            />
            <Button title="Got Weather" onPress={getWeather} color="#FFC2C7"/>
            {weather && (
            <View style={style.infoContainer}>
                <Text style={style.info}>
                  {Math.round(weather.main.temp - 273.15)}°C
                </Text>
                <Text>Feel like {weather.main.feels_like}°C</Text>
                <Text>{weather.weather[0].description}</Text>
            </View>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    infoContainer: {
        backgroundColor: "#B6E5D8",
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    info: {
        fontSize: 18,
    },
    input: {
        margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#8FDDE7",
        borderRadius: 6,
        textAlign: "center",
    },
});

export default Weather;
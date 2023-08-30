import { useUser } from "@clerk/clerk-expo";
import { Image, View, Text, Button } from "react-native";
import { useQuery } from 'react-query'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
export default function LandingPage({ navigation }) {
    const { user } = useUser();

    const { data, error, isLoading } = useQuery({
        queryKey: ["WeatherData"],
        queryFn: async () => {
            const { data } = await axios.get('http://api.weatherapi.com/v1/current.json?key=bb35fe2b500548f0a6b124415232008&q=London&aqi=no')
            // console.log(Object.keys(data.current), data.current.condition)
            return data
        }
    })

    if (isLoading) return (
        <Text>'Loading...'</Text>
    )

    if (error) return (<Text>
        'An error has occurred: ' + {error.message}
    </Text>)

const SignOut = () => {
    const { isLoaded,signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'pink'
            }}
        >
            <LinearGradient
                colors={['white', 'pink']}
                style={styles.background}
            />

            <Text style={{ fontSize: 20 }}>Hello, {user.fullName}</Text>
            <Image
                style={styles.image}
                source={{
                    uri: "https:" + data.current.condition.icon
                }}
            />
            <Text style={{ fontSize: 20 }}>{data.current.condition.text}</Text>
            <Text style={{ fontSize: 20 }}>{data.current.temp_f} °F</Text>
            <Button
                title="Calendar"
                onPress={() => navigation.navigate('Calendar')}
            />
            <Button
                title="Add Outift?"
                onPress={() => navigation.navigate('Calendar')}
            />
            <SignOut></SignOut>
       </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50,
    },
    image: {
        width: 100,
        height: 100,
    },
});
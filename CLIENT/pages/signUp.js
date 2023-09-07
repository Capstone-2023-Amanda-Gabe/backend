import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Button } from "react-native";
import { useState, useEffect } from "react";


export default function SignUpScreen({ navigation }) {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Sign Up</Text>
          </View>
          <View style={styles.content}>
          <TextInput
            styles={styles.input}
            style={{ color: "white" }}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            placeholderTextColor="white"
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor="white"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#40050d" }]}
            onPress={onSignInPress}
          >
            <Text style={[styles.buttonText, { color: "white", fontSize: 18 }]}>
              Sign Up 
            </Text>
          </TouchableOpacity>

          <Button
            title="Log In?"
            onPress={() => navigation.navigate("Sign Up?")}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  // header:{
  //   // backgroundColoir: "#130c20",
  //   padding:15,
  // },
  headerText:{
    color: "#f8146b",
    fontSize: 40,
    fontWeight: "bold",
    // 
    marginLeft: 20,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#130c20",
  },

  input: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "white",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
  },
});










// const images = [
//   "https://e1.pxfuel.com/desktop-wallpaper/292/938/desktop-wallpaper-fashion-aesthetic-fashion-collage.jpg",
//   "https://wallpaper.dog/large/20504694.png",
//   "https://wallpaperaccess.com/full/1437797.jpg",
// ];




// useEffect(() => {
  //   const interval = setInterval(changeBackground, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  // const changeBackground = () => {
  //   const newIndex = Math.floor(Math.random() * images.length);
  //   setCurrentImageIndex(newIndex);
  // };


  {/* <ImageBackground
        source={{ uri: images[currentImageIndex] }}
        resizeMode="cover"
        style={styles.image}
      > */}
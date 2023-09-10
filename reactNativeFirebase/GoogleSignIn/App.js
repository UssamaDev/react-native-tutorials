import React, { useState, useEffect, setState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '230118982102-om8l0ftqkuhbpi2731iflee5266hoaq4.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
      // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log(statusCodes.SIGN_IN_CANCELLED)
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log(statusCodes.IN_PROGRESS)
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
    } else {
      // some other error happened
      console.log(error)
    }
  }
};

async function googleSignOut()  {
  try {
    await GoogleSignin.signOut();
    setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

function HomeScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [user, setuser] = useState();
  useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in => Get user info and stay on the Home Screen
        setEmail(user.email)
        setuser(user)
      }
      else {
        // No user is signed in => Navigate to the Authentication Screen
        console.log("No user is signed in return to Home screen")
        navigation.navigate("Auth")
      }
    })
  })
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Already loged In</Text>
      <Text style={styles.text}>Welcome {email}</Text>
      <Pressable 
        onPress={
            () => googleSignOut()
            .then(() => navigation.navigate('Auth'))
        }
        style={styles.button}>
          <Text style={styles.text}>Log Out</Text>
      </Pressable>
    </View>
  );
}



function AuthScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* We'll use Google button instead */}
        <GoogleSigninButton
        onPress = {
          ()=>onGoogleButtonPress()
          .then(()=>{
            navigation.navigate("Home");
            console.log("User signed in using Google");
          })
          .catch(error => {
            console.log(error)
          })
        }
        />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#33B6FF',
    width: '50%',
  },
  text: {
    padding: 10,
    color: '#555555',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default function App() {
    
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

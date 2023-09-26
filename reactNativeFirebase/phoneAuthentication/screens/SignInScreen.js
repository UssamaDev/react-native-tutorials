import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, Text, View } from 'react-native';
import { styles } from '../style';
import auth from '@react-native-firebase/auth';
import { useConfirmContext } from '../contexts/confirmation';

const SignInScreen = ({navigation}) => {
    const [number, setNumber] = useState("")
    // If null, no SMS has been sent
    const {confirm, setConfirm} = useConfirmContext();

    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        navigation.navigate("Confirm");
        } catch(error) {
            console.log(error.message)
        }
        
      };
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
          if (!user) {
            // User is signed out
            navigation.navigate("SignIn");
          } else {
            // User is signed in, you can update your state here if needed
            navigation.navigate("Home");
          }
        });
        return subscriber; // unsubscribe on unmount
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Sign In Screen</Text>
            <Text
                style={styles.text}>Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Phone Number"
                keyboardType="numeric"
                value={number}
                onChangeText={text => setNumber(text)}
                />
            <Pressable
                style={styles.button}
                onPress={() => signInWithPhoneNumber(number)}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
        </View>
    );
}

export default SignInScreen

import React, { useState, useEffect } from 'react';
import { Pressable, View, Text } from 'react-native';
import { styles } from '../style';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
    const [user, setUser] = useState(null)
    const signOut = () => {
        auth().signOut();
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
          if (!user) {
            // User is signed out
          } else {
            // User is signed in, you can update your state here if needed
            setUser(user);
          }
        });
        return subscriber; // unsubscribe on unmount
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.text}>Hi, your phone number is: {user?.phoneNumber || "loading"}</Text>
            <Pressable
                style={styles.button}
                onPress={() => signOut()}>
                <Text style={styles.buttonText}> Sign Out</Text>
            </Pressable>
        </View>
    );
}

export default HomeScreen

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function AuthScreen({ navigation }) {
  const [email, onChangeEmail] = useState();
  const [password, onChangeNumber] = useState();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email adress"
        keyboardType="email-address"
        inputMode = "email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
        placeholder="Password"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <Pressable
        onPress={
          () => navigation.navigate("Home")
        }
        style={styles.button}>
        <Text style={styles.text}>Log In</Text>
      </Pressable>
      <Pressable
      onPress={() => navigation.navigate("SignUp")}
      style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
};

function HomeScreen({ navigation }) {
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Already loged In</Text>
      <Text style={styles.text}>Welcome "user email"</Text>
      <Pressable 
        onPress={
          () => navigation.navigate('Auth')
        }
        style={styles.button}>
          <Text style={styles.text}>Log Out</Text>
      </Pressable>
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangeNumber] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email adress"
        keyboardType="email-address"
        inputMode = "email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
        placeholder="Password"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <Pressable
        onPress={
          () => navigation.navigate("Home")
        }
        style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
      <Pressable
        onPress={() => navigation.goBack()} 
        style={styles.button}>
          <Text style={styles.text}>Go back</Text>
        </Pressable>
    </View>
  );
};


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    width: '80%',
  },
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

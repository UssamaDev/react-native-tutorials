import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import { styles } from '../style';
import { useConfirmContext } from '../contexts/confirmation';
import auth from '@react-native-firebase/auth';

const ConfirmScreen = ({navigation}) => {
  const {confirm, setConfirm} = useConfirmContext();
  const [code, setCode] = useState("")
    const confirmCode = async () => {
      try {
        await confirm.confirm(code);
        navigation.navigate("Home");
      } catch(error) {
        console.log('Invalid code.');
      }
    };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={styles.title}>Confirmation Screen</Text>
      <Text
        style={styles.text}>Confirmation code</Text>
    <TextInput
        style={styles.input}
        placeholder="Your Verification Code"
        keyboardType="numeric"
        value={code}
        onChangeText={text => setCode(text)}
        />
    <Pressable
        style={styles.button}
        onPress={() => confirmCode()}>
            <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
    </View>
);
}

export default ConfirmScreen

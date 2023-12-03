import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 cheracters')
    .max(8, 'Should be max of 16 cheracters')
    .required('Length is required'),
});

function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let charecterList = '';
    const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const symboolChars = '@#$_&';
    if (uppercase) {
      charecterList += uppercaseChar;
    }
    if (lowercase) {
      charecterList += lowercaseChar;
    }
    if (numbers) {
      charecterList += digitChars;
    }
    if (symbols) {
      charecterList += symboolChars;
    }

    const resultPassword = createPassword(charecterList, passwordLength);
    setPassword(resultPassword);
    setIsPasswordGenerated(true);
  };

  const createPassword = (cheracters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * cheracters.length);
      result += cheracters.charAt(charIndex);
    }

    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(false);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Password generator</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 cheracters')
    .max(8, 'Should be max of 16 cheracters')
    .required('Length is required'),
});

function App(): JSX.Element {
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

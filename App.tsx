import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 cheracters')
    .max(16, 'Should be max of 16 cheracters')
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
    let charList = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCahrs = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const symbolCahrs = '@#$^&*_';

    if (lowercase) {
      charList += lowercaseCahrs;
    }
    if (uppercase) {
      charList += uppercaseChars;
    }
    if (numbers) {
      charList += digitChars;
    }
    if (symbols) {
      charList += symbolCahrs;
    }

    console.log({charList});

    const resultPassword = createPassword(charList, passwordLength);
    console.log({resultPassword});

    setPassword(resultPassword);
    setIsPasswordGenerated(true);
  };

  const createPassword = (cheracters: string, passwordLength: number) => {
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * cheracters.length);
      password += cheracters.charAt(charIndex);
    }
    return password;
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.fromContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log({values});
              generatePassword(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={{fontSize: 20}}>Password Length:</Text>

                  <View style={{width: '100%'}}>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorMsg}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase:</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="orange"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase:</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="green"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers:</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="red"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols:</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="teal"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPasswordGenerated && (
          <View style={styles.card}>
            <Text>Long press to Copy</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 10,
              }}
              selectable>
              {password && password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    marginHorizontal: 16,
  },
  fromContainer: {},
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 20,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    gap: 16,
  },
  inputColumn: {},
  inputStyle: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 16,
    width: '50%',
  },
  errorMsg: {
    color: 'red',
    // textAlign: 'right',
  },
  heading: {
    fontSize: 20,
  },
  primaryBtn: {
    backgroundColor: 'teal',
    paddingVertical: 10,
    width: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {},
  secBtn: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    width: 140,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  card: {
    marginTop: 22,
    backgroundColor: '#ccc',
    height: 100,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform ,ImageBackground} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase } from '../FireBase/FireBaseConfig';
import { setItem } from '../utilis/AsyncStorage';


const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerror, setCustomError] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log('Logged In Successfully');
        navigation.navigate('welcome');
        setItem('login','1');
      }).catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
          setCustomError('Please enter a valid email address');
        } else {
          setCustomError('Incorrect email or password');
        }
      });
    
  };

  return (
   <View style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust offset as necessary
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.head1}>Sign In</Text>
        {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
        <View style={styles.inputout}>
          <AntDesign name="user" size={24} color={emailfocus === true ? 'red' : 'gray'} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onFocus={() => {
              setEmailfocus(true);
              setPasswordfocus(false);
              setShowpassword(false);
              setCustomError('');
            }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputout}>
          <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? 'red' : 'gray'} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onFocus={() => {
              setEmailfocus(false);
              setPasswordfocus(true);
              setCustomError('');
            }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showpassword}
          />
          <Octicons
            name={showpassword ? "eye" : "eye-closed"}
            size={24}
            color="black"
            onPress={() => setShowpassword(!showpassword)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
        <Text style={styles.or}>OR</Text>
        <Text style={styles.gftxt}>Sign In With</Text>
        <View style={styles.gf}>
          <TouchableOpacity>
            <View style={styles.gficon}>
              <AntDesign name="google" size={24} color="#EA4335" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.gficon}>
              <FontAwesome5 name="facebook-f" size={24} color="#4267B2" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <Text style={{color:'gray'}}>Don't have an account?
          <Text style={styles.signup} onPress={() => navigation.navigate('Signup')}> Sign Up</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
   
   
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    top:150
  },
  head1: {
    fontSize: 35,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgot: {
    color: 'gray',
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: 'red',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: 'gray',
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: 'white',
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
  },
  divider: {
    width: '80%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  signup: {
    color: 'red',
  },
});

export default LoginScreen;

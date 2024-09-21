import React ,{useState} from 'react'
import {View,Text ,StyleSheet,TouchableOpacity,TextInput ,ImageBackground} from 'react-native'
//import {  colors, btn1, hr80 ,titles } from '../global/style'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

import { firebase } from '../FireBase/FireBaseConfig';
import { StatusBar } from 'expo-status-bar';


const SignUpScreen = ({navigation}) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [showconfpassword, setShowconfpassword] = useState(false);
    const [confpasswordfocus, setconfPasswordfocus] = useState(false);
    const [namefocus, setNamefocus] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setconfPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [customError, setCustomError] = useState('');
    const [successmsg, setSuccessmsg] = useState(null);



    const handleSignup = ()=>{
        
        if(name == ''){
            //alert("Name is empty")
            setCustomError("Name is empty");
            return;
        }
        if(password != confpassword){
            //alert("Password doesn,t matched")
            setCustomError("Password doesn't match");
            return;
        }
    
        try {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((userCredentials) => {
                console.log("user created");
                const uid = userCredentials?.user?.uid;
                if (uid != null) {
                  const userRef = firebase.firestore().collection("UserData").doc(uid);
                  userRef
                    .set({
                      email: email,
                      password: password,
                      name: name,
                      address: address,
                      uid: uid,
                    })
                    .then(() => {
                      console.log("data added to Firestore");
                      setSuccessmsg("User created successfully");
                    })
                    .catch((error) => {
                      console.log("Firestore error ", error);
                    });
                }
              })
              .catch((error) => {
                console.log("Sign up Firebase error ", error.message);
                if (
                  error.message ===
                  "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
                ) {
                  setCustomError("Email already exists");
                } else if (
                  error.message ===
                  "Firebase: The email address is badly formatted. (auth/invalid-email)."
                ) {
                  setCustomError("Invalid Email");
                } else if (
                  error.message ===
                  "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ) {
                  setCustomError("Password should be at least 6 characters");
                } else {
                  setCustomError(error.message);
                }
              });
          } catch (error) {
            console.log("Sign up system error ", error.message);
          }
          
    }
  return (
   
    <View style={styles.container}>
            {successmsg == null ?
    <View style={styles.container}>
           
            <Text style={styles.head1}>Sign Up</Text>
            {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

            <View style={styles.inputout}>
                <AntDesign name="user" size={24} color={namefocus === true ? 'red' : 'gray'} />
                <TextInput style={styles.input} placeholder="Full Name"
                    onFocus={() => {
                    setEmailfocus(false)
                    setPasswordfocus(false)
                    setShowpassword(false)
                    setNamefocus(true)
                    setconfPasswordfocus(false)
                    setCustomError('')
                }}
                onChangeText={(text) => setName(text)}
                />
            </View>
            
            <View style={styles.inputout}>
               <Entypo name="email" size={24} color={emailfocus === true ? 'red' : 'gray'} /> 
                <TextInput style={styles.input} placeholder="Email"
                    onFocus={() => {
                    setEmailfocus(true)
                    setPasswordfocus(false)
                    setShowpassword(false)
                    setNamefocus(false)
                    setconfPasswordfocus(false)
                    setCustomError('')
                }}
                onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputout}>
                <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? 'red' : 'gray'} />
                <TextInput style={styles.input} placeholder="Password" 
                    onFocus={() => {
                    setEmailfocus(false)
                    setPasswordfocus(true)
                    setShowpassword(false)
                    setNamefocus(false)
                    setconfPasswordfocus(false)
                    setCustomError('')
                   
                }}
                onChangeText={(text) => setPassword(text)}
                    secureTextEntry={showpassword === false ? true : false}
                  
                />

                <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24} color="black" 
                onPress={() => setShowpassword(!showpassword)} />
            </View>

           

            <View style={styles.inputout}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color={confpasswordfocus == true ? 'red' : 'gray'} />
                        <TextInput style={styles.input} placeholder="Confirm Password" onFocus={() => {
                            setEmailfocus(false)
                            setconfPasswordfocus(true)
                            setShowpassword(false)
                            setNamefocus(false)
                            setPasswordfocus(false)
                            setCustomError('')
                            

                        }}
                            onChangeText={(text) => setconfPassword(text)}
                            secureTextEntry={showconfpassword === false ? true : false}
                        />

                        <Octicons name={showconfpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setShowconfpassword(!showconfpassword)} />
                    </View>

            <Text style={styles.address}>Please enter your address</Text>
                    <View style={styles.inputout} >
                        <TextInput style={styles.input} placeholder="Enter your Address" onChangeText={(text) => setAddress(text)}
                            onPress={() => {
                                setEmailfocus(false)
                                setPasswordfocus(false)
                                setShowpassword(false)
                                setNamefocus(false) 
                                setconfPasswordfocus(false)
                                setCustomError('')
                            }}
                           
                        />
                    </View>

            <TouchableOpacity style={{width:'80%',
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        elevation:10,
        color:'white',
        borderRadius:10,
        marginBottom:20}} onPress={()=> handleSignup()}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>


         
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign Up With </Text>


            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <AntDesign name="google" size={24} color="#EA4335" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <FontAwesome5 name="facebook-f" size={24} color="#4267B2" /></View>
                </TouchableOpacity>
            </View>
           
            <Text style={{top:15, color:'gray'}}>Already have an account?
                <Text style={styles.signup} onPress={()=> navigation.navigate('login')}> Sign In</Text>
            </Text>
        </View>
        :
        <View style={styles.container1}>
                    <Text style={styles.successmessage}>{successmsg}</Text>
                    <TouchableOpacity style={{width:'80%',
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        elevation:10,
        color:'white',
        borderRadius:10,
        marginBottom:20}} onPress={() => navigation.navigate('login')}>
                        <Text style={{ color:'white', fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:'80%',
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        elevation:10,
        color:'white',
        borderRadius:10,
        marginBottom:20}} onPress={() => setSuccessmsg(null)}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
}
</View>


  )
}
export default SignUpScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop:30,
       
      
    },
    container1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    
    },
    head1: {
        fontSize: 35,
        color:'gray',
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
        // alignSelf: 'center',
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
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
        flexDirection: 'row'
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
    signup: {
        color: 'red',
    },
    address: {
      fontSize: 18,
      color: 'gray',
      textAlign: 'center',
      marginTop: 20,
  },
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
successmessage: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
}
})


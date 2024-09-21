import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../FireBase/FireBaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { removeItem } from '../utilis/AsyncStorage';


const UserProfile = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checklogin = () => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          setUserloggeduid(null);
          navigation.navigate('login');
        }
      });
      return unsubscribe; // Clean up subscription on unmount
    };
    checklogin();
  }, [navigation]);

  const getuserdata = async () => {
    if (userloggeduid) {
      try {
        const docRef = firebase.firestore().collection('UserData').doc(userloggeduid);
        const doc = await docRef.get();
        if (doc.exists) {
          setUserdata(doc.data());
        } else {
          console.log('No user data');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false); // Stop loading whether success or failure
      }
    }
  };

  useEffect(() => {
    if (userloggeduid) {
      getuserdata();
    }
  }, [userloggeduid]);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      
      navigation.replace('login'); // Replace to prevent back navigation
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        // Delete user data from Firestore
        await firebase.firestore().collection('UserData').doc(userloggeduid).delete();

        // Delete the user from Firebase Auth
        await user.delete();

        // Navigate to the Signup screen
        navigation.replace('Signup');
        console.log('User account and data deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting account: ', error);
      Alert.alert('Error', 'Unable to delete the account. Please try again later.');
    }
  };

  const handlereset = async () => {
    await removeItem('onboarded');
    navigation.reset({
      index: 0,
      routes: [{ name: 'onboarding' }],
    });
  };

  return (
    <View style={styles.containerout}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <View style={{
            backgroundColor: 'red',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            borderRadius: 50,
            top: 10
          }}>
            <AntDesign name="back" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <Text style={styles.head1}>Your Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/usericon.png')} // Placeholder image if not available
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userdata ? userdata.name : 'Loading...'}</Text>
        <Text style={styles.userEmail}>{userdata ? userdata.email : 'Loading...'}</Text>
        <Text style={styles.userAddress}>{userdata ? userdata.address : 'Loading...'}</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ right: 20, top: 20 }}>
          <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
            <Text style={styles.editButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ right: 0, top: 20 }}>
          <TouchableOpacity style={styles.editButton} onPress={handlereset}>
            <Text style={styles.editButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={{ left: 20, top: 20 }}>
          <TouchableOpacity style={styles.editButton} onPress={handleDeleteAccount}>
            <Text style={styles.editButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    top: 20
  },
  header: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: '12%'
  },
  head1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    top: 20
  },
  profileContainer: {
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    top: 50
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f8f8f8',
    marginBottom: 15,

  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 10,
  },
  userAddress: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    top: 70
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;

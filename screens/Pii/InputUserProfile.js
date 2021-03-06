import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Platform,
  Button, TouchableHighlight, Image,
  Alert, KeyboardAvoidingView, ImageBackground,
  TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import bgImage from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { dbCall } from '../../constants/dbCall';
import * as firebase from 'firebase';


export default class InputUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }

    this.state = {
      firstName: null,
      lastName: null,
      age: null,
      weight: null,
      height: null,
      gender: null,
      uuid: (firebase.auth().currentUser || {}).uid,
    };
  }



  onClickListener = () => {
    if (this.state.firstName != null && this.state.lastName != null && this.state.age != null && this.state.weight != null && this.state.height != null) {
      Alert.alert("Congratulations", "" + this.state.firstName + " you can begin tracking your exercises");

      this.props.navigation.navigate('UserInfo');

      var test = 'insert into users (UUID, LastName, FirstName, Height, Weight, Age, Gender) values (\'' + this.state.uuid + '\',\'' + this.state.lastName + '\',\'' + this.state.firstName + '\',' + this.state.height + ',' + this.state.weight + ',' + this.state.age + ',\'' + this.state.gender + '\');';
      console.log(test);
      this.setState({ firstName: '' });
      this.setState({ lastName: '' });
      this.setState({ age: '' });
      this.setState({ weight: '' });
      this.setState({ height: '' });
      this.setState({ gender: '' });
      return dbCall(test, this, function (responseData, component) {
        // Note: This function will be executed inside of the dbCall function when the API responds with data
      });
    }
    else {
      Alert.alert("You didn't enter all of your personal info!");
    }
  }

  // <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
  // source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>


  render() {


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Icon name={'md-person'} style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="First Name"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ firstName: text }) }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name={'md-person'} style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="Last Name"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ lastName: text }) }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name={'md-person'}
                  style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="Age"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ age: text }) }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name={'md-person'}
                  style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="Weight"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ weight: text }) }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name={'md-person'}
                  style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="Height"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ height: text }) }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name={'md-person'}
                  style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} size={28} />
                <TextInput style={styles.inputs}
                  placeholder="Gender"
                  underlineColorAndroid='transparent'
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={(text) => { this.setState({ gender: text }) }}
                />
              </View>

              <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                onPress={() => this.onClickListener()} >
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#00b5ec',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: 'rgba(255, 255, 255, 0.7)',

  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#rgba(255, 255, 255, 0.8)',
  },
  signUpText: {
    color: 'black',
    fontSize: 24,
  }
});
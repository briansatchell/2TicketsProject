import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { dbCall } from '../../constants/dbCall';
import * as firebase from 'firebase';
import SignoutButton from '../../components/AppComponents/SignoutButton';
import bgImage from '../../assets/images/background.png';



export default class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            weight: '',
            height: '',
            uuid: (firebase.auth().currentUser || {}).uid,
            BMI: '',
        };
    }


    componentDidMount() {


        return dbCall('select * from users where age = 75;', this, function (responseData, component) {
            // Note: This function will be executed inside of the dbCall function when the API responds with data

            // TODO: Add Safety checks -> length of responseData
            var state = {
                isLoading: false,
                firstName: responseData[0].firstname,
                lastName: responseData[0].lastname,
                age: responseData[0].age,
                weight: responseData[0].weight,
                height: responseData[0].height
            };
            component.setState(state, function () {
            });
        });
    }




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

                <View style={{ padding: 50, alignItems: 'center' }}>

                    <Text style={{ fontSize: 40, color: 'white' }}>{this.state.firstName} </Text>
                    <Text style={{ fontSize: 40, color: 'white' }}> {this.state.lastName}'s </Text>

                    <Text style={{ fontSize: 40, color: 'white' }}> Profile Page</Text>

                    <View style={{ paddingTop: 20 }} />
                    <Text style={styles.textStyle}>Age: {this.state.age}</Text>
                    <View style={{ paddingTop: 10 }} />
                    <Text style={styles.textStyle}>Height: {this.state.height}</Text>
                    <View style={{ paddingTop: 10 }} />
                    <Text style={styles.textStyle}>Weight: {this.state.weight}</Text>
                    <View style={{ paddingTop: 10 }} />


                    {/* BMI=weight/(height*height) in kg and cm */}
                    <Text style={styles.textStyle}>BMI: 24.9</Text>

                    <SignoutButton />



                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: 'white',
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },


});
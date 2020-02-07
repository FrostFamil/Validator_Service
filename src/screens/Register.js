import React, { Component } from 'react';
import { StyleSheet, Dimensions,TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Block, Text, Input } from '../components';
import registerEndPoint from '../endPoints/registerEndPoint';

const { width } = Dimensions.get('screen');

export default class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    nickname: '',
    age: '',
    gender: '',
    country: '',
    address: ''

  }

  onSubmit = () => {

    const { firstName, lastName, nickname, age, gender, country, address } = this.state;

    if( firstName.length > 6 && lastName.length > 6 && nickname.length > 6){
        registerEndPoint(firstName, lastName, nickname, age, gender, country, address).then(res => {
            
          if(res === undefined){
            alert('Age should be bigger then 18');
          }else{
            alert(res.message);
          }
                 
        })
    }else if( firstName === '' || lastName === '' || nickname === '' || age === '' || gender === '' || country === '' || address === '') {
      alert('Please fill all fields correclty')
    }else{
      alert ('First name, Last name, nickname should be at least 7 character long');
    }
    
  }

  render() {

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: '#97387a'}} enableOnAndroid>
        <Block center>
          <Block center style={{ marginTop: 60 }}>
            <Input
              full
              minLength={7}
              label="First name"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ firstName: text})}
            />
            <Input
              full
              minLength={7}
              label="Last name"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ lastName: text })}
            />
            <Input
              full
              minLength={7}
              label="Nickname"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ nickname: text })}
            />
            <Input
              full
              keyboardType='numeric'
              label="Age"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ age: text })}
            />
            <Input
              full
              label="Gender"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ gender: text} )}
            />
            <Input
              full
              label="Country"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ country: text })}
            />
            <Input
              full
              label="Address"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ address: text })}
            />
            <Text style={styles.errorTextStyle} >{this.state.error}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSubmit()}
            >
              <Text button>Save</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#D6DDF6',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  active: {
    borderColor: '#2E5BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#rgba(46, 92, 255, 0.2)',
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: '#rgba(46, 92, 255, 0.2)'
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
  errorTextStyle: {
    fontSize: 18,
    color: 'red'
  },
  button: {
    backgroundColor: '#3CB371',
    borderRadius: 20,
    height: 55,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 55
  }
})
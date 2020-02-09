import React, { Component } from 'react';
import { StyleSheet, Dimensions,TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Block, Text, Input } from '../components';
import registerEndPoint from '../endPoints/registerEndPoint';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const { width } = Dimensions.get('screen');

export default class Register extends Component {
  
  constructor(props) {

    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      nickname: '',
      age: '',
      gender: '',
      country: '',
      address: '',
      disabled: true,
      firstNameError: '',
      lastNameError: '',
      nicknameError: ''
    }

  }

  inputValidator=() => {
    const {firstName, lastName, nickname, age, gender, country, address} = this.state;
    let { firstNameValid, lastNameValid, ageValid, genderValid, countryValid, addressValid } = false;
    let nicknameValid = true

    if(firstName !== ''){
      if(firstName === '' || (firstName !== '' && firstName.length <= 6)){
        this.setState({firstNameError: "Firstname should be at least 7 Character"})
        firstNameValid = false;
      }else{
        this.setState({ firstNameError: ''})
        firstNameValid = true;
      }
    }

    if(lastName !== ''){
      if(lastName.length <= 6){
        this.setState({lastNameError: "Lastname should be at least 7 Character"})
        lastNameValid = false;
      }else{
        this.setState({ lastNameError: ''})
        lastNameValid = true;
      }
    }

    if(nickname !== '' && nickname.length <= 6){
      this.setState({nicknameError: "Nickname should be at least 7 Character"})
      nicknameValid = false;
    }else{
      this.setState({ nicknameError: ''})
    }

    if(age !== ''){
      ageValid = true;      
    }

    if(gender !== ''){
      genderValid = true;
    }

    if(country !== ''){
      countryValid = true;
    }

    if(address !== ''){
      addressValid = true;
    }

    if(firstNameValid && lastNameValid && nicknameValid && ageValid && genderValid && countryValid && addressValid ){
      this.setState({disabled: false});
    }else{
      this.setState({ disabled: true });
    }
    
  }

  onSubmit = () => {

    const { firstName, lastName, nickname, age, gender, country, address } = this.state;

    registerEndPoint(firstName, lastName, nickname, age, gender, country, address).then(res => {
      if(res){
        alert(res.message);   
      }       
      });
  }

  render() {

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: '#97387a'}} enableOnAndroid>
        <Block center>
          <Block center style={{ marginTop: 45 }}>
            <Input
              full
              minLength={7}
              label="First name*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ firstName: text})}
              onBlur={() => this.inputValidator()}
            />
            <Text style={styles.errorTextStyle} >{this.state.firstNameError}</Text>
            <Input
              full
              minLength={7}
              label="Last name*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ lastName: text })}
              onBlur={() => this.inputValidator()}
            />
            <Text style={styles.errorTextStyle} >{this.state.lastNameError}</Text>
            <Input
              full
              minLength={7}
              label="Nickname(Optional)"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ nickname: text })}
              onBlur={() => this.inputValidator()}
            />
            <Text style={styles.errorTextStyle} >{this.state.nicknameError}</Text>
            <Input
              full
              keyboardType='numeric'
              label="Age*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ age: text })}
              onBlur={() => this.inputValidator()}
            />
            <Input
              full
              label="Gender*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ gender: text} )}
              onBlur={() => this.inputValidator()}
            />
            <Input
              full
              label="Country*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ country: text })}
              onBlur={() => this.inputValidator()}
            />
            <Input
              full
              label="Address*"
              style={{ marginBottom: 17 }}
              onChangeText={(text) => this.setState({ address: text })}
              onBlur={() => this.inputValidator()}
            />

            <TouchableOpacity onPress={() => this.onSubmit()} disabled={this.state.disabled}
              style={{backgroundColor: this.state.disabled ? '#686868':'#3CB371',
                      height: 55,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 200}}
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
    fontSize: 15,
    color: 'red'
  }
})
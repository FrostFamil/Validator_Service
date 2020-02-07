import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack";


import Register from './Register';


const AppNavigator = createStackNavigator({
	First: {
		screen: createBottomTabNavigator({
			register: { screen: Register, navigationOptions: { tabBarVisible: false }},
		  }, {
			lazy: true,
			tabBarVisible: false
		  }),
		  navigationOptions: { gestureEnabled: false } 
	}
}, {
	headerMode: 'none'
});


const AppContainer = createAppContainer(AppNavigator);

class AppNavigation extends Component {
  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

export default AppNavigation;

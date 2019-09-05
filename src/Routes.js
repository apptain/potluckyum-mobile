import React, {Component} from 'react';
import { Platform, Animated, Easing, Text } from "react-native";
import { Icon } from "react-native-elements";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { connect } from 'react-redux';

import EventsList from "./containers/screens/EventsList";
import EventForm from "./containers/screens/EventForm";
import EventView from "./containers/screens/EventView";
import Login from "./containers/screens/Login";
import Profile from "./containers/screens/Profile";

import { EventListHeader, EventViewHeader, EventFormHeader, ProfileHeader } from './containers/headers';

const tabBarIcon = (nameInactive, nameActive) => ({ tintColor, focused }) => (
  <Icon name={focused ? nameActive : nameInactive} size={26} color={"#000"} />
);

//Custom Nav Transform Example
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })
      return { transform: [ { translateX } ] }
    },
  }
}

const EventsStack = createStackNavigator({
  EventsList: {
    screen: EventsList,
    path: '/',
    // navigationOptions: ({navigation}) => ({
    //   header: <EventListHeader navigation={navigation}/>
    // })
  },
  EventView: {
    screen: EventView,
    path: '/events/:title'
    // navigationOptions: ({navigation}) => ({
    //   header: <EventViewHeader navigation={navigation}/>
    // })
  }}, {
  animationEnabled: false,
  swipeEnabled: true,
  transitionConfig
});

const EventFormStack = createStackNavigator({
  EventForm: {
    screen: EventForm,
    path: '/',
    // navigationOptions: ({navigation}) => ({
    //   header: <EventFormHeader navigation={navigation}/>
    // })
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    path: '/',
    // navigationOptions: ({navigation}) => ({
    //   header: <ProfileHeader navigation={navigation}/>
    // })
  },
});

const tabConfig =  {
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarPosition: 'bottom',
  headerMode: 'none',
  animationEnabled: false,
  swipeEnabled: false,
  navigationOptions: {
    headerVisible: false,
  }
};

const AuthenticatedTabs = createMaterialBottomTabNavigator({
    EventsList: {
      screen: EventsStack,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
    EventUpsert: {
      screen: EventFormStack,
      navigationOptions: {
        tabBarLabel: "New Event",
        tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={35} color={tintColor}/>
      },
    }
  }, tabConfig);

const UnauthenticatedTabs = createMaterialBottomTabNavigator({
  EventsList: {
    screen: EventsStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: "Login",
      tabBarIcon: tabBarIcon("account-circle", "account-circle")
    }
  }
}, tabConfig);

const App = createAppContainer(AuthenticatedTabs);

const mapStateToProps = state => ({
  nav: state.nav,
  jwt: state.auth.jwt
});

export default connect(mapStateToProps)(App);
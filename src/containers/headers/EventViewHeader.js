import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  Toolbar,
  ToolbarContent,
  ToolbarBackAction
} from 'react-native-paper';

class EventViewHeader extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarBackAction onPress={() => { this.props.navigation.navigate("EventsList")}} />
        <ToolbarContent title={this.props.event.Title }/>
      </Toolbar>
    )
  }
}

var mapStateToProps = function (state) {
  return {
    event: state.event.event
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventViewHeader);




import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import {eventActions} from "../../redux/actions";
import {eventUpsert}  from "../../apiCalls";

import {
  Toolbar,
  ToolbarContent,
  ToolbarAction
} from 'react-native-paper';

class EventFormHeader extends Component {
  constructor (props) {
    super(props);
    this.clearEvent = this.clearEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  clearEvent(){
    //TODO: Add modal confirmation
    this.props.eventChange({});
  }

  saveEvent(){
    //TODO: At least show validation
    let { title, content, base64ImageString, blobImagePath } = this.props.eventEdit;
    if(!title) {
      throw "Title Required";
    }
    if(!content) {
      throw "Content Required";
    }
    if(!base64ImageString && !blobImagePath){
      throw "Image Required";
    }
    var data = Object.assign({}, this.props.eventEdit);
    this.props.eventUpsert(eventUpsert, data, this.props.jwt);
  }

  render() {
    return (
      <Toolbar>
        <ToolbarAction icon="close" onPress={() => { this.clearEvent()}} />
        <ToolbarContent title={this.props.title} />
        <ToolbarAction icon="done" onPress={() => { this.saveEvent()}} />
      </Toolbar>
    )
  }
};

var mapStateToProps = function (state) {
  return {
    title: state.event.event.id ? "UPDATE STORY" : "CREATE STORY",
    eventEdit: state.event.eventEdit,
    jwt: state.auth.jwt
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    eventChange(eventEdit){
      dispatch(eventActions.eventChange(eventEdit));
    },
    eventUpsert(apiCall, event, token) {
      dispatch(eventActions.eventUpsert(apiCall, event, token));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventFormHeader);




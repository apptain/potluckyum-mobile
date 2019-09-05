import React, { Component} from "react";

import { Text, View, Alert, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import { connect } from "react-redux";


import {eventActions} from "../../redux/actions";

import { TextInput,
  Card,
  CardCover
} from 'react-native-paper';

import ActionButton from 'react-native-action-button';

import Form from 'react-native-jsonschema-form'
import eventSchema from 'potluckyum-shared/src/schemas/event/eventSchema';
import eventUiSchema from 'potluckyum-shared/src/schemas/event/eventUISchema';

function transformErrors(errors) {
  let reterrors=_.filter(errors,error => {
    console.log("eror",error.property)
    // return true
    return (error.message=="is a required property")

    // return  (!(error && error.property === ".properties['viniButton'].type") )
  })
  return reterrors
};

class EventForm extends Component {
  componentDidMount() {

  }

  selectPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

  }

  eventChange(fieldName, value){
    this.props.eventChange({...this.props.eventEdit, [fieldName]: value});
  }

  render() {
    let { title, content, mediaUri, blobImagePath } = this.props.eventEdit;

    return (
      <View style={styles.container}>
        <View style={styles.notch}></View>
        <Form
            schema={eventSchema()}
            uiSchema={eventUiSchema()}
            submitTitle={"Create Event"}
            noValidate={false}
            liveValidate={true}
            showErrorList={false}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#FFF',
  },
  formContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  fab: {
    alignSelf: 'flex-end'
  }
});

var mapStateToProps = function (state) {
  return {
    eventEdit: state.event.eventEdit
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    eventChange(eventEdit){
      dispatch(eventActions.eventChange(eventEdit));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);




import React, { Component} from "react";

import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import { connect } from "react-redux";


import {eventActions} from "../../redux/actions";

import { TextInput,
  Card,
  CardCover
} from 'react-native-paper';

import ActionButton from 'react-native-action-button';

class EventForm extends Component {
  componentDidMount() {
    //Make content look like a multiline text input
    const multiline = this.refs['content'];
    multiline.setNativeProps({style: {  height:250 }});
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
  imageCover(mediaUri, blobImagePath){
    if(mediaUri){
      return <CardCover source={{uri: mediaUri}} />
    } else if(blobImagePath) {
      return <CardCover source={{uri: blobImagePath}} />
    }
    else {
      return <CardCover source={require('../../assets/image-placeholder.png')} />
    }
  }

  render() {
    let { title, content, mediaUri, blobImagePath } = this.props.eventEdit;

    return (
      <View style={styles.container}>
        <Card>
          {this.imageCover(mediaUri, blobImagePath)}
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            autoInactive={true}
            style={styles.fab}
            onPress={() => { this.selectPhoto()}}
          />
        </Card>
        <View style={styles.formContainer}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={text => this.eventChange('title', text)}
          />
          <TextInput
            ref={"content"}
            multiline={true}
            numberOfLines={100}
            label="Content"
            value={content}
            onChangeText={text => this.eventChange('content', text)}
          />
        </View>
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




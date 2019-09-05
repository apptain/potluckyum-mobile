import React, { Component } from "react";
import { Text, View, Image, Platform, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";

class EventView extends Component {
  render() {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    const imageWidth = deviceWidth;
    const imageHeight = imageWidth * .66;

    return (
      <View style={styles.container}>
        <Image
          style={{width: imageWidth, height: imageHeight}}
          source={{uri: this.props.event.BlobImagePath}}
        />
        <Text style={styles.title}>
          {this.props.event.Title}
        </Text>
        <Text>
          {this.props.event.Content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    // marginBottom: 30,
    // textAlign: 'center', // <-- the magic
    // fontWeight: 'bold',
    // fontSize: 18,
    // marginTop: 0,
    // width: 200,
    // backgroundColor: 'yellow'
  }
})

var mapStateToProps = function (state) {
  return {
    event: state.event.event
  }
}

var mapDispatchToProps = function (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);




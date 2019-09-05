import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Text, View, StyleSheet } from "react-native";
import {
  Right,
  Body,
  List,
  ListItem
} from "native-base";

import { ListView, withTheme } from 'react-native-paper';;
import { connect } from "react-redux";

import {eventsGet} from "../../apiCalls";
import {eventActions} from "../../redux/actions";

const styles = StyleSheet.create({
  headerText: {
    margin: 14,
  },
});

class EventsList extends Component {
  componentDidMount(){
		this.props.getEventsList(eventsGet, this.props.filter);
  };

  navigateToEvent(event){
    this.props.eventSelect(event);
    this.props.navigation.navigate('EventView', {event});
  };

  render() {
    return (
      <View>
        <List
          removeClippedSubviews={false}
          dataArray={this.props.events}
          renderRow={dataRow =>
            <ListItem
              onPress={this.navigateToEvent.bind(this, dataRow)}
              button
              thumbnail
            >
            <Body>
            <Text style={styles.title}>
              {dataRow.Title}
            </Text>
            <Text style={styles.content}>
              {dataRow.Content}
            </Text>
            </Body>
            <Right
              style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
              <Text style={styles.timeText}>
                {dataRow.time}
              </Text>
            </Right>
          </ListItem>
          }
        />
      </View>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    events: state.event.events,
    filter: state.event.filter
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    getEventsList(apiCall, filter) {
      dispatch(eventActions.eventsGet(apiCall, filter));
    },
    eventSelect(event) {
      dispatch(eventActions.eventSelect(event));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default class ToDo extends React.Component{
  state = {
    isEditing: false,
    isCompleted: false
  };
  render() {
    const { isCompleted } = this.state;
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View 
            style={[
              styles.circle, 
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]} 
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hi this is to-do</Text>
      </View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 4,
    marginRight: 15,
  },
  completedCircle: {
    borderColor: "#654ea3",
    
  },
  uncompletedCircle: {
    borderColor: "#eaafc8",
  }
})
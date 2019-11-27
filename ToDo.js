import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";

const { height, width } = Dimensions.get("window");

export default class ToDo extends React.Component{
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  };
  render() {
    const { isEditing, isCompleted, toDoValue } = this.state;
    const { text } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View 
              style={[
                styles.circle, 
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]} 
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput 
              style={[
                  styles.text,
                  styles.input, 
                  isCompleted ? styles.completedText : styles.uncompletedText
              ]} 
              value={toDoValue} 
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEdifing}
            />
          ) : (
            <Text 
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}>
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.action}>
            <TouchableOpacity onPressOut={this._finishEdifing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✔️</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.action}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>📝</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>🗑</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
  _startEditing = () => {
    const {text} = this.props;
    this.setState({
      isEditing: true,
      toDoValue: text
    })
  };
  _finishEdifing = () => {
    this.setState({
      isEditing: false
    })
  };
  _controlInput = (text) => {
    this.setState({
      toDoValue: text
    })
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    marginLeft: 10
  },
  completedCircle: {
    // borderColor: "#654ea3",
    borderColor: "#bebebe",
  },
  uncompletedCircle: {
    borderColor: "#eaafc8",
  },
  completedText: {
    color: "#bebebe",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353535",
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    // justifyContent: "space-between"
  },
  action: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 15,
    paddingBottom: 5,
    width: width / 2,
  }
})
import React from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from "react-native";
import Todo from "./ToDo"

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };
  render() { 
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Aurora, Do To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New to do"} 
            placeholderTextColor={"#999"}
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            <Todo />
          </ScrollView>
        </View>
      </View>
    )
   };
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#654ea3",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    marginTop: 70,
    marginBottom: 30,
    fontWeight: "200",
  },
  card: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width:0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  todo: {
    alignItems: "center"
  }
});

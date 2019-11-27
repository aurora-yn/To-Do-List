import React from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from "react-native";
import AppLoading from "expo";
import uuidv1 from "uuid/v1";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {

    }
  };
  componentDidMount = () => {
    this._loadTodos;
  };
  render() { 
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    // if (!loadedToDos) {
    //   return <AppLoading></AppLoading>;
    // }
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
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            {/* {toDos.map(todo => <ToDo />)} */}
            {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} />)}
          </ScrollView>
        </View>
      </View>
    )
   };
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadTodos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  _addToDo = () => {
    const { newToDo } = this.setState;
    if( newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID] : {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObj
          }
        };
        return { ...newState };
      });
    }
  };
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

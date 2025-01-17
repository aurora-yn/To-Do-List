import React from "react";
import { StyleSheet, Text, View, 
  StatusBar, TextInput, Dimensions, 
  Platform, ScrollView 
} 
  from "react-native";
import AppLoading from "expo";
import uuidv1 from "uuid/v1";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };
  componentDidMount = () => {
    this._loadTodos();
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
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            {/* Array */}
            {/* {toDos.map(todo => <ToDo />)} */}
            {/* Object */}
            {Object.values(toDos).map(toDo => (
              <ToDo 
                key={toDo.id} 
                deleteTodo={this._deleteToDo} 
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...toDo} 
              />
            ))}
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
    const { newToDo } = this.state;
    if(newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
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
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ... prevState,
        ... toDos
      }
      return { ... newState };
    });
  };
  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      return {...newState};
    });
  };
  _completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      return {...newState};
    });
  };
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      return {...newState};
    });
  };
};

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

# Do To Do List
Do To Do List App with React Native

#1. UI
*Dimensions*
- Detect screen
```
const { height, width } = Dimensions.get("window");
```

*Platform*
- Shadow styling iOS/Android
```
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
```

*ScrollView*
*TouchableOpacity*


#2. toggle with previous state
```
  this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    })
  }
```
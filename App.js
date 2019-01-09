import React,{ Component }from 'react';
import { StyleSheet, Text, View, Alert, Button, AsyncStorage} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: '',
      msg: 'Guess a number between 1-100',
      randomNumber: Math.floor(Math.random() * 100) + 1,
      count: 0
    }
  }

  scoreSave = async () => {
    try {
      await AsyncStorage.setItem('highscore', JSON.stringify(this.state.count));
    } catch (err) {
      Alert.alert(err);
    }
  }

  numerGuess = () => {
    this.setState({ count: this.state.count + 1 }, function(){

      if (this.state.number == this.state.randomNumber) {
        this.scoreSave();
        Alert.alert('Highscores in ' + this.state.count + ' guesses');
      }else if (this.state.number < this.state.randomNumber) {
        this.setState({ msg: 'your guess ' + this.state.number + ' too low' });
      } else if (this.state.number > this.state.randomNumber) {
      this.setState({ msg: 'your guess ' + this.state.number + ' too high' })
    }else { }
    });    
     
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.msg}</Text>
        <TextInput value={this.state.number}
          style={{ width: 100, borderColor: 'gray', borderWidth: 1 }}
          keyboardType='phone-pad'
          onChangeText={(number) => this.setState({ number })} />
        <Button onPress={this.numerGuess} title='MAKE GUESS' style = {styles.button} color='#0066ff' />

        <Text>{`Highscore: ${this.state.count} guesses`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

export default class SentenceView extends Component {
  constructor(props) {
    super(props);
    this.sentence = props.sentence
    this.state = {
      isAnsHidden: true,
    }
  }

  _onPressButton() {
    var ansColor = "red"
    if(this.state.text == this.sentence.en) {
      ansColor = "green"
    }
    this.setState({
      isAnsHidden: false,
      ansColor: ansColor,
    })
  }

  render() {
    let style = {
      flexDirection: 'column',
      padding: 10,
      flex: 1,
    }

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={style}>
          <Text>{this.sentence.jp}</Text>
          <View style={{marginTop: 10, height: 50}}>
            {!this.state.isAnsHidden &&
              <Text style={{color: this.state.ansColor}}>{this.sentence.en}</Text>
            }
          </View>
          <TextInput
            numberOfLines={3}
            placeholder="Write the sentence."
            multiline={true}
            onChangeText={(text) => this.setState({text})}
          />
          <Button
            onPress={() => this._onPressButton()}
            title="Check"
            color="steelblue"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

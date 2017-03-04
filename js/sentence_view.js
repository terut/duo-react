import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import Sound from 'react-native-sound'
import * as JsDiff from 'diff'

export default class SentenceView extends Component {
  constructor(props) {
    super(props)
    this.sentence = props.sentence
    this._clearCache()
    this.state = {
      diff: null,
      text: "",
      readingCount: 30,
    }
  }

  _onPressButton() {
    const diff = JsDiff.diffWords(this.state.text, this.sentence.en)
    this._clearCache()
    this.setState({
      diff: diff
    })
  }

  _onPressClearButton() {
    this._clearCache()
    this.setState({
      diff: null,
      text: ""
    })
  }

  _onPressSoundButton() {
    const _readingCount = this.state.readingCount - 1
    this.setState({readingCount: _readingCount})

    const fileNumber = ("000"+this.sentence.number).slice(-3)
    var whoosh = new Sound(`s${fileNumber}.m4a`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        //console.warn('failed to load the sound', error);
      } else { // loaded successfully
        //console.warn('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            //console.warn('successfully finished playing');
          } else {
            //console.warn('playback failed due to audio decoding errors');
          }
          whoosh.stop()
          whoosh.release()
        })
      }
    })
  }

  _clearCache() {
    this._cachedText = null
  }

  _showEn() {
    if(!this.state.diff) {
      return ""
    }

    if(this._cachedText) {
      return this._cachedText
    }

    this.cachedText = this.state.diff.map((part, i) => {
      if(part.removed) {
        return
      }
      if(part.added) {
        return <Text key={i} style={{color: "red"}}>{part.value}</Text>
      }
      return part.value
    })
    return this.cachedText
  }

  render() {
    let style = {
      flexDirection: 'column',
      padding: 10,
      flex: 1,
      backgroundColor: 'white',
    }

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={style}>
          <Text>{this.sentence.jp}</Text>
          <View style={{marginTop: 10, height: 50}}>
            <Text style={{color: "green"}}>{this._showEn()}</Text>
          </View>
          <TextInput
            numberOfLines={3}
            placeholder="Write the sentence."
            multiline={true}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
          />
          <Button
            onPress={() => this._onPressButton()}
            title="Check"
            color="steelblue"
          />
          <View style={{marginTop: 20}}>
            <Button
              onPress={() => this._onPressClearButton()}
              title="Clear"
              color="grey"
            />
          </View>
          <View style={{marginTop: 70}}>
            <Button
              onPress={() => this._onPressSoundButton()}
              title={`Reading Aloud\n${this.state.readingCount > 0 ? this.state.readingCount : 'Done'}`}
              color="#F68D5D"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

'use strict'

import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity} from 'react-native';

import SentenceView from "./sentence_view"

export default class SentenceList extends Component {

  constructor(props) {
    super(props);
    const sentences = ["AAAAAAAA", "BBBBBBBB", "CCCCCCCCCCC"]
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(sentences)
    }
  }

  _onPressButton = () => {
    const nextRoute = {
      component: SentenceView,
      passProps: {
        title: 'Sentence',
        nav: this.props.nav
      }
    }
    this.props.nav.push(nextRoute)
  }

  _listItemView(rowData) {
    let style = {
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 10,
    }
    // if(this.state.dataSource.indexOf(rowData) == (this.dataSource.size - 1)) {
    //   style.marginBottom = 10
    // }
    return (
      <TouchableOpacity onPress={this._onPressButton} style={style}>
        <View style={{width:40, height: 40, justifyContent:'center', alignItems: 'center', backgroundColor: 'steelblue', marginRight: 5, marginLeft: 5, borderRadius: 20}}>
          <Text style={{color: 'white'}}>1</Text>
        </View>
        <View style={{flex: 1, marginLeft: 5, marginRight: 5}}>
          <Text>AAAAAAAAAAAAAAA\\nAAAAAAAAAA\\nAAAAAAAAAAAA\\nAAAAAAAAAAAAAA\\nAAAAAAAAAAAAAA</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._listItemView(rowData)}
        />
      </View>
    )
  }
}

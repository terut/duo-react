'use strict'

import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity} from 'react-native';

import SentenceView from "./sentence_view"

export default class SentenceList extends Component {

  constructor(props) {
    super(props);
    this.section = props.section
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.section.sentences)
    }
  }

  _onPressButton(sentence) {
    const nextRoute = {
      component: SentenceView,
      passProps: {
        title: `Sentence ${sentence.number}`,
        nav: this.props.nav,
        sentence: sentence,
      }
    }
    this.props.nav.push(nextRoute)
  }

  _listItemView(rowData, sectionId, rowId) {
    let style = {
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 15,
    }
    if(rowId == this.state.dataSource.getSectionLengths(sectionId)) {
      style.marginBottom = 15
    }

    return (
      <TouchableOpacity onPress={() => this._onPressButton(rowData)} style={style}>
        <View style={{width:40, height: 40, justifyContent:'center', alignItems: 'center', backgroundColor: 'steelblue', marginRight: 5, marginLeft: 5, borderRadius: 20}}>
          <Text style={{color: 'white'}}>{rowData.number}</Text>
        </View>
        <View style={{flex: 1, marginLeft: 5, marginRight: 5}}>
          <Text>{rowData.jp}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => this._listItemView(rowData, sectionId, rowId)}
        />
      </View>
    )
  }
}

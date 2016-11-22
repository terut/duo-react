import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';

import SentenceList from './sentence_list';

export default class SectionList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    }
  }

  _onPressButton = () => {
    const nextRoute = {
      component: SentenceList,
      passProps: {
        title: 'Sentences',
        nav: this.props.nav
      }
    }
    this.props.nav.push(nextRoute)
  }

  _listItemView(rowData) {
    var style = {
      height: 100,
      flexDirection: 'row',
      marginTop: 10,
    }
    // if(this.state.dataSource.indexOf(rowData) == (this.dataSource.size - 1)) {
    //   style.marginBottom = 10
    // }
    return (
      <View style={style}>
        <TouchableOpacity onPress={this._onPressButton} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue', marginRight: 5, marginLeft: 10}}>
          <Text>Section 1</Text>
          <Text>10 sentences</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressButton} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', marginRight: 10, marginLeft: 5}}>
        <Text>Section 2</Text>
        <Text>15 sentences</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    console.warn(this.props.title)
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

import React, { Component } from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'

import SentenceList from './sentence_list'
import SectionBuilder from './models/section_builder'

export default class SectionList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props)
    const builder = new SectionBuilder()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(builder.build())
    }
  }

  // componentDidMount() {
  //   this.fetchData().done()
  // }
  //
  // async fetchData() {
  //   const sections = await this.builder.build()
  //   this.setState({
  //     dataSource: this.ds.cloneWithRows(sections)
  //   })
  // }

  _onPressButton(section) {
    const nextRoute = {
      component: SentenceList,
      passProps: {
        title: `Section ${section.number}`,
        nav: this.props.nav,
        section: section,
      }
    }
    this.props.nav.push(nextRoute)
  }

  _listItemView(rowData, sectionId, rowId) {
    var style = {
      height: 80,
      flexDirection: 'row',
      marginTop: 10,
    }
    if(rowId == this.state.dataSource.getSectionLengths(sectionId)) {
      style.marginBottom = 10
    }

    const left = (
      <TouchableOpacity onPress={() => this._onPressButton(rowData[0])} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'steelblue', marginRight: 5, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: 'steelblue'}}>Section {rowData[0].number}</Text>
        <Text>{rowData[0].sentences.length} sentences</Text>
      </TouchableOpacity>
    )
    const right = (
      rowData[1] ? (
        <TouchableOpacity onPress={() => this._onPressButton(rowData[1])} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'steelblue', marginRight: 10, marginLeft: 5}}>
          <Text style={{fontWeight: 'bold', color: 'steelblue'}}>Section {rowData[1].number}</Text>
          <Text>{rowData[1].sentences.length} sentences</Text>
        </TouchableOpacity>
      ) : (
        <View style={{flex: 1, marginRight: 10, marginLeft: 5}}/>
      )
    )

    return (
      <View style={style}>
        {left}
        {right}
      </View>
    )
  }

  render() {
    return (
      <View sytle={{flex: 1, backgroundColor: 'white'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => this._listItemView(rowData, sectionId, rowId)}
        />
      </View>
    )
  }
}

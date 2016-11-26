import React, { Component } from 'react';
import { AppRegistry, View, Navigator, Text, TouchableOpacity } from 'react-native';

import SectionList from './js/section_list';

class Duo extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{
           component: SectionList,
           passProps: {
             title: "Duo 3.0",
           }
        }}
        renderScene={(route, navigator) =>
          <View style={{flex: 1, paddingTop: 56}}>
            <route.component nav={navigator} {...route.passProps} />
          </View>
        }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if(index == 0) {
                  return null
                }
                return (
                  <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={() => navigator.pop()}
                    >
                    <Text style={{color: 'white', margin: 10, fontSize: 16}}>
                      Back
                    </Text>
                  </TouchableOpacity>
                )
              },
              RightButton: (route, navigator, index, navState) => {
                return null
                // return (
                //   <TouchableOpacity style={{flex: 1, justifyContent: 'center', backgroundColor: "blue"}}>
                //     <Text style={{color: 'white', margin: 10, fontSize: 16}}>
                //       Next
                //     </Text>
                //   </TouchableOpacity>
                // )
              },
              Title: (route, navigator, index, navState) => {
                return (
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: 'white', margin: 10, fontSize: 16}}>
                      {route.passProps.title}
                    </Text>
                  </View>
                )
              },
            }}
            style={{backgroundColor: "steelblue"}}
          />
        }
      />
    )
  }
}

AppRegistry.registerComponent('duo', () => Duo);

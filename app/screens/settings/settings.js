import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {withRkTheme} from 'react-native-ui-kitten';


export class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings!</Text>
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
});
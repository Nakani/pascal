import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export class Search extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      <MapView style={styles.map}
        region={{
          latitude: -30.034513, 
          longitude: -51.219322,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
      <MapView.Marker 
        coordinate={{
          latitude: -30.027687,   
          longitude: -51.218966,
        }}
        title={'Pet shop Amigo legal'}
        description={'Escola e pet shop amigo legal'}
        />

      <MapView.Marker 
        coordinate={{
          latitude: -30.078441,    
          longitude: -51.198143,
        }}
        title={'CrieBem'}
        description={'Clinica Veterinária'}
        />


      </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'  
  },
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
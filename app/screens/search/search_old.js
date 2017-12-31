import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions 
} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height 
const SCREEN_WIDTH  = width 
const ASPECT_RATIO  = width / height 
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA =  LATTITUDE_DELTA * ASPECT_RATIO


export class Search extends React.Component {
  constructor(props){
    super(props)


    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, 
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout:20000, maxinumAge:1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGTITUDE_DELTA,
        latitudeDelta: LATTITUDE_DELTA
      }

      this.setState({ initialPosition: lastRegion})
      this.setState({ markerPosition: lastRegion})
    })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <View style={styles.container}>

      <MapView 
        style={styles.map}
        region={this.state.initialPosition}>
        
        <MapView.Marker 
          coordinate={{
            latitude: -30.027687,   
            longitude: -51.218966,
          }}
          title={'Pet shop Amigo legal'}
          description={'Escola e pet shop amigo legal'}
          />

        <MapView.Marker 
          coordinate={this.state.markerPosition} >
          <View style={styles.radius}>
            <View style={styles.marker}>
            </View>
          </View>
        </MapView.Marker>
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
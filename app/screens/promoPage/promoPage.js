import React from 'react';
import {
  FlatList,
  Image,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import {data} from '../../data';
import { Constants, LinearGradient } from 'expo';
import { FirebaseApp } from '../../utils/firebase-app';
import { Container, Button, Text, Header, Left, Body, Title, Right, Icon, Content} from "native-base";
import Swiper from 'react-native-swiper';

export default class PromoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.containerFull}>

        <ScrollView >

          <View style={{width: '100%', height: 300}}>
            <Swiper activeDotColor='white'>
              <View>
                <Image style={{height: '100%', width: '100%'}} source={require('../../assets/images/banze2.jpg')}/>
              </View>
              <View>
                <Image style={{height: '100%', width: '100%'}} source={require('../../assets/images/banze1.jpeg')}/>
              </View>
              <View>
                <Image style={{height: '100%', width: '100%'}} source={require('../../assets/images/banze3.jpg')}/>
              </View>
            </Swiper>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, marginTop: 15}}>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <RkText rkType='header3'>Banho e tosa</RkText>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <RkText style={{alignSelf: 'center', fontSize: 14}}>Valido até: </RkText>
              <RkText style={{alignSelf: 'center', fontSize: 14, color: '#FE7002', fontWeight: 'bold'}}>10/10/2018</RkText>
            </View>
          </View>

          <View View style={{marginLeft: 15, marginTop: 5}}>
            <RkText rkType='secondary7 hintColor'>R. Vicente da Fontoura, 2788</RkText>
            <RkText rkType='secondary7 hintColor'>Rio Branco, Porto Alegre - RS, 90640-002</RkText>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginHorizontal: 5, marginVertical: 5}}>
            <View style={{backgroundColor: '#FE7002', width: 96, height: 64, borderRadius: 8, marginHorizontal: 5}}>
              <View style={{alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%', marginTop: 0.2}}>
                <RkText style={{alignSelf: 'center', color: 'white'}}rkType='secondary7'>RESTAM</RkText>
              </View>
              <RkText style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 24}}>356</RkText>
            </View>
            <View style={{backgroundColor: 'green', width: 96, height: 64, borderRadius: 8, marginHorizontal: 5}}>
              <View style={{alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%', marginTop: 0.2}}>
                <RkText style={{alignSelf: 'center', color: 'white'}}rkType='secondary7'>DESCONTO</RkText>
              </View>
              <RkText style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 24}}>40%</RkText>
            </View>
            <View style={{backgroundColor: 'gray', width: 96, height: 64, borderRadius: 8, marginHorizontal: 5}}>
              <View style={{alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%', marginTop: 0.2}}>
                <RkText style={{alignSelf: 'center', color: 'white'}}rkType='secondary7'>ROTA</RkText>
              </View>
              <View style={{alignSelf: 'center', flexDirection: 'row'}} >
                <Icon name="ios-pin-outline" style={{alignSelf: 'center', fontSize: 24, color: 'white', fontWeight: 'bold', marginRight: 1}} />
                <RkText style={{alignSelf: 'center', color: 'white', fontWeight: 'bold',fontSize: 24}}>1,2km</RkText>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 15}}>
            <RkText style={styles.post} rkType='header5'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus tristique urna nec enim iaculis vehicula. 
              Nullam id urna non velit iaculis rutrum.
            </RkText>
            <RkText style={styles.post} rkType='secondary5 hintColor'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus tristique urna nec enim iaculis vehicula. 
              Nullam id urna non velit iaculis rutrum.
            </RkText>
          </View>

          <View 
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            margin: 15, 
            borderRadius: 10,
            width: 96,
            height: 64,
            backgroundColor: '#5840FF'
            }}>

            <TouchableOpacity>
              <RkText style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 24}}>Pegar</RkText>
            </TouchableOpacity>

          </View>

        </ScrollView>


      </Container>
      );
  }


}


let styles = RkStyleSheet.create(theme => ({

headerBg:{
  backgroundColor: '#FE7002',
  borderBottomColor: 'transparent'

},
  containerFull: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#FE7002',
  },
  // header:{
  //   height:(Platform.OS === 'ios') ? 70 : 50,
  //   paddingTop:(Platform.OS === 'ios') ? 50 : 0,
  //   justifyContent:'center',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems:'center',
  //   paddingHorizontal: 20,
  // },

  headerLogoPascal:{
    maxWidth: 50,
    maxHeight: 50,
  },

  logoHeader: {
    width: (Platform.OS === 'ios') ? 12 : 12,
    height:(Platform.OS === 'ios') ? 23 : 23,
    paddingHorizontal: 20,

  },
  textHeader: {
    textAlign: 'center', 
    flex: 1,
    color: '#fff',
    left: 20,
  },
  // searchHeader: {
  //   marginLeft:(Platform.OS === 'ios') ? 30 : 23,
  // },

  containerCard: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13
  }
}));





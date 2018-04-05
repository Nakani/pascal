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





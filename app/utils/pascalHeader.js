import React from 'react';
import {
  FlatList,
  Image,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import {data} from '../data';
import { Constants, LinearGradient } from 'expo';
import { FirebaseApp } from './firebase-app';
import { Container, Button, Text, Header, Left, Body, Title, Right, Icon, Content} from "native-base";



export default class PascalHeader extends React.Component {
	render() {
		return (
			<Header style={styles.headerBg}>
			  <Left 
			  style={styles.headerLogoPascal}
			  >
			    <Image 
			    style={styles.logoHeader} 
			    source={require('../assets/icons/logoHeader.png')}/>
			  </Left>
			  <Body>
			    <Title>
			    {this.props.title}
			    </Title>
			  </Body>
			  <Right>
			      <Icon 
			      //style={styles.searchHeader}
			      name="ios-search" />
			  </Right>
			</Header>
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


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
import {data} from '../../data';
import { Constants, LinearGradient } from 'expo';
import { FirebaseApp } from '../../utils/firebase-app';
import { Container, Button, Text, Header, Left, Body, Title, Right, Icon, Content} from "native-base";
import PascalHeader from '../../utils/pascalHeader';


export class Home extends React.Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    this.db = FirebaseApp.database();
    this.data = data.getArticles('fact');
    this.promocoes = '';
    this.renderItem = this._renderItem.bind(this);
    this.state =  {
      speed: 10
    };
  }

  componentDidMount(){
   let promo = this.db.ref('categorias-promocoes/');
   console.log(promo.nome);
  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('PromoPage')}
        >
        <RkCard rkType='horizontal' style={[styles.card, {borderRadius: 10}]}>
          <Image rkCardImg source={info.item.photo} style={{borderRadius: 10}}/>

          <View rkCardContent>
            {/*<RkText numberOfLines={1} rkType='header6'>{this.state.speed}</RkText>*/}
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'>Pet Shop</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{info.item.text}</RkText>
          </View>
            <View rkCardFooter />
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (

      <Container style={styles.containerFull}>

      <View style={styles.container}>
        <FlatList
          data={this.data.artigos}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.containerCard}/>
      </View>
      </Container>

    )
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

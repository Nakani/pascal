import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,

} from 'react-native';
import {InteractionManager} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import _ from 'lodash';
import {FontAwesome} from '../../assets/icons';
import {Avatar} from '../../components/avatar';
import {scale} from '../../utils/scale';
import {data} from '../../data';
import HttpService from "../../utils/http";
import { Constants, LinearGradient } from 'expo';
import PascalHeader from '../../utils/pascalHeader';

let moment = require('moment');

let getUserId = (navigation) => {
    return navigation.state.params ? navigation.state.params.userId : undefined;
};

export class Chat extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#63C731'
        },
        headerLeft: (
            <RkButton
                style={{backgroundColor: 'transparent'}}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', flex: 1}}>
                    <RkText rkType='awesome hero' style={{color: 'white', fontSize: 30}}>{FontAwesome.chevronLeft}</RkText>
                </View>
            </RkButton>
        )
    });



  constructor(props) {
    super(props);
 

 
    let conversation = data.getConversation();
    this.state = {
      data: conversation,
      digitando: ''

    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refs.list.scrollToEnd();
    });
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {

    let inMessage = info.item.type === 'in';
    let styleBaloon = inMessage
      ? styles.balloonIn
      : styles.balloonOut;

    let styleBalloonText = inMessage
      ? styles.balloonTextIn
      : styles.balloonTextOut;

    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

    let renderDate = (date) => (
      <RkText style={styles.time} rkType='secondary7 hintColor'>
        {moment().add(date, 'seconds').format('LT')}
      </RkText>);

    return (
      <View style={[styles.item, itemStyle]}>
        {!inMessage && renderDate(info.item.date)}
        <View style={[styleBaloon]}>
          <RkText style={[styleBalloonText]} rkType='primary2 mediumLine chat'>{info.item.text}</RkText>
        </View>
        {inMessage && renderDate(info.item.date)}
      </View>
    )
  }

  _scroll() {
    if (Platform.OS === 'ios') {
      this.refs.list.scrollToEnd();
    } else {
      _.delay(() => this.refs.list.scrollToEnd(), 100);
    }
  }

  async chatbot(question){
    this.setState({digitando: 'Pascal'});
    let chat = await new Promise((resolve) => {
      HttpService.chatbot({lang:"pt-br",query:question,sessionId:"12345"}, function (result) {
        if (result) {
          resolve(result);
        } else {
          resolve(false);
        }
        }, function (error) {
          resolve(false);
        });
    });
    if(chat){
      // console.log(chat);
      var speech = chat.result.fulfillment.messages[0].speech
      var filter = chat.result.metadata.intentName;
      console.log(chat.result.metadata);
      var filterClean = filter.split("-");
      switch(filterClean[1]){
        case "banho":
          console.log('legal banho');
          break;
        default:
        console.log('padrao');
      }

    let msgOut = {
      id: chat.id,
      time: 0,
      type: 'in',
      text: speech
    };
    let data = this.state.data;
      data.messages.push(msgOut);
    this.setState({digitando: ''});

    this.setState({
      data,
      message: ''
    });
    this._scroll(false);
    }
  }

  renderDigitando(){
      let digitando =(<View>
           <Text>{this.state.digitando} está digitando...</Text>
      </View>);

      return digitando;
  }

  _pushMessage() {
    if (!this.state.message)
      return;
    let msg = {
      id: this.state.data.messages.length,
      time: 0,
      type: 'out',
      text: this.state.message
    };

    let data = this.state.data;
      data.messages.push(msg);

    this.setState({
      data,
      message: ''
    });
    this._scroll(false);
    this.chatbot(this.state.message);

  }

  render() {
    return (
      <RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>      

        <FlatList ref='list'
                  extraData={this.state}
                  style={styles.list}
                  data={this.state.data.messages}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}/>
                  {this.state.digitando!=='' && this.renderDigitando()}
        <View style={styles.footer}>
          <RkTextInput
            onFocus={() => this._scroll(true)}
            onBlur={() => this._scroll(true)}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            rkType='row sticker'
            style = {styles.textInput}
            placeholder="O que você Precisa?"/>

          <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle highlight'>
            <Image source={require('../../assets/icons/balao.png')}/>
          </RkButton>
        </View>
      </RkAvoidKeyboard>


    )
  }
}

let styles = RkStyleSheet.create(theme => ({

  container: {
    flex: 1,
    backgroundColor: '#FE7002',
  },

  avatar: {
    marginRight: 16,
  },
  list: {
    paddingHorizontal: 17
  },

  textInput: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },

  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: 'transparent'
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row'
  },
  itemIn: {},

  itemOut: {
    alignSelf: 'flex-end'
  },
  imageButton:{
    width: 70,
    height: 90,
  },
  balloonIn: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#331807',
  },
  balloonOut: {
    maxWidth: scale(250),
    padding: 15,
    backgroundColor: '#FFAB40',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFAB40',
    borderRadius: 20,  
  },
  balloonTextIn: {
    color: '#fff',
  },
  balloonTextOut: {
    color: '#fff',
  },

  time: {
    alignSelf: 'flex-end',
    margin: 15,
    color:'#000'
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
    backgroundColor: '#FB911E',
  }
}));
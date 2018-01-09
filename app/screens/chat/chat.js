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
    let backgroundColor = inMessage
      ? RkTheme.current.colors.chat.messageInBackground
      : RkTheme.current.colors.chat.messageOutBackground;
    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

    let renderDate = (date) => (
      <RkText style={styles.time} rkType='secondary7 hintColor'>
        {moment().add(date, 'seconds').format('LT')}
      </RkText>);

    return (
      <View style={[styles.item, itemStyle]}>
        {!inMessage && renderDate(info.item.date)}
        <View style={[styles.balloon, {backgroundColor}]}>
          <RkText rkType='primary2 mediumLine chat'>{info.item.text}</RkText>
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
      console.log(chat);
      var filter = chat.result.metadata.intentName;
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
      text: chat.result.fulfillment.messages[0].speech
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
        <View style={styles.header}>
          <TouchableOpacity >

          </TouchableOpacity>
          </View>
        <FlatList ref='list'
                  extraData={this.state}
                  style={styles.list}
                  data={this.state.data.messages}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}/>
                  {this.state.digitando!=='' && this.renderDigitando()}
        <View style={styles.footer}>
          <RkButton style={styles.plus} rkType='clear'>
            <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
          </RkButton>

          <RkTextInput
            onFocus={() => this._scroll(true)}
            onBlur={() => this._scroll(true)}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            rkType='row sticker'
            placeholder=" "/>

          <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle highlight'>
            <Image source={require('../../assets/icons/sendIcon.png')}/>
          </RkButton>
        </View>
      </RkAvoidKeyboard>


    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center',
    height:(Platform.OS === 'ios') ? 20 : 50,
    paddingTop:(Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 20,
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 17
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter
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
  balloon: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15
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
  }
}));
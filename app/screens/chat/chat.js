import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
  StyleSheet, Text,
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
let moment = require('moment');


export class Chat extends React.Component {

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
    realm.write(() => {
      data.messages.push(msg);
    });

    this.setState({
      data,
      message: ''
    });
    this._scroll(true);
  }


  render() {
    return (
      <RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
        <FlatList ref='list'/>
        <View style={styles.footer}>
          <RkButton style={styles.plus} rkType='clear'>
            <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
          </RkButton>

          <RkTextInput
            onFocus={() => this._scroll(true)}
            onBlur={() => this._scroll(true)}

            rkType='row sticker'
            placeholder="O que posso ajudar..."/>

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
    alignItems: 'center'
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
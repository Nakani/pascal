import React from 'react';
import {
  View,
  Image,
  Button,
  Keyboard,
  Platform
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard, RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {RkTheme} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { NavigationActions } from 'react-navigation';

export class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

    async login(){
        this.setState({visible: true});
        this.props.navigation.dispatch(
          NavigationActions.reset(
            {
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: 'Home' }),
              ],
            }
          )
        );
    }




  render() {


    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={styles.header}>
          <Image style={styles.image} source={require('../../assets/images/logoPascal.png')}/>
          <RkText rkType='logo h0'>Pascal</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Nome'/>
            <RkTextInput rkType='rounded' placeholder='Senha' secureTextEntry={true}/>
            <Button style={styles.buttonSimples}
              onPress={() => this.login()}
              title="Entrar"
              rkType='large'
              
              
              />       
          </View>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>


        </View>
      </RkAvoidKeyboard>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20,
  },

  buttonSimples: {
    color: '#FFC11A',
    borderRadius: 5,
    borderColor: '#000000',
  },

  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}));
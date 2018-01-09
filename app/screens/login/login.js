import React from 'react';
import {
  View,
  Image,
  Button,
  Keyboard,
  Platform,
  AsyncStorage,
  Text,
  Alert
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
import { Constants, Facebook, LinearGradient} from 'expo';

export class Login extends React.Component {

  state = {
    dados: [],
  };


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

 _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '346050695870285', 
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
              `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
          const profile = await response.json();
          try {
          await AsyncStorage.setItem('@user:dados', JSON.stringify(profile));
          this.login();
          } catch (error) {
          console.log('erro ao salvar');
          }



          Alert.alert(
            'Logado com sucesso!',
            `Olá ${profile.name}!`,
          );
          // this.login();
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelado!',
            'Seu login foi Cancelado!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Falha ao logar!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'falha ao logar!',
      );
    }
  };

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logado com successo!',
            `Olá ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelado!',
            'Seu login foi cancelado!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Erro ao logar!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Erro ao logar!',
      );
    }
  };


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
          <View style={styles.buttons}>
{/*            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
            </RkButton>*/}
            <RkButton style={styles.button} rkType='social' onPress={this._handleGoogleLogin}>
              <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social' onPress={this._handleFacebookLogin}>
              <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>
          <View>
{/*            <LinearGradient
              colors={['#FFC313', '#FFC313']}
              style={styles.buttonSimples}
              onPress={() => this.login()} >
              <Text style={{ color: '#fff', backgroundColor: 'transparent' }}>
                Entrar!
              </Text>
            </LinearGradient>*/}


            <Button style={styles.buttonSimples}
              onPress={() => this.login()}
              title="Entrar"
              rkType='large'            
              />       
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
    backgroundColor: '#fff',
    height: 48, 
    width: 200, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 5,
    marginBottom: 19,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 19,
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
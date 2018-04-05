import React from 'react';
import {
    TabNavigator,
    TabBarBottom,
    StackNavigator
} from 'react-navigation';
import {bootstrap} from './config/bootstrap';
import {AppRoutes} from './config/navigation/routesBuilder';
import * as Screens from './screens';
import { Font } from 'expo';
import {StatusBar,   TouchableOpacity,} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {data} from './data';

import { Platform } from 'react-native';
import PascalHeader from './utils/pascalHeader';
import { Container, Button, Text, Header, Left, Body, Title, Right, Icon, Content} from "native-base";
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';

bootstrap();
//data.createSQLite();

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

const PascalApp = StackNavigator({
  
  First: {
    screen: Screens.Login
  },

  Perfil: {
      screen: Screens.Perfil
  },

  PromoPage: {
    screen: Screens.PromoPage,
    navigationOptions: ({ navigation }) => ({
      header: ({focused}) => {
        return (
        <Header style={styles.headerBg}>
          <Left 
            style={styles.headerLogoPascal}
          >
          <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.goBack()}>
            <Icon 
              name="ios-arrow-back"/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color: 'black', fontWeight: 'bold'}}>PETSHOT BANZÉ</Title>
          </Body>
        </Header>
        );
      }
    }),
  },

  Home: {
    screen: TabNavigator({
        ...AppRoutes,
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName) {
              case 'Promo':
                iconName =
                  Platform.OS === 'ios'
                ? `ios-cart${focused ? '' : '-outline'}`
                : 'md-cart';
                break;
              case 'Voucher':
                iconName =
                  Platform.OS === 'ios'
                    ? `ios-cash${focused ? '' : '-outline'}`
                    : 'md-cash';
                break;
              case 'Chat':
                iconName = Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles';
                break;
              case 'Perfil':
                iconName =
                  Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings';
            }
            return (
              <Ionicons
                name={iconName}
                size={28}
                style={{ marginBottom: -3, color: '#ffff' }}
               
              />
            );
          },
          header: ({focused}) => <PascalHeader title={navigation.state.routeName} />,
        }

        ),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
          labelStyle: {
            color: 'brown'
          },
          style: {
            backgroundColor: '#FE7002',
            borderColor: '#FE7002',
          }
        }


      })
  }
}, {
  headerMode: 'float',
  headerStyle: {
  shadowOpacity: 0,
  elevation: 0,
  },
});
const defaultGetStateForAction = PascalApp.router.getStateForAction;
PascalApp.router.getStateForAction = (action, state) => {
        if(state && action.type === 'ReplaceCurrentScreen'){
            let routes = state.routes.slice(0, state.routes.length - 1);
            routes.push(action);
            return {
                ...state,
                routes,
                index: state.routes.length - 1,
            };

        }
        return defaultGetStateForAction(action, state);
    };

export default class App extends React.Component{


    state = {
        fontLoaded: false,
        realm: null
    };
    async componentDidMount() {
      StatusBar.setHidden(true);
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        await Font.loadAsync({
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
            'fontawesome': require('./assets/fonts/fontawesome.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    componentWillMount() {
    }

    render(){
        return(
            this.state.fontLoaded ?
            <PascalApp
            /> : null
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






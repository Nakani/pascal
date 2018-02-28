import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Modal
} from 'react-native';
import {
  RkText,
  RkCard,
  RkButton,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {data} from '../../data';

import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { Constants, LinearGradient } from 'expo';


export class Voucher extends React.Component {


  constructor(props) {
    super(props);
    this.data = data.getCards();
    this.state = {modalVisible: false}
  }

  _getCardStyle() {
    return {
      gradient: RkTheme.current.colors.gradients.mastercard,
      icon: require('../../assets/icons/masterCardIcon.png')
    };
  }

  _formatCurrency(amount, currency) {
    let symbol;
    switch (currency) {
      case 'usd':
        symbol = '$';
        break;
      case 'eur':
        symbol = '€';
        break;
      case 'br':
        symbol = 'R$';
        break;
    }
    return `${symbol}${amount}`;
  }



  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderItem(info) {

    let {gradient, icon} = this._getCardStyle();
    let firstPart = info.item.cardNo;

    return (
      <RkCard rkType='credit' style={styles.card}>
          <LinearGradient colors={gradient}
                          start={{x: 0.0, y: 0.5}}
                          end={{x: 1, y: 0.5}}
                          style={styles.background}>
            <View rkCardHeader>
              <RkText rkType='header4 inverseColor'>{info.item.nomeEmpresa}</RkText>
              <Image source={icon}/>
            </View>
            <View rkCardContent>
              <View style={styles.cardNoContainer}>
                <RkText style={styles.cardNo} rkType='header2 inverseColor'>{firstPart}</RkText>
              </View>
              <RkText style={styles.date} rkType='header6 inverseColor'>Validade: {info.item.date}</RkText>
            </View>
            <View rkCardFooter>
              <View>
                <RkText rkType='header6 inverseColor'>Serviço: {info.item.servico.toUpperCase()}</RkText>
              </View>
              <RkText
                rkType='header2 inverseColor'>{this._formatCurrency(info.item.valor, info.item.currency)}</RkText>
            </View>
          </LinearGradient>
      </RkCard>
    )
  }


render() {
    return (
      <View style={styles.container}>
          <LinearGradient colors={['#FBB843','#FE7709']}
                    start={{x: 0.0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    >
            <View style={styles.header}>
              <Image style={styles.logoHeader} source={require('../../assets/icons/logoHeader.png')}/>
              <Image style={styles.somHeader} source={require('../../assets/icons/somHeader.png')}/>
              <Image style={styles.searchHeader} source={require('../../assets/icons/lupaHeader.png')}/>
            </View>
          </LinearGradient>

        <FlatList style={styles.list}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  data={this.data.vouchers}
                  renderItem={(info) => this._renderItem(info)}/>

      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({

  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  header:{
    height:(Platform.OS === 'ios') ? 70 : 50,
    paddingTop:(Platform.OS === 'ios') ? 50 : 0,
    justifyContent:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 20,
  },

  logoHeader: {
    width: 20,
    height: 10,

  },
  somHeader: {
    width: 120,
    height: 10,
  },
  searchHeader: {
    width: 20,
    height: 15,
  },

  list: {
    marginHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
  background: {
    borderRadius: 7,
  },
  cardNoContainer: {
    flexDirection: 'row'
  },
  cardNo: {
    marginHorizontal: 8,
  },
  cardPlaceholder: {
    paddingTop: 4,
  },
  date: {
    marginTop: scaleVertical(20)
  },
  footer: {
    marginTop: 8,
    marginBottom: scaleVertical(16),
    alignItems: 'center'
  },
  button: {
    height: 56,
    width: 56
  },
  popup: {
    backgroundColor: theme.colors.screen.base,
    marginTop: scaleVertical(70),
    marginHorizontal: 37,
    borderRadius: 7
  },
  popupOverlay: {
    backgroundColor: theme.colors.screen.overlay,
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 44 : 0,
  },
  popupContent: {
    alignItems: 'center',
    margin: 16
  },
  popupHeader: {
    marginBottom: scaleVertical(45)
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: theme.colors.border.base
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    width: 1
  }
}));

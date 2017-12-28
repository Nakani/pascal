import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
let moment = require('moment');

export class Home extends React.Component {
  state={
    cards:[
      {
        id:1,

        title: 'Exemplo de informações',
        descricao: 'Aqui vera informações uteis do dia a dia sobre pets conforme o perfil do usuario',
      },
      {
        id:2,

        title: 'Exemplo de informações',
        descricao: 'Aqui vera informações uteis do dia a dia sobre pets conforme o perfil do usuario',
      },
    ],
  };


  render() {
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.cardList}>


          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  cardList: {
    padding: 20,
  },
  card: {
    padding: 20,
    height: 120,
    backgroundColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  }

});
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

export class Promocoes extends React.Component {

  constructor(props) {
    super(props);
    this.data = data.getArticles('fact');
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={info.item.photo}/>

          <View rkCardContent>
            {/*<RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>*/}
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'>Pet Shop</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{info.item.text}</RkText>
          </View>
          <View rkCardFooter>
          </View >
        </RkCard>
      </TouchableOpacity>
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
        <FlatList
          data={this.data.artigos}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.containerCard}/>
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



  containerCard: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13
  }
}));

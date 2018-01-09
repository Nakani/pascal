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
import {data} from '../../data';
let moment = require('moment');

export class Home extends React.Component {


  constructor(props) {
    super(props);

    this.renderItem = this._renderItem.bind(this);
    this.state = {
      data: data.getArticles()

    }
  }
  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {
    console.log(info.item.photo);
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
        <RkCard>
          <View rkCardHeader style={styles.content}>
            <RkText style={styles.section} rkType='header4'>{info.item.title}</RkText>
          </View>
          <Image rkCardImg source={{uri: 'https://firebasestorage.googleapis.com/v0/b/pascal-37098.appspot.com/o/images-app%2Fstranger-images%2Fphoto17.png?alt=media&token=6e905d24-b38f-4dfd-b555-e0c7b81dadd4'}}/>
          <View rkCardContent>
            <RkText rkType='primary3 mediumLine' numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</RkText>
          </View>
          <View rkCardFooter>
           <RkText rkType='secondary2 hintColor'>{moment().add(info.item.time, 'seconds').fromNow()}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.data.artigos}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    )
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
  },
  image: {
    width:100,
    height: 20
  }
});
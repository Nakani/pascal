import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import MessageDataNormalText from '../text/normal';
import BtnFollow from "../../../btn/follow";

const { width } = Dimensions.get('window');
const contentWidth = width - 90;

class MessageDataUser extends React.Component {
  render() {
    const { wrapper, header, avatarStyle, userNameStyle, btnAddWrapper, content} = styles;
    const { avatar, userName } = this.props.data;

    return (
      <View style={wrapper}>
        <View style={header}>
          <View style={avatarStyle}>
            <Image style={avatarStyle} source={{ uri: avatar}}/>
          </View>
          <View style={userNameStyle}>
            <MessageDataNormalText numberOfLines={2}>{userName}</MessageDataNormalText>
          </View>
          <View style={btnAddWrapper}>
            <BtnFollow/>
          </View>
        </View>
        <View style={content}>
          {this.renderPosts()}
        </View>
      </View>
    );
  }

  renderPosts() {
    const { posts } = this.props.data;

    return posts.map((url, i) => {
      return <Image key={i} style={styles.postStyle} source={{ uri: url}}/>;
    });
  }
}

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: -10,
  },
  avatarStyle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
  },
  userNameStyle: {
    justifyContent: 'center',
    width: contentWidth - (28 + 20 + 80),
    height: 40,
    marginTop: 5,
    marginHorizontal: 10,
  },
  btnAddWrapper: {
    width: 80,
    height: 24,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: contentWidth,
    height: 50,
  },
  postStyle: {
    width: contentWidth / 6,
    height: 50,
  },
};

export default MessageDataUser;
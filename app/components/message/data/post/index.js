import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import MessageDataNormalText from '../text/normal';

const { width } = Dimensions.get('window');
const contentSize = width - 90;

const MessageStructurePost = ({ data }) => {
  const { wrapper, header, avatarStyle, userNameStyle, content, postImage} = styles;
  const { avatar, url, userName } = data;
  return (
    <View style={wrapper}>
      <View style={header}>
        <View style={avatarStyle}>
          <Image style={avatarStyle} source={{ uri: avatar}}/>
        </View>
        <View style={userNameStyle}>
          <MessageDataNormalText numberOfLines={2}>{userName}</MessageDataNormalText>
        </View>
      </View>
      <View style={content}>
        <Image style={postImage} source={{ uri: url}}/>
      </View>
    </View>
  );
};

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
    width: contentSize - (28 + 10),
    height: 40,
    marginTop: 5,
    marginHorizontal: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: contentSize,
    height: contentSize,
  },
  postImage: {
    width: contentSize,
    height: contentSize,
  },
};

export default MessageStructurePost;
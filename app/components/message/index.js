import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { PICTURE_URL } from 'react-native-dotenv';
import { RkText } from 'react-native-ui-kitten';

import MessageStructureText from './structure/text';
import MessageStructureCard from './structure/card';
import MessageStructureCarousel from './structure/carousel';
import CachedImage from '../CachedImage';
import Chronos from '../../class/Chronos';

const { width } = Dimensions.get('window');

class Message extends Component {
  messageType({data}) {
    let message;

    if (data.type === 'text') {
      message = <MessageStructureText agent={data.agent}>{data.content}</MessageStructureText>;
    } else {
      message = <MessageStructureCarousel data={data}/>;
    }

    return message;
  }

  render() {
    const { agent, timestamp, user, isGroup } = this.props.data;
    const {
      messageWrap,
      message,
      triangleCorner,
      triangleUser,
      triangleOther,
      messageUser,
      messageOther,
      messageHeader,
      justifyContentOther,
      justifyContentUser,
      userName,
      avatarStyle,
      messageArea,
      verticalWrap,
      content,
      timeAgo,
    } = styles;

    let messageStructure;

    if (agent === 'user') {
      messageStructure = (
        <View style={[messageWrap, justifyContentUser]}>
          <View style={[triangleCorner, triangleUser]} />
          <View style={[message, messageUser]}>
            <View style={[messageHeader, justifyContentUser]}>
              <View style={avatarStyle}>
                {this.loadAvatar(user.avatar, user.id)}
              </View>
            </View>
            <View style={justifyContentUser}>
              <View style={[messageArea, justifyContentUser]}>
                <View style={verticalWrap}>
                  <View style={content}>
                    {this.messageType(this.props)}
                  </View>
                  <View style={justifyContentUser}>
                    <Text style={timeAgo}>
                      {Chronos.timeAgo(timestamp)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      messageStructure = (
        <View style={[messageWrap, justifyContentOther]}>
          <View style={[triangleCorner, triangleOther]} />
          <View style={[message, messageOther]}>
            <View style={[messageHeader, justifyContentOther]}>
              <View style={avatarStyle}>
                {this.loadAvatar(user.avatar, user.id)}
              </View>
              { isGroup && user.userName &&
              <RkText style={userName}>{user.userName}</RkText>
              }
            </View>
            <View style={justifyContentOther}>
              <View style={[messageArea, justifyContentOther]}>
                <View style={verticalWrap}>
                  <View style={content}>
                    {this.messageType(this.props)}
                  </View>
                  <View style={justifyContentOther}>
                    <Text style={timeAgo}>
                      {Chronos.timeAgo(timestamp)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }

    return messageStructure;
  }

  loadAvatar(avatar, user) {
    const { avatarStyle } = styles;

    if (avatar) {
      const id = user || `${avatar.slice(8, 32).toLowerCase()}`;
      const url = `${PICTURE_URL}${encodeURIComponent(avatar)}?alt=media`;

      return <CachedImage style={avatarStyle} url={url} id={id}/>;
    } else {
      return <Image style={avatarStyle} source={require('../../assets/images/avatar.png')}/>;
    }
  }
}

const styles = {
  messageWrap: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  message: {
    justifyContent: 'flex-start',
    width: 'auto',
    maxWidth: width - 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#222',
    marginTop: 10,
  },
  messageUser: {
    alignItems: 'flex-end',
    borderTopRightRadius: 0,
  },
  messageOther: {
    alignItems: 'flex-start',
    borderTopLeftRadius: 0,
  },
  triangleCorner: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#222',
  },
  triangleUser: {
    right: 0,
    transform: [
      {rotate: '180deg'},
    ],
  },
  triangleOther: {
    left: 0,
    transform: [
      {rotate: '270deg'},
    ],
  },
  messageHeader: {
    marginBottom: 10,
  },
  justifyContentUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  justifyContentOther: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userName: {
    marginTop: 8,
    marginHorizontal: 10,
    fontFamily: 'radikalBold',
    fontSize: 16,
    color: '#00efb0',
  },
  avatarStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#222',
  },
  messageArea: {
    width: 'auto',
  },
  verticalWrap: {
    justifyContent: 'flex-start',
  },
  content: {
    flexDirection: 'row',
  },
  timeAgoPositionUser: {
    marginRight: 10,
  },
  timeAgoPositionOther: {
    marginLeft: 10,
  },
  timeAgo: {
    marginTop: 10,
    fontFamily: 'radikalRegular',
    fontSize: 10,
    color: '#5d5d5d',
  },
};

export default Message;

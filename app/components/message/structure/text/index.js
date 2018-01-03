import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import MessageDataNormalText from '../../data/text/normal';
import MessageDataHighlightText from '../../data/text/highlight';

const { width } = Dimensions.get('window');

class MessageStructureText extends React.Component {
  render() {
    const { wrapper, messageUser, messageOther } = styles;

    return (
      <View style={[wrapper, this.props.agent === 'user' ? messageUser : messageOther]}>
        {this.renderText()}
      </View>
    );
  }

  renderText() {
    const { children, style } = this.props;
    const regex = /([\w\.]+@\w+(\.\w+)+)|((https?:\/\/)?(www\.)?[a-zA-Z]+(\.\w+)+(\/(\w+\.\w+)?)?(\?.+)?)/g;
    const match = children.match(regex);
    let message;

    if (match) {
      let style = Object.assign({}, style);

      if (style && Object.keys(style).length > 0) {
        style.textDecorationLine = 'underline';
      } else {
        style = {
          textDecorationLine: 'underline',
        };
      }

      if (children === match[0]) {
        message = <MessageDataHighlightText style={style}>{children}</MessageDataHighlightText>;
      } else {
        let normalText = children;
        let keyIterator = 0;
        message = [];

        for (const index in match) {
          const link = match[index];
          const splitText = normalText.split(link);

          if (splitText[0]) {
            message.push(<MessageDataNormalText key={keyIterator++} style={style}>{splitText[0]}</MessageDataNormalText>);
          }

          message.push(<MessageDataHighlightText key={keyIterator++} style={style}>{link}</MessageDataHighlightText>);

          normalText = splitText[1];

          if (index === match.length - 1) {
            message.push(<MessageDataNormalText key={keyIterator++} style={style}>{normalText}</MessageDataNormalText>);
          }
        }
      }
    } else {
      message = <MessageDataNormalText style={style}>{children}</MessageDataNormalText>;
    }

    if (message && message.constructor === Array) {
      return (
        <Text>
          {message.map(item => {
            return item;
          })}
        </Text>
      );
    }

    return message;
  }
}

const styles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    width: 'auto',
    maxWidth: width - 70,
  },
  messageUser: {
    paddingRight: 20,
  },
  messageOther: {
    paddingLeft: 20,
  },
};

export default MessageStructureText;
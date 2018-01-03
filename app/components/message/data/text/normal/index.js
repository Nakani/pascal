import React from 'react';
import { Text } from 'react-native';

class MessageDataNormalText extends React.Component {
  render() {
    const { text, emoji } = styles;
    const { children, numberOfLines, style } = this.props;

    return (
      <Text numberOfLines={numberOfLines} style={this.isEmoji() ? emoji : [text, style ? style : {}]}>{children}</Text>
    );
  }

  isEmoji() {
    const { children } = this.props;
    const ranges = [
      '\ud83d[\ude00-\udeff]', // U+1F600 to U+1F6FF
      '\ud83e[\udd00-\uddff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
    ];

    return children.match(ranges.join('|')) && children.length < 5;
  }
}

const styles = {
  text: {
    fontFamily: 'radikalRegular',
    fontSize: 16,
    color: '#FFF',
  },
  emoji: {
    marginTop: -4,
    fontSize: 34,
  },
};

export default MessageDataNormalText;
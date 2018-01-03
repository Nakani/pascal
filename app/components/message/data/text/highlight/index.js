import React from 'react';

import MessageDataNormalText from '../normal';

const MessageDataHighlightText = ({ children, numberOfLines, style }) => {
  return (
    <MessageDataNormalText numberOfLines={numberOfLines} style={[styles.text, style ? style : {}]}>{children}</MessageDataNormalText>
  );
};

const styles = {
  text: {
    fontSize: 18,
    color: '#36d6af',
  },
};

export default MessageDataHighlightText;
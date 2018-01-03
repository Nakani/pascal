import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import MessageDataNormalText from '../text/normal';
import MessageDataHighlightText from '../text/highlight';

const { width } = Dimensions.get('window');

const MessageDataProduct = ({ data }) => {
  const { cardStyle, textWrapper, imageWrapper, imageStyle } = styles;
  const { name, price, brand, image } = data;

  return (
    <View style={cardStyle}>
      <View style={textWrapper}>
        <MessageDataNormalText numberOfLines={2}>{name}</MessageDataNormalText>
        <MessageDataHighlightText>{price}</MessageDataHighlightText>
        <MessageDataNormalText>{brand}</MessageDataNormalText>
      </View>
      <View style={imageWrapper}>
        <Image style={imageStyle} source={{ uri: image}}/>
      </View>
    </View>
  );
};

const styles = {
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: width - (60 + 115), // avatar size + padding * 2 + ONE margin + padding * 2 + image margin + image size
  },
  imageWrapper: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 85,
    height: 95,
  },
};

export default MessageDataProduct;
import React from 'react';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

const MessageStructureCard = ({ children }) => {
  const { wrapper, card} = styles;
  return (
    <View style={wrapper}>
      <View style={card}>
        {children}
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: width - 70,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
};

export default MessageStructureCard;
import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-looped-carousel-improved';
import Icon from 'react-native-vector-icons/FontAwesome';

import MessageStructureCard from '../card';
import MessageDataProduct from '../../data/product';
import MessageDataUser from '../../data/user';
import MessageStructurePost from "../../data/post/";

const { width } = Dimensions.get('window');
const contentSize = width - 80;

class MessageStructureCarousel extends React.Component {
  state = {
    size: {
      width: 'auto',
      height: 'auto',
    },
  };

  render() {
    const { wrapper, arrow } = styles;
    const { content } = this.props.data;

    return (
      <View style={wrapper} onLayout={this.onLayoutDidChange}>
        <Carousel
          delay={2000}
          style={this.state.size}
          autoplay={false}
          arrows={content.length > 1}
          leftArrowText={<Icon style={arrow} name="chevron-left"/>}
          rightArrowText={<Icon style={arrow} name="chevron-right"/>}
          leftArrowStyle={{marginLeft: 0}}
          rightArrowStyle={{marginRight: 0}}
          onAnimateNextPage={page => {
            // console.log(page);
          }}
        >
          {this.renderPage()}
        </Carousel>
      </View>
    );
  }

  onLayoutDidChange = (e) => {
    const { data } = this.props;
    const { type } = data;
    const layout = e.nativeEvent.layout;
    let height;

    switch (type) {
      case 'product':
        height = 115;
        break;
      case 'user':
        height = 110;
        break;
      case 'post':
        height = contentSize + 70;
        break;
    }

    this.setState({
      size: {
        width: layout.width,
        height: height,
      },
    });
  };

  renderPage() {
    const { data } = this.props;
    const { content } = data;

    return content.map((item, i) => {
      return (
        <MessageStructureCard key={i}>
          {this.selectRenderElement(data.type, item)}
        </MessageStructureCard>
      );
    });
  }

  selectRenderElement(type, data) {
    let element;

    switch (type) {
      case 'product':
        element = <MessageDataProduct data={data}/>;
        break;
      case 'user':
        element = <MessageDataUser data={data}/>;
        break;
      case 'post':
        element = <MessageStructurePost data={data}/>;
        break;
    }

    return element;
  }
}

const styles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width - 50,
  },
  arrow: {
    fontSize: 14,
    color: '#AAA',
  },
};

export default MessageStructureCarousel;
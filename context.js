import React from 'react';
 window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import restURL from './restURL';

export default class ContextComponent extends React.Component {
  getChildContext() {
    return {
      socket:io(restURL+':3000', {jsonp: false})
    }
  }

  render(){
    return (this.props.children);
  }
}

ContextComponent.childContextTypes = {
  socket: React.PropTypes.object.isRequired
};

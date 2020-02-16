import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NovoComercioContent from './atividadeColaborador/novoComercioContent';

export default class NovoComercio extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='cart-plus' size={20}
      style={{color: tintColor}}></Icon>
    )
  };

  render() {
    return (
      <NovoComercioContent navigation={this.props.navigation} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

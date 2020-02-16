import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NovoColaboradorContent from './atividadeColaborador/novoColaboradorContent';

export default class NovoColaborador extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='user-plus' size={20}
      style={{color: tintColor}}></Icon>
    )
  };

  render() {
    return(
      <NovoColaboradorContent navigation={this.props.navigation} />
    );
    /*return (
      <View style={styles.container}>
        <Text style={styles.welcome}>NovoColaboradorScreen</Text>
      </View>
    );*/
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

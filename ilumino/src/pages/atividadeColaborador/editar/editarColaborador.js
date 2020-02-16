import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Platform,TouchableOpacity, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

class EditarColaborador extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  render() {
    return (

      <Container>
       <ImageBackground style={{width:'100%', height:'100%'}} source={require('../../../assets/bg/BG.png')}>
        <View style={{
          height: 80,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
          }}>
            <TouchableOpacity
              style={{ marginLeft: 20, }}
              onPress={this.Voltar}
              hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
              <Icon name='angle-left' size={30} color='#fff' />
            </TouchableOpacity>
          </View>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            alignItems: 'center',
            paddingTop: 13,
          }}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>iLúmino</Text>
          </View>
          <View style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          </View>

        </View>
        <Content style={{
          backgroundColor:'transparent',
        }}>
            <Text style={{color:'#fff'}}>Editar colaborador</Text>
        </Content>
        </ImageBackground>
      </Container>
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
  androidHeader:{
    ...Platform.select({
      android:{
        backgroundColor:'#15a1f8'
      },
      ios:{
        backgroundColor:'#15a1f8'
      }
    })
  }
});

export default EditarColaborador;
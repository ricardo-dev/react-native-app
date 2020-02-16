import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Platform, TouchableOpacity, View, AsyncStorage, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Left, Body, Right, Content } from 'native-base';

export default class sejaColaborador extends Component {

  static navigationOptions = {
    header: null,
  }

  state = {
    token: '',
  }

  Voltar = () => {
    this.props.navigation.goBack();
  }

  redirecionarColaborador = async () => {
    const token = await AsyncStorage.getItem("@iLuminoApi:token");

    if (token) {
      this.props.navigation.navigate('CadastroUsuarioColaborador');
    } else {
      this.props.navigation.navigate('CadastroColaborador');
    }
  }

  render() {
    return (

      <Container>
        <ImageBackground style={{width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>
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
          backgroundColor: 'transparent',
        }}>
          <View style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>

            <View style={{
              backgroundColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 0.8,
              marginHorizontal: 20,
              marginTop: 40,
            }}>

              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  marginTop: 10,
                  fontSize: 22,
                  color: '#000',
                }}>Seja um colaborador</Text>
              </View>

              <View style={{
                marginTop: 30,
                marginHorizontal: 10,
                marginBottom: 30,
              }}>

                <Text>
                  Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Donec lobortis mollis sapien,
                  a ullamcorper augue varius sit amet. Vestibulum
                  tellus lorem, viverra at lacinia eu, sagittis ac nunc.
                  Sed in urna urna. Proin in nisi lacinia, euismod urna ut,
                  maximus eros. Aliquam nunc nisi, rutrum vel arcu eget,
                  luctus facilisis mi. Praesent sollicitudin non dui id
                  tristique.
              </Text>

              </View>

              <TouchableOpacity style={{
                height: 42,
                backgroundColor: '#15a1f8',
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                marginBottom: 20,
              }} onPress={
                this.redirecionarColaborador
              }>
                <Text style={{
                  color: '#fff',
                  fontSize: 18,
                }}>Quero Cadastrar</Text>
              </TouchableOpacity>

            </View>

          </View>
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
  androidHeader: {
    ...Platform.select({
      android: {
        backgroundColor: '#15a1f8'
      },
      ios: {
        backgroundColor: '#15a1f8'
      }
    })
  }
});
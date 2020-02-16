import React, { Component } from 'react';
import { Alert, StyleSheet, AsyncStorage, Text, ToastAndroid, View, TextInput, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Body, Content, Left, Right } from 'native-base';
import api from '../services/api';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Progress from 'react-native-progress';
import { TextInputMask } from 'react-native-masked-text';
import {connect} from 'react-redux';

class Login extends Component {

  static navigationOptions = {
    header: null,
  }

  Voltar = () => {
    this.props.navigation.goBack();
  }

  state = {
    login: '',
    senha: '',
    errorMensagem: null,
    loading: false
  }

  redirecionarPreCadastro = () => {
    this.props.navigation.navigate('PreCadastro');
  }

  redirecionarColaborador = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabsColaborador' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  redirecionarUsuario = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabsUsuario' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  entradaLogin = (text) => {
    this.setState({ login: text })
  }

  entradaSenha = (text) => {
    this.setState({ senha: text })
  }

  funcaoLogin = async () => {
    this.setState({ loading: true });
    var Login = this.state.login;
    var Senha = this.state.senha;
    Login = Login.replace(' ', '');
    Login = Login.replace('(', '');
    Login = Login.replace(')', '');
    Login = Login.replace('-', '');
    //Alert.alert(Login);
    if (Login.length == 0 || Senha.length == 0) {
      Alert.alert('Error - campo(s) vazio(s)')
      this.setState({ loading: false });
    } else {
      const response = await api.post(
        '/auth/',
        {
          celular: Login,
          senha: Senha
        },
        Headers = {
          "Content-Type": "application/json"
        }
      );

      if (response.ok) {
        if(response.data.data.tipo === 'ROLE_COM'){
          this.setState({ loading: false });
          this.setState({ errorMensagem: " Dados não válido para este App " });
        }
        else{
          this.setState({ errorMensagem: null })
          this.setState({ loading: false });
          const { token, nome, tipo, fotoPath, id } = response.data.data;
          /*await AsyncStorage.multiSet([
            ['@iLuminoApi:token', token],
            ['@iLuminoApi:nomeUsuario', nome],
            ['@iLuminoApi:tipo', tipo],
            ['@iLuminoApi:fotoPath', fotoPath],
            ['@iLuminoApi:id', '' + id]
          ])*/
          this.props.login(obj={token, nome, tipo, fotoPath, id});
          if (tipo === 'ROLE_USER') {
            this.redirecionarUsuario()
          } else if (tipo === 'ROLE_COL') {
            this.redirecionarColaborador()
          }
      }
      } else {
        this.setState({ loading: false });
        this.setState({ errorMensagem: " Dados não encontrados! " });
      }

      // fim else
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
        <Content style={{ backgroundColor: 'transparent', borderTopWidth: 0, borderTopColor: '#fff' }}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 25
          }}>
            <Text style={{
              marginRight: 15,
              marginLeft: 30,
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold'
            }}>
              Informe seus dados de acesso para continuar
            </Text>
          </View>

          <View style={{
            flex: 1, marginTop: 35
          }}>
            <TextInputMask style={{
              marginLeft: 30,
              marginRight: 30,
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              paddingBottom: 0,
              color: '#fff',
            }}

              placeholder={'(xx) xxxxx-xxxx'}
              placeholderTextColor={'#fff'}
              type={'cel-phone'}
              onChangeText={(text) => {
                //text = text.replace(' ', '');
                //text = text.replace('(', '');
                //text = text.replace(')', '');
                //text = text.replace('-', '');
                this.entradaLogin(text);
              }}
              value={this.state.login} />

            <TextInput
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
                paddingBottom: 0,
                color: '#fff'
              }}
              placeholder="Senha"
              placeholderTextColor="#fff"
              value={this.state.senha}
              onChangeText={this.entradaSenha}
              keyboardType="default"
              secureTextEntry={true}
              returnKeyType="send"
              onSubmitEditing={this.funcaoLogin} />
          </View>
          {!!this.state.errorMensagem && <Text style={{ marginLeft: 30, marginTop: 5, color: '#fff' }}>
            {this.state.errorMensagem}
          </Text>}
          {this.state.loading && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Progress.CircleSnail size={20} color={'#fff'}></Progress.CircleSnail>
          </View>}

          <TouchableOpacity
            style={{
              backgroundColor: '#68D468',
              height: 42,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
              borderRadius: 40,
              marginLeft: 30,
              marginRight: 30,
            }}
            onPress={
              this.funcaoLogin
            }>
            <Text style={{
              color: '#fff',
              fontSize: 18,
            }}>LOGIN</Text>
          </TouchableOpacity>

        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
    login : (obj) => dispatch({type:'LOGIN', payload:obj})
  }
}

export default connect(null, mapDispatchToProps) (Login);

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
        //marginTop: StatusBar.currentHeight,
        //StatusBarsetBackgroundColor("#D3D3D3"),
        //StatusBarsetBarStyle("dark-content"),
        backgroundColor: '#15A1F8',
        //StatusBarColor
        //StatusBar
      }
    })
  },
  androidHeaderTitle: {
    ...Platform.select({
      android: {
        alignItems: 'flex-end',
        //textAlign: 'center',
        //flex: 1
      }
    })
  },
});
import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import {Container, Content, Header, Body, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var tipoCadastro = [
  {label: 'Não tenho cadastro!', value: 0},
  {label: 'Já sou cadastrado!', value:1}
];

export default class PreLogin extends Component {

  static navigationOptions = {
    header: null,
  }

  state = {
    valor: 0,
  }

  selecionarCadastro = (value) => {
    this.setState({valor: value})
  }

  Voltar = () => {
    this.props.navigation.goBack();
  }

  redirecionarCadastro = () => {
    //Alert.alert('Selecionar usuario ou colaborador')
    const valor = this.state.valor;
    if(valor === 0){
      this.props.navigation.navigate('PreCadastro');
    }else if(valor === 1){
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <Container>
        <ImageBackground style={{width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>
        {/*<Header style={styles.androidHeader} 
          androidStatusBarColor="#15A1F8" iosBarStyle="light-content">
          <Left style={{flex:1, marginRight:2}}>
            <TouchableOpacity onPress={this.Voltar} hitSlop={{top:20, bottom:20, right:20, left:20}}><Icon name='angle-left' color='white' size={30}
              onPress={
                  this.Voltar
              }></Icon></TouchableOpacity>
          </Left>
          <Body style={{flex:2}}>
            <Text style={{
              fontSize:20,
              fontWeight:'bold',
              color:'white'
            }}>iLúmino</Text>
          </Body>

          </Header>*/}
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
        <Content>
          <View style={{
            backgroundColor: 'transparent',
            height: 200,
            borderTopColor: '#fff',
            borderTopWidth: 0,
            flex:1, alignItems:'center',
            paddingTop: 5
          }}>
            <Text style={{
              marginRight: 15, marginLeft: 30, marginTop: 15, fontSize: 40, fontWeight: 'bold', color:'#fff'
            }}>Você já possui cadastro na iLúmino?</Text>
          </View>

          <RadioForm
            style={{
              marginTop: 20, marginLeft: 30
            }}
            radio_props={tipoCadastro}
            initial={0}
            onPress={this.selecionarCadastro}
            buttonSize={10}
            buttonColor={'#fff'}
            labelColor={'#fff'}
            selectedButtonColor={'#fff'}
            selectedLabelColor={'#fff'}
            labelStyle={{fontSize: 16, marginBottom: 20}}
            buttonOuterSize={20} />

          
          <TouchableOpacity style={{
            marginRight: 15, marginLeft: 200, marginTop:30, borderRadius: 40, alignItems:'center', justifyContent:'center', backgroundColor: '#68D468', height: 42
          }}
          onPress={
            this.redirecionarCadastro
          }>
            <Text style={{color: '#fff', fontSize: 18}}>AVANÇAR</Text>
          </TouchableOpacity>
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
      //marginTop: StatusBar.currentHeight,
      //StatusBarsetBackgroundColor("#D3D3D3"),
      //StatusBarsetBarStyle("dark-content"),
      backgroundColor: '#15A1F8',
      //StatusBarColor
      //StatusBar
     } 
    }) },
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
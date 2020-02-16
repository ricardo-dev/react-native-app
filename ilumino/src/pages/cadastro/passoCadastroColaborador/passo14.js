import React, {Component} from 'react';
import {StyleSheet, Text, TextInput,ScrollView, Platform,TouchableOpacity, View, ImageBackground, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';

export default class Passo14 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  nextPass = ()=> {
      const {nome, sobreNome, cpf, nickname, id_responsavel, celular, whatsapp} = this.props.navigation.state.params.data;
      const {email} = this.state;
      if(email.length === 0)
        Alert.alert('Erro - email não pode ser vazio!');
      else
        this.props.navigation.navigate('Passo15', {data:{
          nome, sobreNome, cpf, nickname, id_responsavel, celular, whatsapp, email
        }});
  }

  state = {
    email:'',
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

        <ScrollView contentContainerStyle={{
          paddingBottom:50,
        }}>

        <View style={{
          height:60,
          marginTop:10,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          marginHorizontal:20,
        }}>

          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>1</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>2</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>3</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>4</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>5</Text>
          </View>

        </View>

                <View style={{
          backgroundColor:'#fff',
          marginHorizontal:20,
          marginTop:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8,
        }} >

        <View style={{
          alignItems:'center',
          justifyContent:'center'
        }} > 
          <Text style={{
            marginTop:10,
            color:'#000',
            fontSize:22,
          }} >Informe-nos seu email</Text>
          <Text style={{
            marginTop:5,
            fontSize:14,
            color:'#d2d2d2'
          }} >Servirá para entrarmos em contato.</Text>
        </View>

        <TextInput style={{
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          paddingBottom:0,
          marginHorizontal:20,
          marginBottom:30,
        }} 
        placeholder="Email"
        onChangeText={(text)=>{
          this.setState({email:text})
        }} 
        value={this.state.email}
        keyboardType='email-address' />

        </View>

        
        <TouchableOpacity onPress={this.nextPass} style={{justifyContent:'center', alignItems:'center', borderRadius:20, marginTop:10, marginRight:20, marginLeft:'50%', height:42, backgroundColor:'#68D468'}}>
            <Text style={{color:'#fff'}}>AVANÇAR</Text>
        </TouchableOpacity>
        
        
        </ScrollView>
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
        backgroundColor:'#15a1f8',
        //elevation:5,
      },
      ios:{
        backgroundColor:'#15a1f8'
      }
    })
  }
});
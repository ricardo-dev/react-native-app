import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, ScrollView, Platform,TouchableOpacity, View, ImageBackground, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content, CheckBox} from 'native-base';
import {TextInputMask} from 'react-native-masked-text';

export default class Passo13 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  nextPass = ()=> {
      const {nome, sobreNome, cpf, nickname, id_responsavel} = this.props.navigation.state.params.data;
      const {celular, whatsapp} = this.state;
      let Celular = celular;
      Celular = Celular.replace('(','');
      Celular = Celular.replace(')','');
      Celular = Celular.replace(' ','');
      Celular = Celular.replace('-','');
      if(celular.length === 0)
        Alert.alert('Erro - celular não pode ser vazio!');
      else  
        this.props.navigation.navigate('Passo14',{data:{nome, sobreNome, cpf, nickname, id_responsavel, celular:Celular, whatsapp}});
  }

  state = {
    celular:'',
    whatsapp:false,
  }

  temWhatsapp = ()=> {
    this.setState({whatsapp: !this.state.whatsapp});
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
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>4</Text>
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
          justifyContent:'center',
        }} >
          <Text style={{
            marginTop:10,
            color:'#000',
            fontSize:22
          }} >Qual é o seu número de</Text>
          <Text style={{
            //marginTop:10,
            color:'#000',
            fontSize:22
          }} >telefone celular?</Text>
        </View>

        {/*<TextInput style={{
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          paddingBottom:0,
          marginBottom:5,
          marginTop:10,
          marginHorizontal:20,
        }} 
        placeholder="Telefone"
        onChangeText = {(text)=>{
            this.setState({celular:text})
        }} 
        value={this.state.celular}
      keyboardType="phone-pad"/>*/}
      <TextInputMask style={{
        borderBottomColor:'#d2d2d2',
        borderBottomWidth: 0.8,
        paddingBottom:0,
        marginBottom:5,
        marginTop:10,
        marginHorizontal:20,
      }}
        placeholder={'(xx) xxxxx-xxxx'}
        type={'cel-phone'}
        onChangeText={(text) => this.setState({celular:text})}
        value={this.state.celular}
        />
        <TouchableOpacity style={{
          marginHorizontal:20,
          marginTop:5,
          marginBottom:30
        }} 
        onPress={
          this.temWhatsapp
        }>

        <View style={{
          flexDirection:'row',
        }} >
          <CheckBox onPress={ this.temWhatsapp } checked={this.state.whatsapp} />
          <Text style={[this.state.whatsapp ? {
            color:'#15a1f8', marginLeft:15
          } : {
            marginLeft:15,
          }]} >Tenho whatsapp neste número</Text>
        </View>

        </TouchableOpacity>

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
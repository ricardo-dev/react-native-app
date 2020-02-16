import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, ScrollView, Platform,TouchableOpacity, View, ImageBackground, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content, CheckBox} from 'native-base';
import api from '../../../services/api';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';

class Passo15 extends Component {

  static navigationOptions = {
    header:null,
  }

  salvaColaborador = async ()=> {
    this.setState({registrando:true});
    const {
      nome, sobreNome, cpf, nickname, id_responsavel, celular, whatsapp, email, senha
    } = this.state;
    const idR = id_responsavel;
    if(idR === 0){
      colaboradorDto = {
          nome:nome,
          sobreNome:sobreNome,
          cpf:cpf,
          nickname:nickname,
          celular:celular,
          whatsapp:whatsapp,
          email:email.toLowerCase(),
          senha:senha,
      }
    }else{
      colaboradorDto = {
          nome:nome,
          sobreNome:sobreNome,
          cpf:cpf,
          nickname:nickname,
          celular:celular,
          whatsapp:whatsapp,
          email:email,
          senha:senha,
          id_responsavel:id_responsavel,
      }
    }

    const response = await api.post(
        '/api/colaborador/cadastrar-colaborador-primeira-etapa/',
        colaboradorDto,
        Headers={
          "Content-Type":"application/json"
        }
    );
    if(response.ok){
        this.props.saveCol(obj={idColaborador:response.data.data.id});
        Alert.alert('Primeira etapa com sucesso!');
        this.setState({registrando:false});
        this.props.navigation.navigate('InicioCadastroColaborador');
    }else{
        Alert.alert(response.data.errors);
        this.setState({registrando:false});
    }
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  finishPass = ()=> {
      const {senha, repeteSenha} = this.state;
      if(senha.length === 0)
        Alert.alert('Erro - senha não pode ser vazio!')
      else{
        if(senha !== repeteSenha)
          Alert.alert('Erro - Campos diferentes!')
        else
          this.salvaColaborador()
      }
  }

  state = {
    registrando:false,
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
    id_responsavel:0,
    celular:'',
    whatsapp:false,
    email:'',
    senha:'',
    repeteSenha:'',
    showSenha:false,
  }

  componentDidMount(){
    const {
      nome, sobreNome, cpf, nickname, id_responsavel, celular, whatsapp, email
    } = this.props.navigation.state.params.data;

    this.setState({
      nome, sobreNome, cpf, nickname, id_responsavel, celular, whatsapp, email
    })

    //Alert.alert(nome);
  }

  exibirSenha = () => {
    this.setState({showSenha: !this.state.showSenha})
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
            height:30, width:30, borderRadius:100, backgroundColor:'#15a1f8'
          }}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>5</Text>
          </View>

        </View>


                <View style={{
          backgroundColor:'#fff',
          marginTop:20,
          marginHorizontal:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8
        }} >

        <View style={{
          alignItems:'center',
          justifyContent:'center',
        }}>
          <Text style={{
            marginTop:10,
            color:'#000',
            fontSize:22
          }}>Crie uma senha</Text>
          <Text style={{
            marginTop:5,
            color:'#d2d2d2',
            fontSize:14
          }}>Crie uma senha que você possa</Text>
          <Text style={{
            marginTop:5,
            color:'#d2d2d2',
            fontSize:14
          }}>memorizar, mas que também seja forte,</Text>
          <Text style={{
            marginTop:5,
            color:'#d2d2d2',
            fontSize:14
          }}>ou seja, de difícil advinhação por</Text>
          <Text style={{
            marginTop:5,
            color:'#d2d2d2',
            fontSize:14
          }}>terceiros</Text>

        </View>

        <TextInput style={{
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          paddingBottom:0,
          marginHorizontal:20,
          marginBottom:5,
          marginTop:10
        }}
        onChangeText={(text)=>{
          this.setState({senha:text})
        }}
        value={this.state.senha}
        secureTextEntry={!this.state.showSenha} />

        <TouchableOpacity style={{
          marginTop:0,
          marginHorizontal:13,
        }}
        onPress={
          this.exibirSenha
        }>
          <View style={{
            flexDirection:'row'
          }}>
            <CheckBox size={20} onPress={this.exibirSenha} checked={this.state.showSenha}/>
            <Text style={
              [this.state.showSenha ? {
                color:'#15a1f8',
                marginLeft:15
              }:{
                marginLeft:15
              }]
            }>Exibir senha</Text>
          </View>

        </TouchableOpacity>

        <TextInput style={{
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          paddingBottom:0,
          marginBottom:30,
          marginHorizontal:20,
        }}
        placeholder="Repetir senha"
        onChangeText={(text)=>{
          this.setState({repeteSenha:text})
        }}
        value={this.state.repeteSenha}
        secureTextEntry={true} />

        </View>

        
        <TouchableOpacity onPress={this.finishPass} style={{justifyContent:'center', alignItems:'center', borderRadius:20, marginTop:10, marginRight:20, marginLeft:20, height:42, backgroundColor:'#68D468'}}>
          { !this.state.registrando && <Text style={{
            color: '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
          }}>Salvar</Text>}
          {this.state.registrando && <View style={{
                  }}>
                    <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
          </View>}
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


function mapDispatchToProps(dispatch){
  return{
    saveCol : (obj)=> dispatch({type:'SAVE_COL', payload:obj}),
  }
}

export default connect(null, mapDispatchToProps)(Passo15);
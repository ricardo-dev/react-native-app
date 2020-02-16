import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Platform,TouchableOpacity, View, ImageBackground, Image, Alert} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Content} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import api from '../../../services/api';
import * as Progress from 'react-native-progress';

export default class Passo5 extends Component {

  static navigationOptions = {
    header:null,
  }

  Voltar = ()=>{
    this.props.navigation.goBack();
  }

  finishPass = ()=> {
    //this.props.navigation.navigate('InicioCadastroUsuario');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tabs'})
      ]
      });
      this.props.navigation.dispatch(resetAction);
  }

  state={
    registrando:false,
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
    celular:'',
    whatsapp:false,
    email:'',
    senha:'',
    fotoPath:"https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
  }

  salvarDados = ()=>{
    this.setState({registrando: true});
    this.salvarUsuario();
  }

  takePicCam(){
    const options = {
      quality:0.5,
      //base64:true,
    }
    ImagePicker.launchCamera(options, (response)=>{
      if(response.didCancel){

      }else if(response.error){

      }else{
        const b64 = `data:image/jpeg;base64,${response.data}`;
        this.setState({fotoPath:b64});
      }
    });

  }

  takePicGallery(){
    const options = {
      quality:0.5,
    }
    ImagePicker.launchImageLibrary(options, (response)=>{
      if(response.didCancel){

      }else if(response.error){

      }else{
        const b64 = `data:image/jpeg;base64,${response.data}`;
        this.setState({fotoPath:b64});
      }
    })
  }

  componentDidMount(){
    const{nome, sobreNome, cpf, nickname, celular, whatsapp, email, senha} = this.props.navigation.state.params.data;
    this.setState({
      nome, sobreNome, cpf, nickname, celular, whatsapp, email, senha
    })
    //Alert.alert('nome: '+nome+' cpf:'+cpf+' email:'+email);
  }

  salvarUsuario = async () => {
    //this.setState({registrando:true});
    const { 
      nome, sobreNome, cpf, nickname,
      celular, whatsapp, email, senha, fotoPath,
    } = this.state;

    const response = await api.post(
      '/api/usuario/cadastrar-usuario/',
      {
        nome:nome,
        sobreNome:sobreNome,
        cpf:cpf,
        nickname:nickname,
        celular:celular,
        whatsapp:whatsapp,
        email:email,
        senha:senha,
        fotoPath:fotoPath
      },
      Headers = {
        "Content-Type":"application/json"
      }
    );

    if(response.ok){
      Alert.alert('Registrado com sucesso!');
      this.setState({registrando:false});
      //this.finalCadastro();
      this.finishPass();
    }else{
      Alert.alert(response.data.errors.toString());
      this.setState({registrando:false});
      //Alert.alert('Error');
    }
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
        marginHorizontal:20,
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingBottom:20,
        paddingTop:10,
      }}>

      <View style={{
        alignItems:'center',
        justifyContent:'center',
      }}>

      <Text style={{
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
        justifyContent:'center'
      }}>Selecione uma foto</Text>
      <Text style={{
        fontSize:20,
        fontWeight:'bold',
        color:'#000'
      }}>Para perfil (Opcional)</Text>
      <Image source={{uri:this.state.fotoPath}} 
          style={{
            width:110, height:110,borderRadius:100,
            paddingLeft:30, paddingRight: 30,
            borderWidth: 2, borderColor:'#d2d2d2',
            marginTop:20,
          }}/>
      {!!this.state.progress && <Progress.Bar style={{
       marginTop:5}} progress={this.state.progressValue} size={50}
        color={'#15a1f8'} />}
      </View>
      <TouchableOpacity 
        onPress={
          this.takePicGallery.bind(this)
        }
      style={{
        marginTop:20,
        height:42,
        borderRadius: 3,
        borderWidth: 2,
        borderColor:'#d2d2d2',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5,
      }}>
        <Text>Abrir Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={
          this.takePicCam.bind(this)
        }
      style={{
        marginTop:5,
        height:42,
        borderRadius: 3,
        borderWidth: 2,
        borderColor:'#d2d2d2',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5,
      }}>
        <Text>Abrir Camera</Text>
      </TouchableOpacity>

      </View>
        
        <TouchableOpacity onPress={this.salvarDados} style={{justifyContent:'center', alignItems:'center', borderRadius:20, marginTop:10, marginRight:20, marginLeft:20, height:42, backgroundColor:'#68D468'}}>
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
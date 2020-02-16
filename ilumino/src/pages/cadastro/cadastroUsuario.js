import React, {Component} from 'react';
import {Image, Alert, ScrollView ,Platform, StyleSheet, TouchableOpacity ,TextInput, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, NavigationActions} from 'react-navigation';
import {Container, Header, Left, Body, Right, Content, CheckBox} from 'native-base';
import api from '../../services/api';
import {TextInputMask} from 'react-native-masked-text';

import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class CadastroUsuario extends Component {

  static navigationOptions = {
    header:null,
  };

  state = {
    showSenha:false,
    registrando:false,
    progress:false,
    progressValue:0,
    activeIndex:0, //
    imageSource: "https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
    uri: '',
    name:'',
    type:'',
    fotoPath:"https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png", //inicio aqui!
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
    celular:'',
    whatsapp:true,
    email:'',
    senha:'',
    senhaVerificador:'',
  }

  Voltar = () => {
    this.props.navigation.goBack();
  }

  segmentCliked = (index) => {
    this.setState({ activeIndex:index });
  }

  renderPass1 = () => {
    return(
      <View>
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
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>2</Text>
          </View>
          <View style={{
            alignItems:'center', justifyContent:'center',
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>3</Text>
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
          marginTop:10,
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Dados para login:</Text>
          </View>
          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginTop:5,
              marginHorizontal:20,
            }}
            placeholder = "Nome" 
            onChangeText={(text)=>{
              this.setState({nome:text})
            }}
            value={this.state.nome} />

          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder = "Sobrenome completo" 
            onChangeText={(text)=>{
              this.setState({sobreNome:text})
            }}
            value={this.state.sobreNome}/>

          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginBottom:20,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder = "CPF"
            onChangeText={(text)=>{
              this.setState({cpf:text})
            }}
            value={this.state.cpf}
            keyboardType="phone-pad"/>
        </View>

        <View style={{
          marginTop:10,
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
          <View style={{
            marginTop:10,
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              color:'#d2d2d2',
              fontSize:18,
            }}>Crie um apelido</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:20,
            }}>(nickname)</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:14,
            }}>O apelido estará visível para todos</Text>
          </View>
          <TextInput 
            style={{
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              paddingBottom:0,
              marginBottom:30,
              marginTop:10,
              marginHorizontal:20,
            }}
            placeholder="Apelido (Opcional)"
            onChangeText={(text)=>{
              this.setState({nickname:text});
            }}
            value={this.state.nickname}/>
        </View>

        <TouchableOpacity onPress={()=>{
            //Alert.alert('Clique!');
            const {nome, sobreNome, cpf} = this.state;
            if(nome.lenght === 0 || sobreNome.length === 0 || cpf.length === 0){
              Alert.alert('Campo(s) Vazio(s)');
            }else {
              this.segmentCliked(1);
            }
          }} 
          style={{
            marginRight: 15, marginLeft: 200, marginTop:30, borderRadius: 40, alignItems:'center', justifyContent:'center', backgroundColor: '#15a1f8', height: 42
          }}>
            <Text style={{color: '#fff', fontSize: 18}}>AVANÇAR</Text>
        </TouchableOpacity>

      </View>
    );
  }

  temWhatsapp = () => {
      this.setState({whatsapp: !this.state.whatsapp});
  }

  renderPass2 = () => {
    return(
      <View>
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
            height:30, width:30, borderRadius:100, backgroundColor:'#d2d2d2'
          }}>
            <Text style={{fontWeight:'bold'}}>3</Text>
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
          marginTop:10,
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
        <View style={{
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Qual é o seu número de </Text>
            <Text style={{
              marginTop:2,
              color:'#000',
              fontSize:22,
            }} >telefone celular?</Text>
        </View>

        {/*<TextInput placeholder="Telefone"
          style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth: 0.8,
            paddingBottom:0,
            marginBottom:5,
            marginTop:10,
            marginHorizontal:20,
          }}
          onChangeText={(text)=>{
            this.setState({celular:text});
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
        placeholder={'(xx) xxxx-xxxx'}
        type={'cel-phone'}
        onChangeText={(text)=>{
          this.setState({celular:text})
        }}
        value={this.state.celular}/>
        <TouchableOpacity style={{
          marginHorizontal:20,
          marginTop:5,
          marginBottom:30
        }}
        onPress={
          this.temWhatsapp
        }>
          <View style={{flexDirection:'row'}}>
            <CheckBox onPress={this.temWhatsapp} checked={this.state.whatsapp}/><Text style={
              [this.state.whatsapp ? {color:'#15a1f8', marginLeft:15}:{marginLeft:15}]}>Tenho whatsapp neste número</Text>
          </View>
        </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={()=>{
            //Alert.alert('Clique!');
            var telefone = this.state.celular;
            telefone = telefone.replace(' ','');
            telefone = telefone.replace('(','');
            telefone = telefone.replace(')','');
            telefone = telefone.replace('-','');
            this.setState({celular:telefone});
            //Alert.alert(telefone);
            if(telefone.length === 0){
              Alert.alert('Este campo não pode ficar vazio!');
            }else{
              this.segmentCliked(2);
            }
          }} 
          style={{
            marginRight: 15, marginLeft: 200, marginTop:30, borderRadius: 40, alignItems:'center', justifyContent:'center', backgroundColor: '#15a1f8', height: 42
          }}>
            <Text style={{color: '#fff', fontSize: 18}}>AVANÇAR</Text>
        </TouchableOpacity>

      </View>
    );
  }

  renderPass3 = () => {
    return(
      <View>
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
          marginTop:10,
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
        <View style={{
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Informe-nos seu email</Text>
            
            <Text style={{
              marginTop:5,
              fontSize:14,
              color:'#d2d2d2',
            }}>Servirá para entramos em contato.</Text>
        </View>

        <TextInput placeholder="Email"
          style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth: 0.8,
            paddingBottom:0,
            marginBottom:30,
            marginTop:10,
            marginHorizontal:20,
          }}
          onChangeText={(text)=>{
            this.setState({email: text})
          }}
          value={this.state.email}
          keyboardType='email-address'/>

        </View>
        <TouchableOpacity onPress={()=>{
            //Alert.alert('Clique!');
            const email = this.state.email;
            if(email.length === 0){
              Alert.alert('Campo não pode ficar vazio!');
            } else {
              this.segmentCliked(3);
            }
          }} 
          style={{
            marginRight: 15, marginLeft: 200, marginTop:30, borderRadius: 40, alignItems:'center', justifyContent:'center', backgroundColor: '#15a1f8', height: 42
          }}>
            <Text style={{color: '#fff', fontSize: 18}}>AVANÇAR</Text>
        </TouchableOpacity>

      </View>
    );
  }

  exibirSenha = () => {
    this.setState({showSenha: !this.state.showSenha});
  }

  renderPass4 = () => {
    return(
      <View>
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
          marginTop:10,
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2',
        }}>
        <View style={{
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Crie uma senha</Text>
            <Text style={{
              marginTop:5,
              fontSize:14,
              color:'#d2d2d2',
            }}> Crie uma senha que você possa</Text>
            <Text style={{
              marginTop:5,
              fontSize:14,
              color:'#d2d2d2',
            }}>memorizar, mas que também seja forte,</Text>
            <Text style={{
              marginTop:5,
              fontSize:14,
              color:'#d2d2d2',
            }}>ou seja, de difícil advinhação por</Text>
            <Text style={{
              marginTop:5,
              fontSize:14,
              color:'#d2d2d2',
            }}>terceiros</Text>
            
        </View>

        <TextInput placeholder="Senha"
          style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth: 0.8,
            paddingBottom:0,
            marginBottom:5,
            marginTop:10,
            marginHorizontal:20,
          }}
          onChangeText={(text) => {
            this.setState({senha:text})
          }}
          value={this.state.senha}
          secureTextEntry={!this.state.showSenha} />
          <TouchableOpacity style={{
            marginTop:0,
            marginHorizontal:13
          }}
            onPress = {this.exibirSenha}>
            <View style={{flexDirection:'row'}}>
              <CheckBox size={20} onPress = {this.exibirSenha} checked={this.state.showSenha} /><Text 
                style={[ this.state.showSenha ? {color:'#15a1f8', marginLeft:15 }:{ marginLeft:15 } ]}>Exibir senha</Text>
            </View>
          </TouchableOpacity>


          <TextInput placeholder="Repetir senha"
          style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth: 0.8,
            paddingBottom:0,
            marginBottom:30,
            marginHorizontal:20,
          }}
          onChangeText={(text) => {
            this.setState({senhaVerificador:text})
          }}
          value={this.state.senhaVerificador}
          secureTextEntry={true}/>

        </View>
        <TouchableOpacity onPress={()=>{
            const {senha, senhaVerificador} = this.state;
            if(senha.length !== 0){
              if(senha === senhaVerificador){
                this.segmentCliked(4);
              }else{
                Alert.alert('Desculpe, mas as senhas não estão iguais!');
              }
            }else{
              Alert.alert('Este campo não pode ficar vazio!');
            }
            
          }} 
          style={{
            marginRight: 15, marginLeft: 200, marginTop:30, borderRadius: 40, alignItems:'center', justifyContent:'center', backgroundColor: '#15a1f8', height: 42
          }}>
            <Text style={{color: '#fff', fontSize: 18}}>AVANÇAR</Text>
        </TouchableOpacity>

      </View>
    );
  }

  finalCadastro = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tabs'})
      ]
      });
      this.props.navigation.dispatch(resetAction);
  }

  /*salvarDados = () => {
    this.setState({registrando: true});
    const fotoSource = this.state.imageSource;
    //Alert.alert(fotoSource)
    if(fotoSource === "https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png"){
      //Alert.alert(fotoSource)
      //this.setState({fotoPath:this.state.imageSource})
      this.salvarUsuario();
    } else {
      const config = {
        keyPrefix: 'photos/',
        bucket:'imagem-ilumino-comercio',
        region:'us-east-1',
        accessKey: 'AKIAJFRYNWIEI2JWYEDA',
        secretKey: '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',
        successActionStatus:201,
      }

      const file = {
        uri: this.state.imageSource,
        name:this.state.name,
        type:this.state.type,
      }

      RNS3.put(file, config)
        .then(
          (response) => {
            this.setState({fotoPath:response.body.postResponse.location});
            this.salvarUsuario();
            //Alert.alert(this.state.fotoPath);
          }
        ).progress((e)=>{
          //this.setState({progress:true});
          //this.setState({progressValue:e.percent})
          if(e.percent === 1){
            //this.setState({progress:false});
            //this.setState({progressValue:0});
            //Alert.alert("Foto carregada com sucesso!");
          }
        });
    }
    
  }*/

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
        //this.setState({imageSource:response.uri});
        //this.setState({name:response.fileName});
        //this.setState({type:'image/png'});
        const b64 = `data:image/jpeg;base64,${response.data}`;
        this.setState({imageSource:b64});
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
        //this.setState({imageSource:response.uri});
        //this.setState({name:response.fileName});
        //this.setState({type:'image/png'});
        const b64 = `data:image/jpeg;base64,${response.data}`;
        this.setState({imageSource:b64});
      }
    })
  }

  renderPass5 = () => {
    return(
    <View>
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
      <Image source={{uri:this.state.imageSource}} 
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
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginHorizontal: 30,
          backgroundColor: '#15A1F8',
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
        }}
        onPress ={
          this.salvarDados
        }>
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
    </View>
    );
  }

  salvarUsuario = async () => {
    //this.setState({registrando:true});
    const { 
      nome, sobreNome, cpf, nickname,
      celular, whatsapp, email, senha, fotoPath, imageSource,
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
        email:email.toLowerCase(),
        senha:senha,
        fotoPath:imageSource
      },
      Headers = {
        "Content-Type":"application/json"
      }
    );

    if(response.ok){
      Alert.alert('Registrado com sucesso!');
      this.setState({registrando:false});
      this.finalCadastro();
    }else{
      Alert.alert(response.data.errors.toString());
      this.setState({registrando:false});
      //Alert.alert('Error');
    }
  }

  renderPass = () => {
    if(this.state.activeIndex == 0){
      return(
        <View navigate={this.navigate} navigation={this.navigation}>
          {this.renderPass1()}
        </View>
      );
    } else if(this.state.activeIndex == 1){
      return(
        <View>
          {this.renderPass2()}
        </View>
      );
    } else if(this.state.activeIndex == 2){
      return(
        <View>
          {this.renderPass3()}
        </View>
      );
    } else if(this.state.activeIndex == 3){
      return(
        <View>
          {this.renderPass4()}
        </View>
      );
    } else if(this.state.activeIndex == 4){
      return(
        <View>
          {this.renderPass5()}
        </View>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.androidHeader} 
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

        </Header>
        
      <ScrollView style={{
        backgroundColor:'#f2f2f2',
      }}>
        <View style={{
          flex:1,
          backgroundColor:'#f2f2f2',
          marginBottom:20,
        }}>
        
        {/*this.state.registrando && <View style={{flex:1, backgroundColor: '#f2f2f2', 
                  alignItems:'center', justifyContent:'center'}}>
                    <Progress.CircleSnail size={60} color={'#15A1F8'}></Progress.CircleSnail> 
      </View>*/}
        {this.renderPass()}
        </View>
        </ScrollView>
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
     },
     ios:{
       backgroundColor:'#15a1f8',
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

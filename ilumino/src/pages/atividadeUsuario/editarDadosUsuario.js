import React, {Component} from 'react';
import {StyleSheet, Alert,BackHandler, Text, View, Image,TouchableOpacity, ScrollView, Platform, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content, Header, Left, Body, Right, CheckBox} from 'native-base';
import api from '../../services/api';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import {StackActions, NavigationActions} from 'react-navigation';

import {TextInputMask} from 'react-native-masked-text';

export default class EditarDadosUsuario extends Component {

  static navigationOptions = {
    header:null,
  }


  state = {
    senhaAlterarTelefone:'',
    
    editando:false,
    showSenha:false,
    showSenhaNova:false,

    modoInicio:true,
    modoEdicao:false,
    activeIndex:0,

    imageSource:'',
    uri:'',
    type:'',
    name:'',

    senha:'',
    novaSenha:'',
    novaSenha2:'',

    //
    id:0,
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',

    celular:'',
    whatsapp:false,
    
    email:'',
    fotoPath:'',
  }

  componentDidMount() {

  }


  voltar = ()=>{
    //this.props.navigation.goBack();
    const inicio = this.state.modoInicio;
    const edicao = this.state.modoEdicao;

    if(inicio){
      this.props.navigation.goBack();

    }else if(edicao){
      this.segmentClicked(0);
      this.setState({modoEdicao:false, modoInicio:true})
    }
  }

  segmentClicked = (index) => {
    this.setState({activeIndex:index});
  }

  editarNomeSNome = ()=>{
    this.setState({modoEdicao:true, modoInicio:false})
    this.segmentClicked(1);
  }

  editarCelular = ()=>{
    this.setState({modoEdicao:true, modoInicio:false})
    this.segmentClicked(2);
  }
  editarEmail = ()=>{
    this.setState({modoEdicao:true, modoInicio:false})
    this.segmentClicked(3);
  }
  editarSenha = ()=>{
    this.setState({modoEdicao:true, modoInicio:false})
    this.segmentClicked(4);
  }
  editarFotoPerfil = ()=>{
    this.setState({modoEdicao:true, modoInicio:false})
    this.segmentClicked(5);
  }


  renderTelaInicial = ()=>{
    return(
      <View>
<View style={{
            marginHorizontal:20,
          }}>
            <Text style={{
              marginTop:10,
              fontSize:40,
              color:'#000'
            }}>Qual</Text>
            <Text style={{
              fontSize:40,
              color:'#000'
            }}>Informação você</Text>
            <Text style={{
              fontSize:40,
              color:'#000'
            }}>Quer editar?</Text>
          </View>
        <View style={{
        }}>
          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:20,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarNomeSNome
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Nome, CPF e Apelido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarEmail
            //()=>{
            //  Alert.alert('Email!');
            //}
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarCelular
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Celular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarSenha
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarFotoPerfil
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Foto do perfil</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
          backgroundColor:'#15a1f8',
          borderRadius:40,
          marginHorizontal:20,
          marginTop:20,
          alignItems:'center',
          justifyContent:'center',
          height:42,
        }}
        onPress={
          this.voltar
        }>
            <Text style={{
              fontSize:18,
              color:'#fff'
            }}>CONCLUIR EDIÇÃO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  editarNomeNaApi = async()=>{
    this.setState({editando:true})
    const {nome, sobreNome, cpf, nickname, id} = this.state;

    if(nome.length === 0 || sobreNome.length === 0 || cpf.length === 0){
      Alert.alert('Há Campo(s) Vazio(s)!');
      this.setState({editando:false})
    } else { 
      const response = await api.put(
        '/api/usuario/editar-dados-cadastro/',
        {
          id:id,
          nome:nome,
          sobrenome:sobreNome,
          cpf:cpf,
          nickname:nickname
        },
        Headers={
          "Content-Type":"application/json",
        }
      )
      if(response.ok){
        await AsyncStorage.multiSet([
          ['@iLuminoApi:nomeUsuario', nome],
          ['@iLuminoApi:sobreNome', sobreNome],
          ['@iLuminoApi:cpf', cpf],
          ['@iLuminoApi:nickname', nickname],
        ])
        this.setState({editando:false})
        Alert.alert('Editado com sucesso!');
        this.voltar();
      }else{
        this.setState({editando:false})
        Alert.alert('Error');
      }
    } // fim else
  }

  renderAlteraNome = ()=>{
      return(
        <View>
          <View style={{
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:20,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            paddingBottom:30,
          }}>
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{
                fontSize:22,
                color:'#000',
                marginTop:10,
              }}>Dados para login</Text>

              
            </View>
            <TextInput 
              placeholder='Novo nome'
              value={this.state.nome}
              onChangeText={(text)=>{
                this.setState({nome:text})
              }}
              style={{
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                paddingBottom:0,
                marginTop:10,
                marginHorizontal:20,
              }}/>

              <TextInput 
                placeholder='Novo Sobrenome'
                value={this.state.sobreNome}
                onChangeText={(text)=>{
                  this.setState({sobreNome:text})
                }}
                style={{
                  marginTop:5,
                  marginHorizontal:20,
                  paddingBottom:0,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                }}
              />
              <TextInput 
                placeholder='Novo CPF'
                value={this.state.cpf}
                onChangeText={(text)=>{
                  this.setState({cpf:text})
                }}
                keyboardType='phone-pad'
                style={{
                  marginTop:5,
                  marginHorizontal:20,
                  paddingBottom:0,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                }}
              />
          </View>

          <View style={{
            marginHorizontal:20,
            marginTop:10,
            paddingBottom:30,
            backgroundColor:'#fff',
            borderColor:'#d2d2d2',
            borderWidth:0.8,
          }}>

          <View style={{
            alignItems:'center',
            justifyContent:'center'
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
            marginHorizontal:20,
            marginTop:10,
            paddingBottom:0,
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
          }}
          placeholder='Novo Nickname'
          value={this.state.nickname}
          onChangeText={(text)=>{
            this.setState({nickname:text})
          } }/>

          </View>

          <TouchableOpacity style={{
            backgroundColor:'#15a1f8',
            borderRadius:40,
            marginHorizontal:20,
            marginTop: 20,
            height:42,
            alignItems:'center',
            justifyContent:'center'
          }}
          onPress={
            this.editarNomeNaApi
          }>
            {!this.state.editando && <Text style={{
              fontSize:18,
              color:'#fff'
            }}>Editar</Text>}
            {
              this.state.editando && <View style={{
              }}>
                <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
              </View>
            }
          </TouchableOpacity>

        </View>
      );
    }

          editarCelularNaApi = async()=>{
            const celular = this.state.celular;
            Alert.alert('Celular: '+celular);
            /*this.setState({editando:true});
            //Alert.alert('Celular');
            const {id, celular, whatsapp} = this.state;

            if(celular.length === 0){
              Alert.alert('Celular não pode ser vazio!');
              this.setState({editando:false})
            }else{
              const response = await api.put(
                '/api/usuario/editar-celular/',
                {
                  id:id,
                  celular:celular,
                  whatsapp:whatsapp
                              },
                Headers={
                  "Content-Type":"application/json",
                }
              )
              if(response.ok){
                await AsyncStorage.multiSet([
                  ['@iLuminoApi:celular', this.state.celular],
                  ['@iLuminoApi:whatsapp', JSON.stringify(this.state.whatsapp)],
                ])
                this.setState({editando:false})
                Alert.alert('Editado com sucesso!');
                this.voltar();
              }else{
                this.setState({editando:false})
              }
            }  */
          }

          temWhatsapp = () => {
            this.setState({whatsapp: !this.state.whatsapp});
          }

          renderCelular = ()=>{
            return(
              <View>
                <View style={{
                  backgroundColor:'#fff',
                  marginHorizontal:20,
                  marginTop:20,
                  paddingBottom:30,
                  borderColor:'#d2d2d2',
                  borderWidth:0.8,
                }}>
                  <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Text style={{
                      marginTop:10,
                      color:'#000',
                      fontSize:22,
                    }}>Qual é o seu novo número de </Text>
                    <Text style={{
                      marginTop:2,
                      color:'#000',
                      fontSize:22,
                    }} >telefone celular?</Text>
                  </View>

                  {/*<TextInput style={{
                    marginHorizontal:20,
                    borderBottomColor:'#d2d2d2',
                    borderBottomWidth:0.8,
                    marginTop:10,
                    paddingBottom:0,
                  }}
                  placeholder='Novo número celular'
                  value={this.state.celular}
                  onChangeText={(text)=>{
                    this.setState({celular:text})
                  }}
                keyboardType='phone-pad'/>*/}
                  <TextInputMask style={{
                    marginHorizontal:20,
                    borderBottomColor:'#d2d2d2',
                    borderBottomWidth:0.8,
                    marginTop:10,
                    paddingBottom:0,
                  }}
                  placeholder={'(xx) xxxxx-xxxx'}
                  value={this.state.celular}
                  onChangeText={(text) => {
                    text = text.replace(' ','');
                    text = text.replace('(','');
                    text = text.replace(')','');
                    text = text.replace('-','');
                    this.setState({celular:text});
                  }}
                  type={'cel-phone'} />
                  <TouchableOpacity style={{
                    marginHorizontal:20,
                    marginTop:5,
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
                <TouchableOpacity style={{
                  backgroundColor:'#15a1f8',
                  borderRadius:40,
                  marginHorizontal:20,
                  marginTop: 20,
                  height:42,
                  alignItems:'center',
                  justifyContent:'center'
                }}
                onPress={
                  this.editarCelularNaApi
                }>
                  {!this.state.editando && <Text style={{
                    fontSize:18,
                    color:'#fff'
                  }}>Editar</Text>}
                  {
                    this.state.editando && <View style={{
                    }}>
                      <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
                    </View>
                  }
                </TouchableOpacity>
      
              </View>
            );
        }

        editarEmailNaApi = async ()=> {
          this.setState({editando:true})
          const { id, email} = this.state;

          if(email.length === 0){
            this.setState({editando:false})
            Alert.alert('Campo Vazio!');
          } else {
            const response = await api.put(
              '/api/usuario/editar-email/',
              {
                id:id,
                email:email
              },
              Headers = {
                "Content-Type":"application/json",
              }
            );
              if(response.ok){
                await AsyncStorage.multiSet([
                  ['@iLuminoApi:email', email], 
                ])
                this.setState({editando:false})
                Alert.alert('Editado com sucesso!');
                this.voltar();
              }else{
                this.setState({editando:false})
                Alert.alert('Erro')
              }
          }
        }

        renderEmail = ()=>{
          return(
            <View>
              <View style={{
                backgroundColor:'#fff',
                marginHorizontal:20,
                marginTop:20,
                paddingBottom:30,
                borderColor:'#d2d2d2',
                borderWidth:0.8,
              }}>
                <View style={{
                  alignItems:'center',
                  justifyContent:'center',
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

                <TextInput 
                style={{
                  paddingBottom:0,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                  marginHorizontal:20,
                }}
                placeholder='Digite novo email'
                value={this.state.email}
                onChangeText={(text)=>{
                  this.setState({email:text})
                }}
                keyboardType='email-address'/>
    
              </View>
              <TouchableOpacity style={{
                backgroundColor:'#15a1f8',
                borderRadius:40,
                marginHorizontal:20,
                marginTop: 20,
                height:42,
                alignItems:'center',
                justifyContent:'center'
              }}
              onPress={ this.editarEmailNaApi
                
              }>
               {!this.state.editando && <Text style={{
                  fontSize:18,
                  color:'#fff'
                }}>Editar</Text>}
                {
                  this.state.editando && <View style={{
                  }}>
                    <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
                  </View>
                }
              </TouchableOpacity>
    
            </View>
          );
      }

      editarSenhaNaApi = async()=>{
        //this.setState({editando:true})
        //Alert.alert('Senha');
        const {id, senha, novaSenha, novaSenha2} = this.state;
        if(senha.length === 0){
          Alert.alert('Senha não pode ser vazio!')
        }else{
          if(novaSenha !== novaSenha2){
            Alert.alert('Desculpe, mas as senhas não estão iguais!')
          }else{
            this.setState({editando:true})
            const response = await api.put(
              '/api/usuario/editar-senha/',
              {
                id:id,
                senha:novaSenha,
              },
              Headers={
                "Content-Type":"application/json",
              }
            )
            if(response.ok){
              this.setState({editando:false});
              Alert.alert('Editado com sucesso!');
              this.voltar();
            }else{
              this.setState({editando:false});
              Alert.alert('Erro')
            }
          }
        }
      }

      exibirSenha = ()=> {
        this.setState({showSenha : !this.state.showSenha});
      }

      exibirSenhaNova = ()=>{
        this.setState({showSenhaNova: !this.state.showSenhaNova});
      }
  
      renderSenha = ()=>{
        return(
          <View>
            <View style={{
              backgroundColor:'#fff',
              marginHorizontal:20,
              marginTop:20,
              paddingBottom:30,
              borderColor:'#d2d2d2',
              borderWidth:0.8,
            }}>
              <View style={{
                alignItems:'center',
                justifyContent:'center',
              }}>
                <Text style={{
                  marginTop:10,
                  color:'#000',
                  fontSize:22,
                }}>Alterar senha</Text>
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

              <TextInput style={{
                marginTop:10,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20
              }}
              placeholder='Digite senha antiga'
              value={this.state.senha}
              onChangeText={(text)=>{
                this.setState({senha:text})
              }}
              secureTextEntry={!this.state.showSenha}/>
              <TouchableOpacity style={{
                marginTop:2,
                marginHorizontal:13
              }}
                onPress = {this.exibirSenha}>
                <View style={{flexDirection:'row'}}>
                  <CheckBox size={20} onPress = {this.exibirSenha} checked={this.state.showSenha} /><Text 
                    style={[ this.state.showSenha ? {color:'#15a1f8', marginLeft:15 }:{ marginLeft:15 } ]}>Exibir senha</Text>
                </View>
              </TouchableOpacity>


              <TextInput style={{
                marginTop:10,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20,
              }}
              placeholder='Digite nova senha'
              value={this.state.novaSenha}
              onChangeText={(text)=>{
                this.setState({novaSenha:text})
              }}
              secureTextEntry={!this.state.showSenhaNova}/>
              <TouchableOpacity style={{
                marginTop:2,
                marginHorizontal:13
              }}
                onPress = {this.exibirSenhaNova}>
                <View style={{flexDirection:'row'}}>
                  <CheckBox size={20} onPress = {this.exibirSenhaNova} checked={this.state.showSenhaNova} /><Text 
                    style={[ this.state.showSenhaNova ? {color:'#15a1f8', marginLeft:15 }:{ marginLeft:15 } ]}>Exibir senha</Text>
                </View>
              </TouchableOpacity>

              <TextInput style={{
                marginHorizontal:20,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginTop:5
              }}
              placeholder='Repetir nova senha'
              value={this.state.novaSenha2}
              onChangeText={(text)=>{
                this.setState({novaSenha2:text})
              }}
              secureTextEntry={true}/>
  
            </View>
            <TouchableOpacity style={{
              backgroundColor:'#15a1f8',
              borderRadius:40,
              marginHorizontal:20,
              marginTop: 20,
              height:42,
              alignItems:'center',
              justifyContent:'center'
            }}
            onPress={
              this.editarSenhaNaApi
            }>
              {!this.state.editando && <Text style={{
                  fontSize:18,
                  color:'#fff'
                }}>Editar</Text>}
                {
                  this.state.editando && <View style={{
                  }}>
                    <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
                  </View>
                }
            </TouchableOpacity>
  
          </View>
        );
    }

    // funcao para atualizar imagem no banco
    editarFotoPathNaApi = async ()=> {
      const {id, fotoPath, imageSource} = this.state;

      const response = await api.put(
        '/api/usuario/editar-foto/',
        {
          id:id,
          fotoPath:imageSource
        },
        Headers={
          "Content-Type":"application/json"
        }
      );
      if(response.ok){
        await AsyncStorage.multiSet([
          ['@iLuminoApi:fotoPath', this.state.imageSource]
        ]);
        Alert.alert('Editado com sucesso!');
        this.setState({editando:false});
        this.voltar();
      }else{
        this.setState({editando:false});
        Alert.alert('Error')
      }
    }
    
    /*
    // funcao para salvar na amazon
    salvarFoto = ()=> {
      this.setState({editando:true})
      const fotoSource = this.state.imageSource;

      if(fotoSource === this.state.fotoPath){
        this.editarFotoPathNaApi();
      }else {
        const config = {
          keyPrefix: 'photos/',
          bucket: 'imagem-ilumino-comercio',
          region: 'us-east-1',
          accessKey: 'AKIAJFRYNWIEI2JWYEDA',
          secretKey: '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',
          successActionStatus:201,
        }

        const file = {
          uri:this.state.imageSource,
          name:this.state.name,
          type:this.state.type,
        }

        RNS3.put(file, config)
          .then(
            (response) => {
              this.setState({fotoPath:response.body.postResponse.location})
              this.editarFotoPathNaApi();
            }
          );
      } // fim else
    }*/

    salvarFoto = ()=> {
      this.setState({editando:true});
      this.editarFotoPathNaApi();
    }

    takePicCam(){
      const options = {
        quality:0.5,
      }
      ImagePicker.launchCamera(options, (response)=>{
        if(response.didCancel){
  
        }else if(response.error){
  
        }else{
          //this.setState({imageSource:response.uri});
          //this.setState({name:response.fileName});
          //this.setState({type:'image/png'});
          const base64 = `data:image/jpeg;base64,${response.data}`;
          this.setState({imageSource:base64});
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
          const base64 = `data:image/jpeg;base64,${response.data}`;
          this.setState({imageSource:base64});
        }
      })
    }

    renderFotoPerfil = ()=>{
      return(
        <View>
          
          <View style={{
            marginTop:50,
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
                width:130, height:130,borderRadius:100,
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

          <TouchableOpacity style={{
            backgroundColor:'#15a1f8',
            borderRadius:40,
            marginHorizontal:20,
            marginTop: 20,
            height:42,
            alignItems:'center',
            justifyContent:'center'
          }}
          onPress={
            this.salvarFoto
          }>
            {!this.state.editando && <Text style={{
                  fontSize:18,
                  color:'#fff'
                }}>Editar</Text>}
                {
                  this.state.editando && <View style={{
                  }}>
                    <Progress.CircleSnail size={30} color={'#fff'}></Progress.CircleSnail> 
                  </View>
                }
          </TouchableOpacity>

        </View>
      );
  }

  renderPass = ()=>{
    if(this.state.activeIndex === 0){
        return(<View>
          {this.renderTelaInicial()}
        </View>
        );
    } else if(this.state.activeIndex === 1){
      return(
        <View>
          {this.renderAlteraNome()}
        </View>
      );
    } else if(this.state.activeIndex === 2){
      return(
        <View>
          {this.renderCelular()}
        </View>
      );
    } else if(this.state.activeIndex === 3){
      return(
        <View>
          {this.renderEmail()}
        </View>
      );
    } else if(this.state.activeIndex === 4){
      return(
        <View>
          {this.renderSenha()}
        </View>
      );
    } else if(this.state.activeIndex === 5){
      return(<View>
        {this.renderFotoPerfil()}
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
            <TouchableOpacity onPress={this.voltar} hitSlop={{top:20, bottom:20, right:20, left:20}}><Icon name='angle-left' color='white' size={30}
              onPress={
                  this.voltar
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
        <Content style={{
          backgroundColor:'#f2f2f2',
          //flex:1,
        }}>
        <ScrollView style={{
          marginBottom:20,
          backgroundColor:'#f2f2f2',
        }}>
          
          {this.renderPass()}

        </ScrollView>
        </Content>
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
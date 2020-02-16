import React, {Component} from 'react';
import {StyleSheet, BackHandler,AsyncStorage,TextInput,Text, View, Alert,TouchableOpacity, Image,ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content, Header, Left, Body, Right, CheckBox} from 'native-base';
import api from '../../services/api';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';

import {TextInputMask} from 'react-native-masked-text';

export default class EditarDadosColaborador extends Component{
  static navigationOptions = {
    header:null,
  }

  state = {
    modoInicio:true,
    modoEdicao:false,
    activeIndex:0,
    //colaboradorDto:{},
    sexoF:false,
    sexoM:false,
    sexoO:false,

    editando:false,
    showSenha:false,
    showNovaSenha:false,

    senhaAntiga:'',
    novaSenha:'',
    novaSenha2:'',

    imageSource:'',
    name:'',
    type:'',

    id:0,
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
    celular:'',
    whatsapp:false,
    email:'',
    sexo:'',
    nacionalidade:'',
    dataNascimento:'',
    fotoPath:'',

    //
    pais:'',
    estado:'',
    cidade:'',
    bairro:'',
    endereco:'',
    cep:'',
    numero:'',
    complemento:'',
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware

    const dados = this.props.navigation.state.params.dados;
    this.setState({id:dados.id, nome: dados.nome, sobreNome:dados.sobreNome, 
        cpf: dados.cpf, nickname: dados.nickname, celular:dados.celular, whatsapp: dados.whatsapp,
        email: dados.email, sexo: dados.sexo, nacionalidade: dados.nacionalidade, dataNascimento: dados.dataNascimento,
        fotoPath: dados.fotoPath, imageSource: dados.fotoPath,pais: dados.pais, estado:dados.estado, cidade: dados.cidade, bairro: dados.bairro,
        endereco: dados.endereco, cep: dados.cep, numero: dados.numero, complemento: dados.complemento});
    if(dados.sexo === 'F'){
      this.setState({
        sexoF:true,sexoM:false,sexoO:false,
      })
    }else if(dados.sexo === 'M'){
      this.setState({
        sexoF:false,sexoM:true,sexoO:false,
      })
    }else if(dados.sexo === 'O'){
      this.setState({
        sexoF:false,sexoM:false,sexoO:true
      })
    }
    //Alert.alert('Nome: '+ this.state.nome);
  }

  selectSexoF = () => {
    this.setState({
      sexo:"F",
      sexoF:true,
      sexoM:false,
      sexoO:false,
    })
  }

  selectSexoM = () => {
    this.setState({
      sexo:"M",
      sexoF:false,
      sexoM:true,
      sexoO:false,
    })
  }

  selectSexoO = () => {
    this.setState({
      sexo:"O",
      sexoF:false,
      sexoM:false,
      sexoO:true,
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware
  }

  handleBackPress = () => {
    this.voltar(); // melhor performance com Voltar async 
    return true;
  }

  voltar = ()=>{
    //this.props.navigation.goBack();
    const inicio = this.state.modoInicio;
    const edicao = this.state.modoEdicao;

    if(inicio){
      this.props.navigation.state.params.onGoBack();
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
 editarDataNascimento = ()=>{
  this.setState({modoEdicao:true, modoInicio:false})
  this.segmentClicked(6);
 }
 editarSexo = ()=>{
  this.setState({modoEdicao:true, modoInicio:false})
  this.segmentClicked(7);
 }
 editarEndereco = ()=>{
  this.setState({modoEdicao:true, modoInicio:false})
  this.segmentClicked(8);
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

          {/*<TouchableOpacity style={{
            height:42,
            backgroundColor:'#fff',
            marginHorizontal:20,
            marginTop:10,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            justifyContent:'center',
          }}
          onPress={
            this.editarDataNascimento
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Data de nascimento*</Text>
          </TouchableOpacity>*/}

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
            this.editarSexo
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Sexo e nacionalidade</Text>
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
            this.editarEndereco
          }>
            <Text style={{
              fontSize:18,
              color:'#000',
              marginHorizontal:20
            }}>Endereço</Text>
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

  alterarNomeApi = async ()=> {
    const {id, nome, sobreNome, cpf, nickname} = this.state;
    if(nome.length === 0 || sobreNome.length === 0 || cpf.length === 0){

    }else{
      this.setState({editando:true});
      const response = await api.put(
        '/api/colaborador/editar-dados-cadastro/',
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
      );
      if(response.ok){
        await AsyncStorage.multiSet([
          ['@iLuminoApi:nomeUsuario', this.state.nome],
          ['@iLuminoApi:sobreNome', this.state.sobreNome],
          ['@iLuminoApi:cpf', this.state.cpf],
          ['@iLuminoApi:nickname', this.state.nickname],
        ]);

        this.setState({editando:false});
        Alert.alert('Editado com sucesso!');
        this.voltar();
      }else{
        this.setState({editando:false});
        Alert.alert('Error');
      }
    }
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
              marginTop:10,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{
                fontSize:22,
                color:'#000',
                marginTop:10,
              }}>Dados para login:</Text>
            </View>
            
            <TextInput style={{
              marginHorizontal:20,
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginTop:10,
            }} 
            placeholder='Novo nome'
            value={this.state.nome}
            onChangeText = {(text)=>{
              this.setState({nome:text})
            }}/>


            <TextInput style={{
              marginTop:5,
              marginHorizontal:20,
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
            }}
            placeholder='Novo sobrenome'
            value={this.state.sobreNome}
            onChangeText = {(text) => {
              this.setState({sobreNome:text})
            }}/>

            <TextInput style={{
              marginTop:5,
              marginHorizontal:20,
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
            }}
            placeholder='CPF'
            onChangeText = {(text) => {
              this.setState({cpf:text})
            }}
            value={this.state.cpf}
            keyboardType='phone-pad' />
          </View>

          <View style={{
            marginHorizontal:20,
            backgroundColor:'#fff',
            borderColor:'#d2d2d2',
            borderWidth:0.8,
            marginTop:10,
          }}>

          <View style={{
            marginTop:10,
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              color:'#d2d2d2',
              fontSize:18
            }}>Altere o apelido</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:22,
            }}>(nickname)</Text>
            <Text style={{
              color:'#d2d2d2',
              fontSize:14
            }}>O apelido estará visível para todos</Text>
          </View>

          <TextInput style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
            paddingBottom:0,
            marginBottom:30,
            marginTop:10,
            marginHorizontal:20
          }}
          placeholder='Apelido (Opcional)'
          onChangeText={(text) => {
            this.setState({nickname:text})
          }}
          value={this.state.nickname}/>

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
            this.alterarNomeApi
          }>

            {!this.state.editando && <Text style={{
              fontSize:18,
              color:'#fff'
            }}>Editar</Text>}
            {this.state.editando && <View>
              <Progress.CircleSnail size={30} color={'#fff'}/>
            </View>}


          </TouchableOpacity>

        </View>
      );
    }

  
  alterarCelularApi = async ()=>{
    const celular = this.state.celular;
    Alert.alert('Celular: '+celular);
    /*const {id, celular, whatsapp} = this.state;
    if(celular.length === 0){
      Alert.alert('Celular não pode ser vazio!');
    }else{
      this.setState({editando:true});
      const response = await api.put(
        '/api/colaborador/editar-celular/',
        {
          id:id,
          celular:celular,
          whatsapp:whatsapp
        },
        Headers={
          "Content-Type":"application/json",
        }
      );
      if(response.ok){
        await AsyncStorage.multiSet([
          ['@iLuminoApi:celular', this.state.celular],
          ['@iLuminoApi:whatsapp', JSON.stringify(this.state.whatsapp)],
        ]);
        this.setState({editando:false});
        Alert.alert('Editado com sucesso!');
        this.voltar();
      }else{
        this.setState({editando:false});
        Alert.alert('Error');
      }
    }*/
  }

    temWhatsapp = ()=>{
      this.setState({whatsapp: !this.state.whatsapp});
    }

          renderCelular = ()=>{
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
                    }}>Qual o seu novo número de</Text>
                    <Text style={{
                      fontSize:22,
                      color:'#000',
                    }}>
                      telefone celular?
                    </Text>
                  </View>
                
                {/*<TextInput style={{
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                  paddingBottom:0,
                  marginHorizontal:20,
                  marginTop:10,
                }} 
                placeholder='Novo telefone'
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
                  this.alterarCelularApi
                }>
                  {!this.state.editando && <Text style={{
                    fontSize:18,
                    color:'#fff'
                  }}>Editar</Text>}
                  {this.state.editando && <View>
                    <Progress.CircleSnail size={30} color={'#fff'}/>
                  </View>}
                </TouchableOpacity>
      
              </View>
            );
        }


    
    alterarEmailApi = async ()=>{
      this.setState({editando:true})
          const { id, email} = this.state;

          if(email.length === 0){
            this.setState({editando:false})
            Alert.alert('Campo Vazio!');
          } else {
            const response = await api.put(
              '/api/colaborador/editar-email/',
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
                  }}>Informe-nos seu novo email</Text>
                </View>
                <TextInput 
                style={{
                  marginTop:10,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,

                  marginHorizontal:20,
                }}
                placeholder='Novo email'
                value={this.state.email}
                onChangeText={(text) => {
                  this.setState({email:text})
                }}
                keyboardType='email-address' />
    
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
              onPress={this.alterarEmailApi}>
                {!this.state.editando && <Text style={{
                  fontSize:18,
                  color:'#fff'
                }}>Editar</Text>}
                {this.state.editando && <View>
                  <Progress.CircleSnail size={30} color={'#fff'}/>
                </View>}
              </TouchableOpacity>
    
            </View>
          );
      }

    
    alterarSenhaApi = async ()=> {
      const {id, senhaAntiga, novaSenha, novaSenha2} = this.state;
      if(senhaAntiga.length === 0){
        Alert.alert('Senha não pode ser vazio!');
      }else{
        if(novaSenha !== novaSenha2){
          Alert.alert('Desculpe, mas as senhas não estão iguais');
        }else{
          this.setState({editando:true});
          const response = await api.put(
            '/api/colaborador/editar-senha/',
            {
              id:id,
              senha:novaSenha
            },
            Headers={
              "Content-Type":"application/json",
            }
          );
          if(response.ok){
            this.setState({editando:false});
            Alert.alert('Editado com sucesso!');
            this.voltar();
          }else{
            this.setState({editando:false});
            Alert.alert('Error');
          }
        }
      }
    }

      exibirSenha = () => {
        this.setState({showSenha: !this.state.showSenha});
      }

      exibirNovaSenha = () => {
        this.setState({showNovaSenha:!this.state.showNovaSenha});
      }
  
      renderSenha = ()=>{
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
                }}>Alterar a senha</Text>
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

              <TextInput 
                style={{
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                  paddingBottom:0,
                  marginHorizontal:20,
                  marginBottom:5,
                  marginTop:10,
                }}
                placeholder='Senha Atual'
                onChangeText={(text)=>{
                  this.setState({senhaAntiga:text})
                } }
                value={this.state.senhaAntiga}
                secureTextEntry={!this.state.showSenha}
               />
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
                  <CheckBox size={20} onPress={this.exibirSenha}
                  checked={this.state.showSenha}/>
                  <Text style={[
                    this.state.showSenha ? {
                      color:'#15a1f8',
                      marginLeft:15
                    }: {
                      marginLeft:15
                    }
                  ]}>
                    Exibir senha
                  </Text>
                 </View>
               </TouchableOpacity>

               <TextInput 
                style={{
                  marginTop:5,
                  borderBottomColor:'#d2d2d2',
                  borderBottomWidth:0.8,
                  paddingBottom:0,
                  marginHorizontal:20,
                  marginBottom:5,
                }}
                placeholder='Nova senha'
                onChangeText={(text)=>{
                  this.setState({novaSenha:text})
                } }
                value={this.state.novaSenha}
                secureTextEntry={!this.state.showNovaSenha}
               />
               <TouchableOpacity style={{
                 marginTop:0,
                 marginHorizontal:13,
               }}
               onPress={
                  this.exibirNovaSenha
               }>
                 <View style={{
                   flexDirection:'row'
                 }}>
                  <CheckBox size={20} onPress={this.exibirNovaSenha}
                  checked={this.state.showNovaSenha}/>
                  <Text style={[
                    this.state.showNovaSenha ? {
                      color:'#15a1f8',
                      marginLeft:15
                    }: {
                      marginLeft:15
                    }
                  ]}>
                    Exibir senha
                  </Text>
                 </View>
               </TouchableOpacity>

               <TextInput style={{
                 paddingBottom:0,
                 borderBottomColor:'#d2d2d2',
                 borderBottomWidth:0.8,
                 marginHorizontal:20,
               }}
               placeholder='Repetir nova senha'
               value={this.state.novaSenha2}
               onChangeText={(text) => {
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
              this.alterarSenhaApi
            }>
              {!this.state.editando && <Text style={{
                fontSize:18,
                color:'#fff'
              }}>Editar</Text>}
              {this.state.editando && <View>
                <Progress.CircleSnail size={30} color={'#fff'}/>
              </View>}
            </TouchableOpacity>
  
          </View>
        );
    }

    editarFotoNaApi = async ()=>{
      const {id, fotoPath, imageSource} = this.state;

      const response = await api.put(
        '/api/colaborador/editar-foto/',
        {
          id:id,
          fotoPath:imageSource
        },
        Headers={
          "Content-Type":"application/json",
        }
      );
      if(response.ok){

        await AsyncStorage.multiSet([
          ['@iLuminoApi:fotoPath', this.state.imageSource],
        ]);
        this.setState({editando:false});
        Alert.alert('Editado com sucesso!');
        this.voltar();
      }else{
        this.setState({editando:false});
        Alert.alert('Error')
      }
    }
/*
    salvarFoto = ()=>{
      this.setState({editando:true});
      const fotoSource = this.state.imageSource;

      if(fotoSource === this.state.fotoPath){
        this.editarFotoNaApi();
      } else {
        const config = {
          keyPrefix: 'photos/',
          bucket: 'imagem-ilumino-comercio',
          region: 'us-east-1',
          accessKey: 'AKIAJFRYNWIEI2JWYEDA',
          secretKey: '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',
          successActionStatus:201,
        };

        const file = {
          uri:this.state.imageSource,
          name:this.state.name,
          type:this.state.type
        }

        RNS3.put(file, config)
          .then((response)=>{
            this.setState({fotoPath:response.body.postResponse.location});
            this.editarFotoNaApi();
          });
      }
    }*/
    salvarFoto = ()=>{
      this.setState({editando:true});
      this.editarFotoNaApi();
    }

    takePicCam(){
      const options = {
        quality:0.5,
      }
      ImagePicker.launchCamera(options, (response)=>{
        if(response.didCancel){

        }else if(response.error){

        }else{
          //this.setState({imageSource:response.uri, name:response.fileName, type:'image/png'});
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
          //this.setState({imageSource:response.uri, name:response.fileName, type:'image/png'});
          const base64 = `data:image/jpeg;base64,${response.data}`;
          this.setState({imageSource:base64});
        }
      });
    }

    renderFotoPerfil = ()=>{
      return(
        <View>
          <View style={{
            backgroundColor:'#fff',
            marginHorizontal:20,
            paddingBottom:30,
            marginTop:20,
            borderColor:'#d2d2d2',
            borderWidth:0.8,
          }}>
            <View style={{
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{
                fontSize:20,
                color:'#000',
                marginTop:10,
              }}>Selecione uma foto</Text>
              <Text style={{
                fontSize:20,
                color:'#000',
                
              }}>
              para perfil
              </Text>
            

              <Image style={{
                width:130,
                height:130, borderRadius:100,
                paddingLeft:30, paddingRight:30,
                borderWidth:2, borderColor:'#d2d2d2',
                marginTop:20
              }}
              source={{uri: this.state.imageSource}}/>
            </View>

            <TouchableOpacity
              style={{
                marginTop:20,
                height:42,
                borderRadius:3,
                borderWidth:2,
                borderColor:'#d2d2d2',
                backgroundColor:'#fff',
                justifyContent:'center',
                alignItems:'center',
                paddingLeft:5,
                paddingRight:5,
                marginHorizontal:20,
              }}
             onPress={
               this.takePicGallery.bind(this)
             }>
              <Text>Abrir Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={
              this.takePicCam.bind(this)
            } 
            style={{
              marginTop:5,
              height:42,
              borderRadius:3,
              borderWidth:2,
              borderColor:'#d2d2d2',
              backgroundColor:'#fff',
              justifyContent:'center',
              alignItems:'center',
              paddingLeft:5,
              paddingRight:5,
              marginHorizontal:20,
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
            {this.state.editando && <View>
              <Progress.CircleSnail size={30} color={'#fff'}/>
            </View>}
          </TouchableOpacity>

        </View>
      );
  }
  renderDataNasc = ()=>{
    return(
      <View>
        <View style={{
          backgroundColor:'#fff',
          marginHorizontal:20,
          marginTop:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8,
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:22,
              color:'#000',
              marginTop:10,
              marginBottom:40,
            }}>Data Nascimento</Text>
          </View>

        </View>
        <TouchableOpacity style={{
          backgroundColor:'#15a1f8',
          borderRadius:40,
          marginHorizontal:20,
          marginTop: 20,
          height:42,
          alignItems:'center',
          justifyContent:'center'
        }}>
          {!this.state.editando && <Text style={{
              fontSize:18,
              color:'#fff'
            }}>Editar</Text>}
            {this.state.editando && <View>
              <Progress.CircleSnail size={30} color={'#fff'}/>
            </View>}
        </TouchableOpacity>

      </View>
    );
}

alterarSexoNacionalidadeApi = async ()=>{
  this.setState({editando:true});
  const {id, sexo, nacionalidade} = this.state;

  const response = await api.put(
    '/api/colaborador/editar-dados-extra/',
    {
      id:id,
      sexo:sexo,
      nacionalidade:nacionalidade
    },
    Headers={
      "Content-Type":"application/json",
    }
  );

  if(response.ok){
    await AsyncStorage.multiSet([
      ['@iLuminoApi:sexo', this.state.sexo],
      ['@iLuminoApi:nacionalidade', this.state.nacionalidade],
    ]);
    Alert.alert('Editado com sucesso!');
    this.setState({editando:false});
    this.voltar();
  }else{
    this.setState({editando:false});
    Alert.alert('Error')
  }
}
renderSexo = ()=>{
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
          }}>Qual a sua nacionalidade?</Text>
        </View>

        <TextInput style={{
          marginHorizontal:20,
          marginTop:10,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          paddingBottom:0,
        }}
        value={this.state.nacionalidade}
        onChangeText={(text) => {
          this.setState({nacionalidade:text})
        }}
        placeholder='Nacionalidade (Opcional)'/>

      </View>

      <View style={{
        marginTop:20,
        backgroundColor:'#fff',
        borderColor:'#d2d2d2',
        borderWidth:0.8,
        marginHorizontal:20,
        paddingBottom:30,
      }}>

      <View style={{
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{
          color:'#000',
          fontSize:22,
          marginTop:10,
        }}>
          Qual o seu sexo?
        </Text>
      </View>

        <View style={{
          marginTop:20,
          flexDirection:'row',
          justifyContent:'space-around',
          marginHorizontal:30,
        }}>


        <TouchableOpacity style={[this.state.sexoF ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
          onPress={
            this.selectSexoF
          }>
            <Text style={[this.state.sexoF ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Fem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[this.state.sexoM ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
          onPress={
            this.selectSexoM
          }>
            <Text style={[this.state.sexoM ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Masc</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[this.state.sexoO ? {
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#15a1f8',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }:{
            flex:1,
            backgroundColor:'transparent',
            borderColor:'#d2d2d2',
            borderWidth: 0.8,
            alignItems:'center',
            justifyContent:'center',
            height:42,
            marginRight:1,
          }]}
           onPress={
            this.selectSexoO
          }>
            <Text style={[this.state.sexoO ? {
              color:'#15a1f8',
              fontSize:18,
            }:{
              color:'#d2d2d2',
              fontSize:18
            }]}>Outro</Text>
          </TouchableOpacity>

        </View>
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
        this.alterarSexoNacionalidadeApi
      }>
        {!this.state.editando && <Text style={{
          fontSize:18,
          color:'#fff'
        }}>Editar</Text>}
        {this.state.editando && <View>
          <Progress.CircleSnail size={30} color={'#fff'}/>
        </View>}
      </TouchableOpacity>

    </View>
  );
}

setaValores = async (cep, pais, estado, cidade, bairro, endereco, complemento, numero)=>{
  
  await AsyncStorage.multiSet([  
    ['@iLuminoApi:pais',pais],
    ['@iLuminoApi:estado',estado],
    ['@iLuminoApi:cidade',cidade],
    ['@iLuminoApi:bairro',bairro],
    ['@iLuminoApi:endereco',endereco],
    ['@iLuminoApi:numero',numero],
    ['@iLuminoApi:complemento',complemento],
    ['@iLuminoApi:cep',cep]
  ]);
}
/*
alterarEnderecoApi = async ()=> {
  
  const {id, cep, pais, estado, cidade, bairro, endereco, complemento, numero} = this.state;

  if(cep.length === 0 || pais.length === 0 || estado.length === 0 || cidade.length === 0 || bairro.length === 0 || endereco.length === 0){
    Alert.alert('Há Campo(s) vazio(s)!');
  }else{
    this.setState({editando:true});
    const response = await api.put(
      '/api/colaborador/editar-endereco/',
      {
        colaborador:{ id:Number(id) },
        pais:pais,
        cep:cep,
        estado:estado,
        cidade:cidade,
        bairro:bairro,
        endereco:endereco,
        complemento:complemento,
        numero:numero
      },
      Headers={
        "Content-Type":"application/json",
      }
    );

    if(response.ok){
      Alert.alert('Alterado!'); // await
      this.setaValores(cep, pais, estado, cidade, bairro, endereco, complemento, numero);

      this.setState({editando:false});
      Alert.alert('Editado com sucesso!');
      this.voltar();
    }else{
      this.setState({editando:false});
      Alert.alert('Error');
    }
  }
}*/

alterarEnderecoApi = async ()=>{
  const {id, pais, estado, cidade, bairro, endereco, complemento, numero, cep} = this.state;
  if(cep.length === 0 || pais.length === 0 || estado.length === 0 || cidade.length === 0 || bairro.length === 0 || endereco.length === 0  ){
    Alert.alert('Error - empty');
  }else{
    this.setState({editando:true});
    const response = await api.put(
      '/api/colaborador/editar-endereco/',
      {
        colaborador:{id},
        pais, 
        estado,
        cidade,
        bairro,
        endereco,
        complemento,
        numero,
        cep
      },
      Headers={
        "Content-Type":"application/json",
      }
    );

    if(response.ok){

      try{
        await AsyncStorage.multiSet([
          ['@iLuminoApi:pais', pais],
          ['@iLuminoApi:estado', estado],
          ['@iLuminoApi:cidade', cidade],
          ['@iLuminoApi:bairro',bairro],
          ['@iLuminoApi:endereco',endereco],
          ['@iLuminoApi:complemento',complemento],
          ['@iLuminoApi:numero',numero],
          ['@iLuminoApi:cep',cep],
        ]);
      }catch(error){
        Alert.alert(`Erro Async: ${error}`);
      }
      
      this.setState({editando:false});
      Alert.alert('Editado com Sucesso!');
      this.voltar();
    }else {
      this.setState({editando:false});
      Alert.alert('Error'+response.data.errors);
    }
  }
}

renderEndereco = ()=>{
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
          }}>Informe-nos seu novo endereço</Text>
        </View>

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='CEP'
        value={this.state.cep}
        onChangeText={(text)=>{
          this.setState({cep:text})
        }}/>

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Pais'
        value={this.state.pais}
        onChangeText={(text) => {
          this.setState({pais:text})
        }}
        />

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Estado'
        value={this.state.estado}
        onChangeText={(text)=>{
          this.setState({estado:text})
        }}/>

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Cidade'
        value={this.state.cidade}
        onChangeText={(text)=>{
          this.setState({cidade:text})
        }}/>

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Bairro'
        value={this.state.bairro}
        onChangeText={(text)=>{
          this.setState({bairro:text})
        }}/>

        <TextInput style={{
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Endereço'
        value={this.state.endereco}
        onChangeText={(text)=>{
          this.setState({endereco:text})
        }}/>

        <View style={{
          flexDirection:'row',
        }}>

        <TextInput style={{
          flex:1,
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }} 
        placeholder='Núm. (Opc)'
        onChangeText={(text) => {
          this.setState({numero:text})
        }}
        value={this.state.numero}/>
        <TextInput style={{
          flex:2,
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20,
          marginTop:10,
        }}
        placeholder='Compl. (Opcional)'
        value={this.state.complemento}
        onChangeText={(text) => {
          this.setState({complemento:text})
        }} />

        </View>

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
        this.alterarEnderecoApi
      }>
        {!this.state.editando && <Text style={{
          fontSize:18,
          color:'#fff'
        }}>Editar</Text>}
        {this.state.editando && <View>
          <Progress.CircleSnail size={30} color={'#fff'}/>
        </View>}
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
    } else if(this.state.activeIndex === 6){
      return(
        <View>
          {this.renderDataNasc()}
        </View>
      );
    } else if(this.state.activeIndex === 7){
      return(
        <View>
          {this.renderSexo()}
        </View>
      );
    }  else if(this.state.activeIndex === 8){
      return(
        <View>
          {this.renderEndereco()}
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
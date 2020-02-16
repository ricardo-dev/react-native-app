import React, {Component} from 'react';
import {Image, Alert, BackHandler,ScrollView ,Platform, StyleSheet, TouchableOpacity ,TextInput, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, NavigationActions} from 'react-navigation';
import {Container, Header, Left, Body, Right, Content, CheckBox} from 'native-base';
import api from '../../services/api';
import {TextInputMask} from 'react-native-masked-text';

import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';

import Modal from 'react-native-modal';

export default class CadastroColaborador extends Component {

  static navigationOptions = {
    header:null,
  }

  exibirModal = () => {
    this.setState({modalVisivel: true});
  }

  aceitoCondicao = ()=>{
    this.setState({modalVisivel:false, condicao:true})
  }

  naoAceitoCondicao = ()=>{
    this.setState({modalVisivel:false, condicao:false})
  }

  state = {

    modalVisivel:false,
    condicao:false,

    stateInicio:true,
    stateCadastro:false,

    sexoF:false,
    sexoM:false,
    sexoO:true,


    p1fim:false,
    p2fim:false,
    activeIndex:0,

    // dados para cadastro 1 etapa
    nome:'',
    sobreNome:'',
    cpf:'',
    nickname:'',
    celular:'',
    whatsapp:true,
    email:'',
    id_responsavel:0,
    senha:'',
    senhaVerificador:'',
    // dados para cadastro 2 etapa
    id:0,
    pais:'Brasil',
    estado:'Goiás',
    cidade:'',
    bairro:'',
    endereco:'',
    cep:'',
    numero:'',
    complemento:'',
    sexo:'O',
    nacionalidade:'',
    dia:'', mes:'',ano:'',
    dataNascimento:'vazio',
    fotoPath:"https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
    imageSource: "https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png",
    uri:'',
    name:'',
    type:'',
    showSenha:false,
    registrandoEtapa1:false,
    registrandoEtapa2:false,
    horarioTrabalho:[],
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware
  }

  handleBackPress = () => {
    this.Voltar(); // melhor performance com Voltar async 
    return true;
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

  finalizar = () => {
    const {p1fim, p2fim} = this.state;

    if(p1fim && p2fim){
      Alert.alert('Finalizado!');
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Tabs'})
        ]
        });
        this.props.navigation.dispatch(resetAction);

    }else{
      Alert.alert('Deve finalizar as duas etapas');
    }
  }

  Voltar = () => {
    //this.props.navigation.goBack();
    const {stateInicio, stateCadastro} = this.state;
    if(stateInicio){
      this.props.navigation.goBack();
    }else if(stateCadastro){
      this.setState({stateInicio:true, stateCadastro:false})
      this.segmentCliked(0);
    }
  }

  VoltarInicio = () => {
    this.setState({stateInicio:true, stateCadastro:false})
    this.segmentCliked(0);
  }

  redirecionarParte1 = () => {
    //this.props.navigation.navigate('CadastroColaboradorP1');
    const condicao = this.state.condicao;
    if(condicao){
      this.setState({stateInicio:false, stateCadastro:true})
      this.segmentCliked(1);
    }else{
      this.exibirModal();
    }
    
  }

  redirecionarParte2 = () => {
    //this.props.navigation.navigate('CadastroColaboradorP2');
    if(this.state.p1fim){
      this.setState({stateInicio:false, stateCadastro:true})
      this.segmentCliked(6);
    }else{
      Alert.alert('A primeira etapa deve ser finalizada!');
    }
  }

  redirecionarEditar1 = () => {
    //Alert.alert('Editar dados 1');
    const {id, nome, sobreNome, cpf, nickname, celular, whatsapp, email, senha} = this.state;
    this.props.navigation.navigate('EditarColaboradorP1', {dados:{
      id, nome, sobreNome, cpf, nickname, celular, whatsapp, email, senha
    }});
  }

  redirecionarEditar2 = () => {
    //Alert.alert('Editar dados 2');
    const {id, sexo, nacionalidade, dataNascimento, fotoPath, pais, estado, cidade, bairro,
      endereco, cep, numero, complemento} = this.state;
    this.props.navigation.navigate('EditarColaboradorP2',{dados:{
      id,sexo, nacionalidade, dataNascimento, fotoPath, endereco:{
        pais, estado, cidade, bairro, endereco, cep, numero, complemento
      }
    }});
  }

  // passos para cadastro - 10 fragmentos

  segmentCliked = (index) => {
    this.setState({activeIndex:index});
  }

  // primeira etapa
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
          marginTop:20,
          marginHorizontal:20,
          borderWidth:0.8,
          borderColor:'#d2d2d2'
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              marginTop:10,
              color:'#000',
              fontSize:22,
            }}>Dados para login:</Text>
          </View>

          <TextInput style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
            paddingBottom:0,
            marginTop:5,
            marginHorizontal:20,
          }}
          placeholder = 'Nome'
          onChangeText = {(text)=>{
            this.setState({nome: text})
          }}
          value={this.state.nome}/>

          <TextInput style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
            paddingBottom:0,
            marginTop:10,
            marginHorizontal:20,
          }}
          placeholder = 'Sobrenome completo'
          onChangeText = {(text)=>{
              this.setState({sobreNome:text});
          }} 
          value={this.state.sobreNome} />

          <TextInput style={{
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
            paddingBottom:0,
            marginTop:10,
            marginBottom : 20,
            marginHorizontal:20,
          }}
          placeholder = 'CPF'
          onChangeText = {(text)=>{
              this.setState({cpf:text});
          }} 
          value={this.state.cpf}
          keyboardType="phone-pad" />

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

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          const{nome, sobreNome, cpf} = this.state;

          if(nome.length === 0 || sobreNome.length === 0 || cpf.length === 0){
            Alert.alert("Há campo(s) vazio(s).")
          }else{
            this.segmentCliked(2);
          }
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>

      </View>
    );
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
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8,
        }} >

        <View style={{
          alignItems:'center',
          justifyContent:'center',
        }}>
          <Text style={{
            fontSize:22,
            color:'#000',
            marginTop:10
          }}>Se você foi indicado por</Text>
          <Text style={{
            fontSize:22,
            color:'#000',
            //marginTop:10
          }}>algum colaborador</Text>
          <Text style={{
            fontSize:22,
            color:'#000',
           // marginTop:10
          }}>iLúmino? digite aqui</Text>
          <Text style={{
            fontSize:22,
            color:'#000',
            //marginTop:10
          }}>o ID dele. (Opcional)</Text>
        </View>

        <TextInput style={{
          borderBottomColor:'#d2d2d2',
          borderBottomWidth: 0.8,
          paddingBottom:0,
          marginHorizontal:20,
          marginTop:10,
          marginBottom:20,
        }} 
        placeholder='ID'
        onChangeText={ (text)=>{
          this.setState({id_responsavel: Number(text)})
          
        } } 
         />

        </View>

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          this.segmentCliked(3);
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  temWhatsapp = ()=> {
    this.setState({whatsapp: !this.state.whatsapp});
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

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
            var telefone = this.state.celular;
            telefone = telefone.replace(' ','');
            telefone = telefone.replace('(','');
            telefone = telefone.replace(')','');
            telefone = telefone.replace('-','');
            this.setState({celular:telefone});

          if(telefone.length === 0){
            Alert.alert('Celular não pode ser vazio');
          }else{
            this.segmentCliked(4);
          }
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPass4= () => {
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

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          const email = this.state.email;

          if(email.length === 0){
            Alert.alert('Email não pode ser vazio!');
          }else{
            this.segmentCliked(5);
          }
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // funcao para requisicao post etapa-1  salvarDadosEtapa1 = async () => {...}
  salvarDadosEtapa1 =  async ()=>{

    this.setState({registrandoEtapa1:true});

    const {nome, sobreNome, cpf, nickname, celular, whatsapp,email,senha, id_responsavel}
      = this.state;

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
      
      //this.setState({})
      this.segmentCliked(0);
      this.setState({stateInicio:true, stateCadastro:false})
      this.setState({p1fim:true, registrandoEtapa1:false})
      this.setState({id:response.data.data.id})
      Alert.alert("Primeira etapa cadastrada com sucesso!");

    }else{
      this.segmentCliked(0);
      this.setState({stateInicio:true, stateCadastro:false})
      this.setState({registrandoEtapa1:false})
      Alert.alert('Error: '+response.data.errors);
      //this.setState({p1fim:true})
    }
    
  }

  exibirSenha = () => {
    this.setState({showSenha: !this.state.showSenha})
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
          this.setState({senhaVerificador:text})
        }}
        value={this.state.senhaVerificador}
        secureTextEntry={true} />

        </View>

        <TouchableOpacity style={{
          marginTop:20,
          marginHorizontal:30,
          backgroundColor:'#15a1f8',
          height:42,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:40,
        }}
         onPress={
           //const {senha, senhaVerificador} = this.state;
           //this.salvarDadosEtapa1
           ()=>{
             const {senha, senhaVerificador} = this.state;
             if(senha.length === 0){
              Alert.alert('Senha não pode ficar vazio!');
             }else{
                if(senha !== senhaVerificador){
                  Alert.alert('Desculpe, mas as senhas não estão iguais!');
                }else{
                  this.salvarDadosEtapa1();
                }
             }
           }
         }>
          { !this.state.registrandoEtapa1 && <Text style={{
            color:'#fff',
            fontSize:18,
            fontWeight:'bold'
          }}>
            Salvar
          </Text> }
          { this.state.registrandoEtapa1 && <View>
            <Progress.CircleSnail size={30} color={'#fff'} />
          </View> }
        </TouchableOpacity>
      </View>
    );
  }

  // segunda etada

  obterDadosViaCep =   (cep) => {
      const response =  api.get(
        baseURL='https://viacep.com.br/ws/75256508/json/',
      )
      Alert.alert(JSON.stringify(response));
  }

  renderPass6 = () => {
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

        </View>

        <View style={{
          backgroundColor:'#fff',
          marginHorizontal:20,
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginTop:20,
        }}>

          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              fontSize:22,
              color:'#000',
              marginTop:10
            }}>Informe o teu endereco:</Text>
          </View>

          <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="CEP"
            onChangeText={(text)=>{
              this.setState({cep:text})
              //this.obterDadosViaCep()
            }}
            value={this.state.cep}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="País"
            onChangeText={(text)=>{
              this.setState({pais:text})
            }}
            value={this.state.pais}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Estado"
            onChangeText={(text)=>{
              this.setState({estado:text})
            }}
            value={this.state.estado}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Cidade"
            onChangeText={(text)=>{
              this.setState({cidade:text})
            }}
            value={this.state.cidade}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Bairro"
            onChangeText={(text)=>{
              this.setState({bairro:text})
            }}
            value={this.state.bairro}
            />

            <TextInput
            style={{
              paddingBottom:0,
              borderBottomColor:'#d2d2d2',
              borderBottomWidth:0.8,
              marginHorizontal:20,
              marginTop:10,
            }} 
            placeholder="Endereço"
            onChangeText={(text)=>{
              this.setState({endereco:text})
            }}
            value={this.state.endereco}
            />

            <View style={{
              flexDirection:'row',
              marginBottom:30,
            }}>
              <TextInput
              style={{
                flex:1,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20,
                marginTop:10,
              }} 
                    placeholder="Núm. (Opc)"
              onChangeText={(text)=>{
                this.setState({numero:text})
              }}
              value={this.state.numero}
              />

              <TextInput
              style={{
                flex:2,
                paddingBottom:0,
                borderBottomColor:'#d2d2d2',
                borderBottomWidth:0.8,
                marginHorizontal:20,
                marginTop:10,
              }} 
              placeholder="Compl. (Opcional)"
              onChangeText={(text)=>{
                this.setState({complemento:text})
              }}
              value={this.state.complemento}
              />

            </View>
            

        </View>

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          const {pais, estado, cidade, bairro, endereco, cep } = this.state;
          if(pais.length === 0 || estado.length === 0 || cidade.length === 0 || bairro.length === 0 || endereco.length === 0 || cep.length === 0){
            Alert.alert("Campo(s) vazio(s)");
          } else {
            this.segmentCliked(8);
          }
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPass7 = () => {
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

        </View>

        <View style={{
          backgroundColor:'#fff',
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginHorizontal:20,
          marginTop:20,
        }}>

        <View style={{
          alignItems:'center',
          justifyContent:'center',
          }}>
          <Text style={{color:'#000', marginTop:10, fontSize:22}}>Qual a sua data</Text>
          <Text style={{color:'#000', fontSize:22}}>de nascimento?</Text>
        </View>

        <TextInput placeholder="xx/xx/xxxx"
          style={{
            marginBottom:30,
            marginHorizontal:20,
            paddingBottom:0,
            borderBottomColor:'#d2d2d2',
            borderBottomWidth:0.8,
          }} 
          onChangeText={(text)=>{
            this.setState({dataNascimento:text})
          }}
          value={this.state.dataNascimento}/>

        </View>

        <TouchableOpacity style={{
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          const dataNascimento = this.state.dataNascimento;
          if(dataNascimento.length === 0){
            Alert.alert('Data Nascimento não pode ficar vazio!');
          }else{
            this.segmentCliked(8);
          }
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPass8 = () => {
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
            <Text style={{color:'#fff',fontWeight:'bold'}}>3</Text>
          </View>

        </View>

        <View style={{
          marginTop:20,
          backgroundColor:'#fff',
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginHorizontal:20
        }}>

        <View style={{
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{
            color:'#000',
            fontSize:22,
            marginTop:10,
          }}>Qual a sua nacionalidade?</Text>
        </View>

        <TextInput style={{
          marginBottom:30,
          marginTop:10,
          paddingBottom:0,
          borderBottomColor:'#d2d2d2',
          borderBottomWidth:0.8,
          marginHorizontal:20
        }}
        placeholder="Nacionalidade (Opcional)"
        onChangeText={(text)=>{
          this.setState({nacionalidade:text})
        }}
        value={this.state.nacionalidade}/>

        </View>

        <View style={{
          marginTop:20,
          backgroundColor:'#fff',
          borderColor:'#d2d2d2',
          borderWidth:0.8,
          marginHorizontal:20
        }}>

        <View style={{
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{
                      color:'#000',
                      fontSize:22,
                      marginTop:10,
                    }}>Qual o seu sexo?</Text>
        </View>

        <View style={{
          marginTop:20,
          flexDirection:'row',
          marginBottom:30,
          justifyContent:'space-around',
          marginHorizontal:20,
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
            marginRight:15,
            marginLeft:200,
            marginTop:30,
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#15a1f8',
            height:42,
        }} onPress={()=>{
          this.segmentCliked(9);
        }}>
          <Text style={{
            color:'#fff',
            fontSize:18
          }}>AVANÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*
  // funcao para registrar foto na aws s3
  salvarDadosEtapa2 = () => {
    
    this.setState({registrandoEtapa2:true});
    const fotoSource = this.state.imageSource;
    //Alert.alert(fotoSource)

    if(fotoSource === "https://s3.amazonaws.com/imagem-ilumino-comercio/photos/user.png"){
      //this.setState({fotoPath:fotoSource})
      this.salvarColaboradorEtapa2();
    }else {
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
            this.salvarColaboradorEtapa2();
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

  salvarDadosEtapa2 = ()=> {
    this.setState({registrandoEtapa2:true});
    this.salvarColaboradorEtapa2();
  }

  takePicCam(){
    const options = {
      quality:0.5,
    }
    ImagePicker.launchCamera(options, (response)=>{
      if(response.didCancel){

      }else if(response.error){

      }else{
        //this.setState({imageSource:response.uri, name: response.fileName, type:'image/png'});
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
        const base64 = `data:image/jpeg;base64,${response.data}`;
        this.setState({imageSource:base64});
      }
    })
  }

  // funcao para requisisao segunda-etapa salvarColaboradorEtapa2 = async () => {...}
  salvarColaboradorEtapa2 = async () => {
    const {id, sexo, nacionalidade, dataNascimento, fotoPath, imageSource,
    pais, estado, cidade, bairro, endereco, cep, numero, complemento, horarioTrabalho} = this.state;

      const response = await api.post(
        '/api/colaborador/cadastrar-colaborador-segunda-etapa/',
        {
          id:id,
          sexo:sexo,
          nacionalidade:nacionalidade,
          dataNascimento:dataNascimento,
          fotoPath:imageSource,
          endereco:{
            pais:pais,
            estado:estado, cidade:cidade,bairro:bairro,
            endereco:endereco, cep:cep, numero:numero, complemento:complemento
          },
          horarioTrabalho:horarioTrabalho,
        },
        Headers={
          "Content-Type":"application/json"
        }
      );
      if(response.ok){
        this.segmentCliked(0);
        this.setState({stateInicio:true, stateCadastro:false})
        this.setState({p2fim:true, registrandoEtapa2:false})
        Alert.alert('Cadastro segunda etapa finalizado!!');
      }else{
        this.segmentCliked(0);
        this.setState({stateInicio:true, stateCadastro:false})
        this.setState({registrandoEtapa2:false})
        Alert.alert('Erro: '+response.data.errors)
      }
  }

  renderPass9 = () => {
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
      }}>Para perfil (Opcional).</Text>
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

        <TouchableOpacity style={{
          marginTop:20,
          marginHorizontal:30,
          backgroundColor:'#15a1f8',
          height:42,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:40,
        }}
         onPress={
           this.salvarDadosEtapa2
         }>
          { !this.state.registrandoEtapa2 && <Text style={{
            color:'#fff',
            fontSize:18,
            fontWeight:'bold'
          }}>
            Salvar
          </Text> }
          { this.state.registrandoEtapa2 && <View>
            <Progress.CircleSnail size={30} color={'#fff'} />
          </View> }
        </TouchableOpacity>
      </View>
    );
  }

  // tela inicial
  renderPassInicio = () => {
    return(
      <View>
        
        <View style={{
              backgroundColor:'#15a1f8',
              //flex:1,
              //height:200,
              borderTopColor:'#fff',
              borderTopWidth:1,
              alignItems:'center',
            }}>
              <Text style={{marginRight: 15, marginLeft: 30, marginTop: 15, fontSize: 40, fontWeight: 'bold', color:'#fff', marginBottom:20}}>
                Vamos te ajudar a se cadastrar como Colaborador iLúmino
              </Text>
        </View>

            <View style={{
              flex:1, backgroundColor:'#fff',
              //height:150,
              marginHorizontal:20,
              marginTop:20,
              borderWidth:1, borderColor:'#d2d2d2'
              }}>
              <View style={{
                alignItems:'center', justifyContent:'center'
              }}>
                <Text style={{
                  color:'#000', fontSize:22, marginTop:10,
                }}>Dados para login:</Text>
              </View>
              <View style={{
                flexDirection:'row',
                marginTop:5,
                marginHorizontal:60
              }}>
              </View>

              <View style={{height:60}}></View>

              { !this.state.p1fim && 
              <TouchableOpacity onPress={
                this.redirecionarParte1
              } style={ {
                backgroundColor:'#15a1f8',
                height:42,
                alignItems:'center', justifyContent:'center',
                marginHorizontal:60, marginTop:10, marginBottom:15,
                borderRadius:40,
              }}>
                <Text style={{
                  fontSize:18, fontWeight:'bold', color:'#fff'
                }}>Começar</Text>
              </TouchableOpacity>}

              { this.state.p1fim && 
              <TouchableOpacity onPress={
                this.redirecionarEditar1
              } style={ {
                backgroundColor:'#68D468',
                height:42,
                alignItems:'center', justifyContent:'center',
                marginHorizontal:60, marginTop:10, marginBottom:15,
                borderRadius:40,
              }}>
                <Text style={{
                  fontSize:18, fontWeight:'bold', color:'#fff'
                }}>Editar</Text>
              </TouchableOpacity>}


            </View>

            <View style={{
              flex:1, backgroundColor:'#fff',
              //height:150,
              marginHorizontal:20,
              marginTop:20,
              borderWidth:1, borderColor:'#d2d2d2'
              }}>
              <View style={{
                alignItems:'center', justifyContent:'center'
              }}>
                <Text style={{
                  color:'#000', fontSize:22, marginTop:10,
                }}>Informações adicionais:</Text>
              </View>
              <View style={{
                flexDirection:'row',
                marginTop:5,
                marginHorizontal:60
              }}>
              </View>

              <View style={{height:60}}></View>
              
              { !this.state.p2fim && 
              <TouchableOpacity onPress={
                this.redirecionarParte2
              } style={ {
                backgroundColor:'#15a1f8',
                height:42,
                alignItems:'center', justifyContent:'center',
                marginHorizontal:60, marginTop:10, marginBottom:15,
                borderRadius:40,
              }}>
                <Text style={{
                  fontSize:18, fontWeight:'bold', color:'#fff'
                }}>Começar</Text>
              </TouchableOpacity>}

              { this.state.p2fim && 
              <TouchableOpacity onPress={
                this.redirecionarEditar2
              } style={ {
                backgroundColor:'#68D468',
                height:42,
                alignItems:'center', justifyContent:'center',
                marginHorizontal:60, marginTop:10, marginBottom:15,
                borderRadius:40,
              }}>
                <Text style={{
                  fontSize:18, fontWeight:'bold', color:'#fff'
                }}>Editar</Text>
              </TouchableOpacity>}
              
            </View>

          <TouchableOpacity style={{
            marginHorizontal:20,
            marginBottom:20,
            marginTop:20,
            backgroundColor:'#15a1f8',
            borderRadius:5,
            height:42,
            alignItems:'center', justifyContent:'center'
          }}
          onPress={
            this.finalizar
          }>
            <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>Finalizar</Text>
          </TouchableOpacity>  

          <TouchableOpacity onPress={
            this.exibirModal
          }>
          <View style={{
            flexDirection:'row',
            marginHorizontal:20,
          }}>
            <CheckBox size={20} checked={this.state.condicao}/>
            <Text style={
              [this.state.condicao ? {
                color:'#15a1f8',
                marginLeft:15,
                marginRight:15,
              }:{
                marginLeft:15,
                marginRight:15,
              }]
            }>Li e concordo com os termos e condições de uso</Text>
          </View>
          </TouchableOpacity> 
      </View>
    );
  }

  renderPass = () => {
    if(this.state.activeIndex == 0){
      return(
        <View navigate={this.navigate} navigation={this.navigation}>
          {this.renderPassInicio() }
        </View>
      );
    } else if(this.state.activeIndex == 1){
      return(
        <View>
          {this.renderPass1()}
        </View>
      );
    } else if(this.state.activeIndex == 2){
      return(
        <View>
          {this.renderPass2()}
        </View>
      );
    } else if(this.state.activeIndex == 3){
      return(
        <View>
          {this.renderPass3()}
        </View>
      );
    } else if(this.state.activeIndex == 4){
      return(
        <View>
          {this.renderPass4()}
        </View>
      );
    } else if(this.state.activeIndex == 5){
      return(
        <View>
          {this.renderPass5()}
        </View>
      );
    } else if(this.state.activeIndex == 6){
      return(
        <View>
          {this.renderPass6()}
        </View>
      );
    } else if(this.state.activeIndex == 7){
      return(
        <View>
          {this.renderPass7()}
        </View>
      );
    } else if(this.state.activeIndex == 8){
      return(
        <View>
          {this.renderPass8()}
        </View>
      );
    } else if(this.state.activeIndex == 9){
      return(
        <View>
          {this.renderPass9()}
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


        <Modal isVisible={this.state.modalVisivel}
            //animationIn="zoomInDown"
            //animationOut="zoomOutUp"
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            //backdropColor={'red'}
            backdropOpacity={0.5}
            backdropTransitionInTiming={2500}
            backdropTransitionOutTiming={2500}
            scrollOffsetMax={500 - 200}
            onBackdropPress={
              ()=>{
                this.setState({modalVisivel: !this.state.modalVisivel})
              }
            }
            //style={{ // modal em baixo
              //margin:0,
              //justifyContent:'flex-end',
            //}}>
            >
            <View style={{
              backgroundColor:'#fff',
              paddingBottom:5,
              paddingTop:20,
              borderRadius:5,
              justifyContent:'center',
              //alignItems:'center'
            }}>
              <View style={{
                alignItems:'center'
              }}>
                <Text style={{
                  color:'#000',
                  fontWeight:'bold',
                  fontSize:18,
                }}>Termos e condições de uso</Text>
              </View>

              <View style={{
                marginTop:10,
                marginBottom:10,
                marginHorizontal:20,
              }}>
                <Text>
                Seus sonhos profissionais quando colocados no papel, 
                te fazem enxergar o melhor caminho profissional a percorrer 
                e a traçar metas e objetivos concretos para que se alcance 
                o resultado esperado. Neste painel, traremos dicas rápidas 
                e eficientes para que você estabeleça um planejamento de 
                carreira e atinja o tão desejado sucesso.
                </Text>
              </View>

              <View style={{
                flexDirection:'row'
              }}>


              <TouchableOpacity
                onPress={
                  this.aceitoCondicao
                }
                style={{
                  backgroundColor: "#15a1f8",
                  margin: 10,
                  heigth:42,
                  padding:10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  flex:1,
                  marginLeft:20,
                }}>
                <Text style={{
                  color:'#fff',
                  fontSize:14,
                }}>Aceito</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  this.naoAceitoCondicao
                }
                style={{
                  backgroundColor: "#15a1f8",
                  margin: 10,
                  heigth:42,
                  padding:10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  flex:1,
                  marginRight:20,
                }}>
                <Text style={{
                  color:'#fff',
                  fontSize:14,
                }}>Não aceito</Text>
              </TouchableOpacity>

              </View>
              
              
            </View>
          </Modal>

          <ScrollView style={{
            backgroundColor:'#f2f2f2',
          }}>
          <View style={{
            flex:1,
            backgroundColor:'#f2f2f2',
            marginBottom:20,
          }}>

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
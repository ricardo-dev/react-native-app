import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Platform, TouchableOpacity, View, AsyncStorage, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Left, Body, Right, Content, CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

class inicioCadastroUsuario extends Component {

  static navigationOptions = {
    header: null,
  }

  state = {
    modalVisivel:false,
    aceito:false,
    idColaborador:'',
  }

  componentDidMount(){
    this.props.saveCol(obj={idColaborador : -1})
    //const idc = await AsyncStorage.getItem('@iLuminoApp:idColaborador');
    //if(idc)
      //this.setState({idColaborador:idc});
  }

  aceitoCondicao = ()=>{
    this.setState({modalVisivel:false, aceito:true})
    this.props.navigation.navigate('Passo11');
  }

  naoAceitoCondicao = ()=>{
    this.setState({modalVisivel:false, aceito:false})
  }

  Voltar = () => {
    this.props.navigation.goBack();
  }

  cadastroColaboradorPasso1 = ()=>{
    if(this.state.aceito){
      this.props.navigation.navigate('Passo11');
    }else{
      this.setState({modalVisivel:true});
    }
  }

  cadastroColaboradorPasso2 = async ()=>{
    //const idc = await AsyncStorage.getItem('@iLuminoApp:idColaborador');
    //if(idc)
    if(this.props.idColaborador === -1)
      Alert.alert('Etapa 1 não finalizada!')
    else
      this.props.navigation.navigate('Passo21',{data:{idColaborador:this.props.idColaborador}});
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

        <ScrollView>
        <View style={{
          backdropColor:'transparent',
          alignItems:'center',
        }}>
            <Text style={{
                marginRight: 15, 
                marginLeft: 30, 
                marginTop: 5, 
                fontSize: 40, 
                fontWeight: '100', 
                color:'#fff', 
                marginBottom:20}}>
              Seja Bem vindo ao cadastro Colaborador!
              Vamos te ajudar a se cadastrar no nosso sistema.
            </Text>
        </View>
        <View style={{
          backgroundColor:'#f2f2f2',
          borderRadius:3,
          marginTop:10,
          marginHorizontal:20,
          paddingVertical:10,
          paddingHorizontal:10,
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              color:'#000',
              fontSize:20,
            }}>
              Dados para login:
            </Text>
          </View>
          <View style={{height:30}}>

          </View>
          <View>
            <TouchableOpacity
              onPress={this.cadastroColaboradorPasso1}
              style={{
                backgroundColor:'#15a1f8',
                justifyContent:'center',
                alignItems:'center',
                height:40,
                marginHorizontal:40,
                borderRadius:20,
              }}>
              <Text
                style={{
                  color:'#000',
                  fontSize:16
                }}
              >Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          backgroundColor:'#f2f2f2',
          borderRadius:3,
          marginTop:20,
          marginHorizontal:20,
          paddingVertical:10,
          paddingHorizontal:10,
        }}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Text style={{
              color:'#000',
              fontSize:20,
            }}>
              Informações adicionais
            </Text>
          </View>
          <View style={{height:30}}>

          </View>
          <View>
            <TouchableOpacity
              onPress={this.cadastroColaboradorPasso2}
              style={{
                backgroundColor:'#15a1f8',
                justifyContent:'center',
                alignItems:'center',
                height:40,
                marginHorizontal:40,
                borderRadius:20,
              }}>
              <Text
                style={{
                  color:'#000',
                  fontSize:16
                }}
              >Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
            flexDirection:'row',
            marginHorizontal:20,
            marginTop:10,
          }}>
            <CheckBox size={20} checked={this.state.aceito}/>
            <Text style={
              [this.state.aceito ? {
                color:'#fff',
                marginLeft:15,
                marginRight:15,
              }:{
                color:'#fff',
                marginLeft:15,
                marginRight:15,
              }]
            }>Li e concordo com os termos e condições de uso</Text>
        </View>
        <TouchableOpacity style={{
              marginHorizontal:20,
              marginTop:15,
              backgroundColor:'#68D468',
              borderRadius:5,
              height:42,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{color:'#fff', fontSize:18}}>Finalizar</Text>
        </TouchableOpacity>
       
       <View style={{height:50}}/>
        </ScrollView>
        </ImageBackground>


        <Modal 
            isVisible={this.state.modalVisivel}
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
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    idColaborador: state.idColaborador,
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveCol : (obj)=> dispatch({type:'SAVE_COL', payload:obj}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (inicioCadastroUsuario);
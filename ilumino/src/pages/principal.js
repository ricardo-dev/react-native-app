import React, { Component } from 'react';
import {
  StyleSheet, Alert, Text, Image, View, Platform, ToastAndroid, TextInput, ScrollView, TouchableOpacity, AsyncStorage,
  ImageBackground, NetInfo, Dimensions, ActivityIndicator
} from 'react-native';
import { Drawer, Container, Content, Header, Left, Right, Body, Button, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MainContent from './mainContent';
import { StackActions, NavigationActions } from 'react-navigation';
import SiderBarPublico from '../menu/siderBarPublico';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Modal from 'react-native-modal';

let scrollYPos = 0;

export default class Principal extends Component {

  dialogoCheckGps = ()=>{
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({})
          .then(data=>{
              //Alert.alert(data)
              this.capturarPosicao();
          })
          .catch(error => {
              Alert.alert(`Error: ${error.message} - Code: ${error.error}`);
          })
  }

  capturarPosicao = ()=>{
    this.setState({loading:true});
    
    navigator.geolocation.getCurrentPosition(
        ({coords:{latitude, longitude}})=>{
            this.setState({
                //maps:true,
                //region:{
                    latitude,
                    longitude,
                    //latitudeDelta:0.0143,
                    //longitudeDelta:0.0134,
                //},
                //endereco:'Meu local',
                loading:false,
            })
        },
        error => { Alert.alert(error.message);
                    this.setState({loading:false})},
        {
            enableHighAccuracy:true, timeout:20000,
            maximumAge:1000,
        },
    );
}

mainPos = ()=> {
  this.setState({
    latitude:-16.6869,
    longitude:-49.2648,
  })
}

  scrollToTop = () => {
    this.scroller.scrollTo({ x: 0, y: 0 });
  }

  state = {
    modalFiltro:false,
    modalVisible:false,
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    status: true,
    palavraChave: '',
    latitude: -16.6869,//-16.648574,
    longitude: -49.2648,//-49.148919,
    checkEstabelecimento: true,
    checkProduto: false,
    checkMoeda: false,
    procurar: '',
    perto: true,
    endereco: false,
    rota: false,

    modalEstabelecimento:false,
    modalUsuario:false,
    modalColaborador:false,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.verifyConnectionStatus();
    //this.dialogoCheckGps();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
  }

  verifyConnectionStatus = () => {
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        if (isConnected === false) {
          this.setState({ status: false });
        } else {
          this.setState({ status: true });
        }
      }
    );
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible});
  }

  selecionarEstabelecimento = () => {
    this.setState({ checkEstabelecimento: !this.state.checkEstabelecimento });
  }

  selecionarProduto = () => {
    this.setState({ checkProduto: !this.state.checkProduto });
  }

  selectionarMoeda = () => {
    this.setState({ checkMoeda: !this.state.checkMoeda });
  }

  selecionarPerto = () => {
    this.setState({ perto: true, endereco: false, rota: false });
  }

  selecionarEndereco = () => {
    this.setState({ perto: false, endereco: true, rota: false });
  }

  selecionarRota = () => {
    this.setState({ perto: false, endereco: false, rota: true });
  }

  loginTela = () => {
    //this.props.navigation.navigate('Login');
    this.props.navigation.navigate('PreLogin');
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={20}
        style={{ color: tintColor }} />
    )
  };

  closeDrawer = () => {
    this.drawer._root.close();
  }

  openDrawer = () => {
    this.drawer._root.open();
  }

  abrirMenu = () => {
    this.openDrawer();
  }

  funcaoBtnMoeda = async () => {
    const token = await AsyncStorage.getItem('@iLuminoApi:token');
    if (token) {
      this.props.navigation.navigate('MoedaPag');
    } else {
      Alert.alert('Desculpe, necessário estar autenticado para esta opção!');
    }
  }

  direcionarBusca = () => {
    const { palavraChave, latitude, longitude } = this.state;
    if (palavraChave.length === 0) {
      ToastAndroid.show('Entrada Vazia!', 1);
    } else {
      this.props.navigation.navigate('Comercio', { palavra: { palavraChave, latitude, longitude, categoria: '' } });
    }
  }

  direcionarCategoria = (categoria) => {
    const palavraChave = categoria;
    const { latitude, longitude } = this.state;
    //Alert.alert(categoria);
    this.props.navigation.navigate('Comercio', { palavra: { palavraChave, latitude, longitude, categoria: true } });
  }

  direcionarListaCategoria = () => {
    //Alert.alert('Ha!');
    this.props.navigation.navigate('ListaCategorias');
  }

  direcionarSaibaMais = () => {
    //Alert.alert('Saiba mais!');
    this.props.navigation.navigate('SaibaMais');
  }

  setPalavraChave = (text) => {
    const {latitude, longitude} = this.state;
    this.setState({ palavraChave: text });
    this.props.navigation.navigate('Comercio', { palavra: { palavraChave:text, latitude, longitude, categoria: '' } });
  }

  render() {
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<SiderBarPublico navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer}
      >

        <Container >
          <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} source={require('../assets/bg/BG.png')}>
            <ScrollView style={{ flex: 1 }} ref={(scroller) => this.scroller = scroller}>
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
                    onPress={this.abrirMenu}
                    hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
                    <Ionicon name='ios-menu' size={28} color='#fff' />
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
                  <View style={{flexDirection:'row'}}>
                    {/*<Image source={require('../assets/icon/moeda.png')} />*/}
                    <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>$0,00</Text>
                  </View>
                  
                  <Text style={{ fontSize: 14, color: '#fff' }}>saldo iLúmino</Text>
                </View>
                <View style={{
                  flex: 1,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                  <TouchableOpacity
                    style={{ marginRight: 20, }}
                    onPress={this.loginTela}
                    hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
                    <Icon name="user-o" color="white" size={25} />
                  </TouchableOpacity>
                </View>

              </View>


              <View style={{
                marginTop: 20, flexDirection: 'row',
                marginHorizontal: 20,
                backgroundColor: '#fff', borderRadius: 10,
                borderWidth: 0.5, borderColor: '#ddd',
                height: 50,
              }}>
                <TextInput style={{
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                  alignSelf: 'stretch', flex: 2,
                }}
                  placeholder="O quê você está procurando?"
                  value={this.state.palavraChave}
                  onChangeText={(text) => {
                    this.setState({ palavraChave: text });
                  }} />
                <TouchableOpacity onPress={
                  this.direcionarBusca
                }>
                  <Text
                    style={{
                      alignItems: 'flex-end',
                      marginRight: 20,
                      marginTop: 13,
                      borderLeftWidth: 1,
                      borderLeftColor: '#292929',
                      paddingLeft: 5,
                      height: 20,
                    }} >Ok</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={
                  ()=>this.setState({modalFiltro:true})
                }>
                  <Text
                    style={{
                      alignItems: 'flex-end',
                      marginRight: 20,
                      marginTop: 13,
                      borderLeftWidth: 1,
                      borderLeftColor: '#292929',
                      paddingLeft: 5,
                      height: 20,
                    }} >Filtros</Text>
                </TouchableOpacity>

              </View>
              <View>
                <ScrollView
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>

                  <TouchableOpacity onPress={()=>this.setPalavraChave('Mercados')}>
                    <View style={{ marginHorizontal: 5, borderRadius: 10, backgroundColor: '#15a1f8', paddingHorizontal: 8, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#fff', }}>Mercados</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.setPalavraChave('Quitandas')}>
                    <View style={{ marginHorizontal: 5, borderRadius: 10, backgroundColor: '#15a1f8', paddingHorizontal: 8, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#fff', }}>Quitandas</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.setPalavraChave('Loja de roupas')}>
                    <View style={{ marginHorizontal: 5, borderRadius: 10, backgroundColor: '#15a1f8', paddingHorizontal: 8, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#fff', }}>Loja de Roupas</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.setPalavraChave('Padaria')}>
                    <View style={{ marginHorizontal: 5, borderRadius: 10, backgroundColor: '#15a1f8', paddingHorizontal: 8, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#fff', }}>Padaria</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.setPalavraChave('Restaurantes')}>
                    <View style={{ marginHorizontal: 5, borderRadius: 10, backgroundColor: '#15a1f8', paddingHorizontal: 8, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#fff', }}>Restaurantes</Text>
                    </View>
                  </TouchableOpacity>


                </ScrollView>
              </View>
              <View style={{
                marginTop: 30,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                onPress={()=>this.setState({modalEstabelecimento:true})}>
                  <View style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <Image source={require('../assets/icon/comerciantes.png')} />
                  </View>
                  <Text style={{ color: '#fff', marginTop: 10 }}>GANHE CADASTRANDO O SEU NEGÓCIO!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>this.setState({modalUsuario:true})}>
                  <View style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image source={require('../assets/icon/usuarios.png')} />
                  </View>
                  <Text style={{ color: '#fff', marginTop: 10 }}>GANHE DIVULGANDO NEGÓCIOS!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>this.setState({modalColaborador:true})}>
                  <View style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image source={require('../assets/icon/colaboradores.png')} />
                  </View>
                  <Text style={{ color: '#fff', marginTop: 10 }}>GANHE COLABORANDO!</Text>
                </TouchableOpacity>

              </View>
              <View style={{ height: 30 }} />
            </ScrollView>
            {/*<MainContent navigation={this.props.navigation}/>*/}
          </ImageBackground>



          <Modal
            isVisible={this.state.loading}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            backdropColor={'#000'}
            backdropOpacity={0.2}
            >
              <View style={{
                alignSelf:'center',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#f2f2f2',
                height:100,
                width:200,
                borderRadius:20,
              }}>
                <Text style={{marginBottom:5}}>Aguarde só um instante...</Text>
                <ActivityIndicator size={'large'} color={'#15a1f8'}/>
              </View>
          </Modal>

          <Modal
            isVisible={this.state.modalFiltro}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            backdropColor={'#000'}
            backdropOpacity={0.2}
            >
              <View style={{
                alignSelf:'center',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#f2f2f2',
                height:100,
                width:200,
                borderRadius:20,
              }}>
                <Text style={{
                  fontWeight:'bold'
                }}>Filtros</Text>
                <TouchableOpacity onPress={()=>{
                  this.setState({modalFiltro:false});
                  this.dialogoCheckGps();
                }}
                style={{
                  marginTop:10
                }}>
                  <Text>Perto de mim</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  this.setState({modalFiltro:false});
                  this.mainPos();
                }}
                style={{
                  marginTop:10
                }}>
                  <Text>Sem filtro</Text>
                </TouchableOpacity>
              </View>
          </Modal>

          <Modal
            isVisible={this.state.modalEstabelecimento}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={600}
            animationOutTiming={600}
            onBackdropPress={()=>this.setState({modalEstabelecimento:false})}
          >
            
              <View style={{
                //flex:1,
                marginTop:20,
                marginBottom:30,
                marginHorizontal:20,
                backgroundColor:'#38B7BA',
                borderRadius:10,
              }}>
                  <View style={{
                      justifyContent:'center',
                      alignItems:'center',
                      marginTop:15,
                      marginHorizontal:10,
                  }}>
                    <Image source={require('../assets/icon/comerciantes.png')} />
                  </View>

                  <View style={{
                    marginBottom:20,
                    marginTop:20,
                    marginHorizontal:10,
                    backgroundColor:'#f2f2f2',
                  }}>

                    <View style={{
                      marginHorizontal:5,
                      height:150,
                    }}>

                    </View>

                    <TouchableOpacity onPress={()=>{
                        this.setState({modalEstabelecimento:false})
                        //TODO - direcionar para outros lugares
                    }}
                    style={{
                      marginHorizontal:5,
                      backgroundColor:'#68D468',
                      height:42,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:10,
                      marginBottom:10,
                      marginTop:20,
                    }}>
                      <Text style={{color:'#fff'}}>CADASTRAR O MEU NEGÓCIO</Text>
                    </TouchableOpacity>

                  </View>
              </View>
              
          </Modal>

          <Modal
            isVisible={this.state.modalUsuario}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={600}
            animationOutTiming={600}
            onBackdropPress={()=>this.setState({modalUsuario:false})}
          >
            
              <View style={{
                //flex:1,
                marginTop:20,
                marginBottom:30,
                marginHorizontal:20,
                backgroundColor:'#38B7BA',
                borderRadius:10,
              }}>
                  <View style={{
                      justifyContent:'center',
                      alignItems:'center',
                      marginTop:15,
                      marginHorizontal:10,
                  }}>
                    <Image source={require('../assets/icon/usuarios.png')} />
                  </View>

                  <View style={{
                    marginBottom:20,
                    marginTop:20,
                    marginHorizontal:10,
                    backgroundColor:'#f2f2f2',
                  }}>

                    <View style={{
                      marginHorizontal:5,
                      height:150,
                    }}>

                    </View>

                    <TouchableOpacity onPress={()=>{
                        this.setState({modalUsuario:false})
                        //TODO - direcionar para outros lugares
                    }}
                    style={{
                      marginHorizontal:5,
                      backgroundColor:'#68D468',
                      height:42,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:10,
                      marginBottom:10,
                      marginTop:20,
                    }}>
                      <Text style={{color:'#fff'}}>CADASTRAR</Text>
                    </TouchableOpacity>

                  </View>
              </View>
              
          </Modal>

          <Modal
            isVisible={this.state.modalColaborador}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={600}
            animationOutTiming={600}
            onBackdropPress={()=>this.setState({modalColaborador:false})}
          >
            
              <View style={{
                //flex:1,
                marginTop:20,
                marginBottom:30,
                marginHorizontal:20,
                backgroundColor:'#38B7BA',
                borderRadius:10,
              }}>
                  <View style={{
                      justifyContent:'center',
                      alignItems:'center',
                      marginTop:15,
                      marginHorizontal:10,
                  }}>
                    <Image source={require('../assets/icon/colaboradores.png')} />
                  </View>

                  <View style={{
                    marginBottom:20,
                    marginTop:20,
                    marginHorizontal:10,
                    backgroundColor:'#f2f2f2',
                  }}>

                    <View style={{
                      marginHorizontal:5,
                      height:150,
                    }}>

                    </View>

                    <TouchableOpacity onPress={()=>{
                        this.setState({modalColaborador:false})
                        //TODO - direcionar para outros lugares
                    }}
                    style={{
                      marginHorizontal:5,
                      backgroundColor:'#68D468',
                      height:42,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:10,
                      marginBottom:10,
                      marginTop:20,
                    }}>
                      <Text style={{color:'#fff'}}>CADASTRAR</Text>
                    </TouchableOpacity>

                  </View>
              </View>
              
          </Modal>

        </Container>

      </Drawer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  androidHeader: {
    ...Platform.select({
      android: {
        backgroundColor: 'transparent',
      }
    })
  },
  androidHeaderTitle: {
    ...Platform.select({
      android: {
        alignItems: 'flex-end',
      }
    })
  },
});
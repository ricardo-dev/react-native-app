import React, { Component } from 'react';
import { StyleSheet, Alert, ActivityIndicator,AsyncStorage, Image,Text, TextInput, View, Platform, ToastAndroid, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Drawer, Header, Container, Left, Right, Body } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import MainContent from './mainContent';
import SiderBarColaborador from '../menu/siderBarColaborador';
import api from '../services/api';
import {connect} from 'react-redux';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Modal from 'react-native-modal';

class PrincipalCol extends Component {

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

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' size={20}
        style={{ color: tintColor }}></Icon>
    )
  };

  state = {
    loading:false,
    palavraChave:'',
    latitude: -16.6869,//-16.648574,
    longitude: -49.2648,//-49.148919,

    modalFiltro:false,
  }

  async componentDidMount() {
    const id = await AsyncStorage.getItem("@iLuminoApi:id");
    if (id) {
      //Alert.alert(id);
      const response = await api.get(
        `/api/colaborador/colaborador-id/${id}`,
        Headers = {
          "content-type": "application/json",
        }
      );

      if (response.ok) { // await
        try {
          const {sobreNome, cpf, nickname, celular, whatsapp, email, dataNascimento, nacionalidade, sexo} = response.data.data;
          const {pais, estado, cidade, bairro, endereco, complemento, numero, cep} = response.data.data.endereco;
          this.props.getCol(obj={
            sobreNome, cpf, nickname, celular, whatsapp, email, dataNascimento, nacionalidade, sexo,
            pais, estado, cidade, bairro, endereco, complemento, numero, cep
          })
        } catch (error) {
          Alert.alert(error);
        }

        //Alert.alert(':-'+response.data.data.cpf);
      } else {
        Alert.alert('Favor, verifique sua conexâo com a internet');
      }
    } else {
      Alert.alert('Error');
    }
    //this.dialogoCheckGps();
  }

  logoutTela = async () => {
    
    this.props.logout();
    //this.props.navigation.goBack();

    // logout final: 
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Tabs' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
    //Alert.alert('Prontinho, até mais tarde! :)');

  }

  logoutTelaInicio = () => {
    Alert.alert(
      'Já vai?',
      'Tem certeza que deseja sair? :(',
      [
        { text: 'Não, foi sem querer', onPress: () => console.log('Cancelado!') },
        { text: 'Sim, tenho sim', onPress: () => this.logoutTela() }
      ],
      { cancelable: false }
    )
  }

  // menu 
  closeDrawer = () => {
    this.drawer._root.close();
  }

  openDrawer = () => {
    this.drawer._root.open();
  }

  abrirMenu = () => {
    //Alert.alert('open');
    this.openDrawer();
  }

  direcionarBusca = () => {
    const { palavraChave, latitude, longitude } = this.state;
    if (palavraChave.length === 0) {
      ToastAndroid.show('Entrada Vazia!', 1);
    } else {
      this.props.navigation.navigate('Comercio', { palavra: { palavraChave, latitude, longitude, categoria: '' } });
    }
  }

  setPalavraChave = (text) => {
    const {latitude, longitude} = this.state;
    this.setState({ palavraChave: text });
    this.props.navigation.navigate('Comercio', { palavra: { palavraChave:text, latitude, longitude, categoria: '' } });
  }

  render() {
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<SiderBarColaborador navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer}>
        <Container>
          <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} source={require('../assets/bg/BG.png')}>
            <ScrollView style={{ flex: 1 }}>
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
                  <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>${this.props.saldoiLumino},00</Text>
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
                    onPress={this.logoutTelaInicio}
                    hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
                    <Icon name="sign-out" color="white" size={25} />
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
                
                  <View style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image source={require('../assets/icon/LOGO(1).png')} />
                  </View>                


              </View>
              <View style={{ height: 30 }} />
            </ScrollView>
            {/*<MainContent navigation={this.props.navigation}/>*/}
          </ImageBackground>


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
      }
    })
  },
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

function mapStateToProps(state){
  return{
    saldoiLumino: state.saldoiLumino,
  }
}

function mapDispatchToProps(dispatch){
  return{
    getCol : (obj)=> dispatch({type:'GET_COL', payload:obj}),
    logout : ()=> dispatch({type:'LOGOUT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalCol)
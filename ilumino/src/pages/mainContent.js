import React, { Component } from 'react';
import {
  StyleSheet, AsyncStorage, Text, View, Platform, ToastAndroid, TextInput, Image, ScrollView, TouchableOpacity,
  Alert, NetInfo, ImageBackground
} from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';


export default class Principal extends Component {
  // static navigationOptions = {
  //     title: 'iLumino',
  //     tabBarPosition: 'top',
  // };

  state = {
    status:true,
    palavraChave: '',
    latitude: -16.648574,
    longitude: -49.148919,
    checkEstabelecimento: true,
    checkProduto: false,
    checkMoeda: false,
    procurar: '',
    perto: true,
    endereco: false,
    rota: false,
  };

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.verifyConnectionStatus();
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({status:isConnected});
  }

  verifyConnectionStatus = ()=>{
    NetInfo.isConnected.fetch().done(
      (isConnected)=>{
        if(isConnected === false){
            this.setState({status: false});
        }else{
            this.setState({status: true});
        }
      }
    );
  }

  setModalVisible = (caso) => {
    this.setState({ modalVisible: caso });
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

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={20}
        style={{ color: tintColor }} />
    )
  };

  loginTela = () => {
    this.props.navigation.navigate('Login');
  }

  funcaoFiltro = () => {
    Alert.alert('Filtro');
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

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground style={{flex:1, width:'100%', height:'100%'}} source={require('../assets/bg/BG.png')}>
          <ScrollView>
            <View style={{
              marginTop: 30, flexDirection: 'row',
              marginHorizontal: 10,
              backgroundColor: '#fff', borderRadius: 30,
              borderWidth: 1, borderColor: '#ddd',
              height: 50,
            }}>
              <TextInput style={{
                justifyContent: 'flex-start',
                paddingHorizontal: 15,
                alignSelf: 'stretch', flex: 2,
              }}
                placeholder="O quê você está procurando?"
                onChangeText={(text) => {
                  this.setState({ palavraChave: text });
                }} />
              <TouchableOpacity onPress={
                this.funcaoFiltro
              }>
                <Text 
                  style={{
                    alignItems: 'flex-end', marginRight: 20, marginTop: 13
                  }} >Ok</Text>
              </TouchableOpacity>

            </View>
            <View style={{height:1000}}></View>

          </ScrollView>
          </ImageBackground>
        </Content>

        <Modal
          animationIn='slideInDown'
          animationOut='slideOutUp'
          animationInTiming={1500}
          animationOutTiming={1500}
          backdropColor={'#000'}
          backdropOpacity={0}
          isVisible={!this.state.status}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}>
          <View style={{ backgroundColor: '#000', opacity: 0.9, height: 90, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>Sem conexão com internet </Text>
            <Text style={{fontSize:16, color:'#fff'}}>Por favor, verifique sua conexão com a internet</Text>
          </View>

        </Modal>

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
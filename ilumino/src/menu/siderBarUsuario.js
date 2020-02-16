import React, {Component} from 'react';
import {View, AsyncStorage, ScrollView, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Container, Content, Header, Button, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import {connect} from 'react-redux';

class SiderBarUsuario extends Component {

    constructor(props){
        super(props);
        //this.montarObjeto();
    }

    funcaoSair = () => {
        //Alert.alert('Sair usuario selecionado!');
        this.logoutTelaInicio();
    }
    state = {
        imageSource: null,
        nomeUsuario:'',
    }

    montarObjeto = async ()=>{
        const image = await AsyncStorage.getItem("@iLuminoApi:fotoPath");
        const nome  = await AsyncStorage.getItem("@iLuminoApi:nomeUsuario");
        //const image = this.props.foto;
        //const nome  = this.props.nome;
        this.setState({imageSource:image, nomeUsuario:nome});
    }

    componentDidMount(){
        //this.montarObjeto();   
        //Alert.alert(this.state.imageSource);
        //const image = this.props.foto;
        //const nome = this.props.nome;
        //this.setState({imageSource:image, nomeUsuario:nome});
    }

    logoutTela = async () =>{
        
        this.props.logout();
        // logout final: 
        const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Tabs'})
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
          {text: 'Não, foi sem querer', onPress : () => console.log('Cancelado!')},
          {text: 'Sim, tenho sim', onPress : () => this.logoutTela()}
        ],
        {cancelable: false}
      )
    }

    funcaoEntrar = () => {
        Alert.alert('Entrar selecionado!');
    }

    funcaoHome = () => {
        Alert.alert('Home selecionado!');
    }

    funcaoCategoria = () => {
        //Alert.alert('Categoria selecionado!');
        this.props.navigation.navigate('ListaCategorias');
    }

    refresh = ()=>{
        this.montarObjeto();
        //Alert.alert('Voltei!');
    }

    funcaoMeusDados = () => {
        //Alert.alert('Meus dados selecionado!');
        /*this.props.navigation.navigate('MeusDadosUser',{
            onGoBack: ()=> this.refresh(),
        });*/
        this.props.navigation.navigate('MeusDadosUser');
    }

    funcaoColaborador = () => {
        //Alert.alert('Colaborador selecionado!');
        this.props.navigation.navigate('SejaColaborador');
    }

    funcaoCadastroEstabelecimento = () => {
        //Alert.alert('Estabelecimento selecionado!');
        this.props.navigation.navigate('CadastreSeuNegocio');
    }

    funcaoMoedas = () => {
        //Alert.alert('Moedas selecionado!');
        this.props.navigation.navigate('MoedaPag');
    }

    funcaoSobre = () => {
        //Alert.alert('Sobre selecionado!');
        this.props.navigation.navigate('SobreAIlumino');
    }

    funcaoFaleConosco = () => {
       // Alert.alert('Fale selecionado!');
       this.props.navigation.navigate('FaleConosco');
    }

    funcaoAjuda = () => {
        //Alert.alert('Ajuda selecionado!');
        this.props.navigation.navigate('Ajuda');
    }

    render() {
        //{this.setState({imageSource: this.props.foto, nomeUsuario: this.props.nome});}
        return(
            <View style={{
                flex:1,
                backgroundColor:'#fff',
            }}>
            
            <View style={{
                //height:200,
                backgroundColor:'#fff',
                paddingBottom:10,
                alignItems:'center',
            }}>

            <Image source={{uri : this.props.fotoPath}}
                //source={{uri : this.state.imageSource}}
                style={{
                    width:115, height:115, borderRadius:100,
                    marginTop:20, borderWidth: 2, borderColor:'#d3d3d3',
                }}></Image>
                <Text style={{
                    color:'#000',
                    fontSize:16,
                    fontWeight:'bold',
                    marginTop:15,
                }}>{this.props.nome}</Text>

            </View>

            <View style={{
                marginTop:20,
            }}>
                <ScrollView>

                    <TouchableOpacity onPress={
                        this.funcaoHome
                    }>
                        <View style={{
                            flexDirection:'row', marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='home'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Tela inicial
                        </Text>
                        </View>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={
                        this.funcaoCategoria
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='th-large'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Categorias
                        </Text>
                        </View>
                    </TouchableOpacity>*/}


                    <TouchableOpacity onPress={
                        this.funcaoMeusDados
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='user'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Meus dados
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoColaborador
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='user-plus'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Seja um Colaborador
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoCadastroEstabelecimento
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='cart-plus'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Cadastre seu negócio
                        </Text>
                        </View>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={
                        this.funcaoMoedas
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='money'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Moedas iLúmino
                        </Text>
                        </View>
                    </TouchableOpacity>*/}

                    <TouchableOpacity onPress={
                        this.funcaoSobre
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='info-circle'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Sobre a iLúmino
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoFaleConosco
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='phone'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Fale conosco
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoAjuda
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                            borderBottomWidth:0.8, borderBottomColor:'#d3d3d3',
                        }}>

                        <Icon name='question-circle-o'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Ajuda
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoSair
                    }>
                        <View style={{
                            flexDirection:'row', marginTop:10, marginHorizontal:30, paddingBottom:0,
                        }}>

                        <Icon name='sign-out'
                            size={23}
                            color='#000'
                            style={{
                                paddingBottom:10
                            }} />
                        <Text style={{
                            fontSize:16,
                            color:'#000',
                            marginLeft:30,
                            marginTop:3,
                        }}>
                            Sair
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        flex:1,
                        height:300,
                    }} />
                </ScrollView>
            </View>

            </View>
        );
    }

}

function mapStateToProps(state){
    return{
        fotoPath: state.fotoPath,
        nome: state.nome,
    }
}

function mapDispatchToProps(dispatch){
    return{
        logout : ()=> dispatch({type:'LOGOUT'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderBarUsuario);
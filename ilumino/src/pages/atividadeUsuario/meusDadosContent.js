import React, {Component, PureComponent} from 'react';
import {View, Dimensions, BackHandler,Text, StyleSheet, Platform, Image,AsyncStorage, Alert, TouchableOpacity} from 'react-native';
import {Container, Content, Header, RadioButton,Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import * as Progress from 'react-native-progress';
import {StackActions, NavigationActions} from 'react-navigation';

export default class meusDadosContentUser extends Component{
    constructor(props){
        super(props);

       // this.mount = false;
    }
    static navigationOptions = {
        //header:null,
        tabBarIcon: ({tintColor}) => (
            <Icon name='user' size={20}
            style={{color: tintColor}}></Icon>
        ),
    }

    state={
        loading:false,
        usuarioDto:{}
    }

    async montarObjeto(){
        const fotoPath = await AsyncStorage.getItem("@iLuminoApi:fotoPath")
        const id = await AsyncStorage.getItem("@iLuminoApi:id")
        const nome = await AsyncStorage.getItem("@iLuminoApi:nomeUsuario")
        const sobreNome = await AsyncStorage.getItem("@iLuminoApi:sobreNome")
        const cpf = await AsyncStorage.getItem("@iLuminoApi:cpf")
        const nickname = await AsyncStorage.getItem("@iLuminoApi:nickname")
        const celular = await AsyncStorage.getItem("@iLuminoApi:celular")
        const whatsapp = await AsyncStorage.getItem("@iLuminoApi:whatsapp", (value)=>{
            JSON.parse(value)
        })
        const W = whatsapp == 'true'
        const email = await AsyncStorage.getItem("@iLuminoApi:email")

        const usuarioDto = {
            id,
            nome,
            sobreNome,
            cpf,
            nickname,
            fotoPath,
            celular,
            whatsapp:W,
            email,
        }

        //if(this.mount){
          //  this.setState({usuarioDto})
        //}
        this.setState({usuarioDto});
        
        //this.state = {
         //   usuarioDto:usuarioDto,
        //}
    }

    componentDidMount(){
        //this.mount = true;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware
        this.montarObjeto();   

        /*this.setState({loading:true})
        const id = await AsyncStorage.getItem("@iLuminoApi:id")
        if(id){
            const response = await api.get(
                `/api/usuario/usuario-id/${id}`,
                Headers={
                    'Content-Type':'application/json'
                }
            )
            if(response.ok){
                //const nome = response.data.data.cpf;
                //Alert.alert('Cpf '+nome)
                this.setState({usuarioDto:response.data.data, loading:false})
                //Alert.alert('U '+this.state.usuarioDto.fotoPath)
            }else{
                Alert.alert('Error na busca');
                this.setState({loading:false})
            }
        } else{
            Alert.alert('Error')
            this.setState({loading:false})
        }*/
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); // manipulacao de hardware
    }

    //componentWillUpdate(){
     //   this.montarObjeto();
    //}

    //componentWillUnmount(){
     //   this.mount = false;
    //}

    handleBackPress = () => {
        this.Voltar(); // melhor performance com Voltar async 
        return true;
      }

    Voltar = ()=>{
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();

        /*const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'TabsUsuario'})
            ]
          });
          this.props.navigation.dispatch(resetAction); */
    }

    refresh = () => {
        //Alert.alert('Voltei - r!');
        this.montarObjeto();
    }

    Editar = ()=> {
        const {id, nome, sobreNome, cpf, nickname, celular, whatsapp,email, fotoPath} = this.state.usuarioDto;
        this.props.navigation.navigate('EditarDadosUsuario', {          
            dados:{ id, nome, sobreNome, cpf, nickname, celular, whatsapp, email, fotoPath },
            onGoBack: ()=> this.refresh(),
        }, 
        );
    }
    
    render(){
        return(
            <Container>
                <View style={{
                    flex:1,
                    backgroundColor:'transparent'
                }}>
                    <View style={{
                        //borderTopColor:'#fff',
                        //borderTopWidth:0.8,
                        backgroundColor:'#15a1f8',
                        height:100,
                        alignItems:'flex-end'
                    }}>
                        <TouchableOpacity style={{
                            marginHorizontal:10,
                            marginTop:5,
                            borderColor:'#fff',
                            borderWidth:0.6,
                            backgroundColor:'transparent',
                            height:30,
                            alignItems:'center',
                            justifyContent:'center',
                            paddingHorizontal:10,
                        }}
                        
                        onPress={
                            this.Editar
                        }>
                            <Text style={{
                                color:'#fff'
                            }}>Editar Perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <Image style={{
                        width:140,
                        height:140,
                        borderRadius:100,
                        borderWidth:3,
                        borderColor:'#fff',
                        marginBottom:10,
                        alignSelf:'center',
                        position:'absolute',
                        marginTop:30,
                    }}
                    source={{uri:this.state.usuarioDto.fotoPath}}/>

                    <View style={{
                        marginTop:80,
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            color:'#000', fontWeight:'bold', fontSize:22,
                        }}>{this.state.usuarioDto.nome} {this.state.usuarioDto.sobreNome}</Text>
                        <Text style={{fontSize:22}}> - {this.state.usuarioDto.nickname} - </Text>
                    </View>

                    <View style={{
                        marginTop:40,
                        marginHorizontal:20,
                    }}>

                        <View style={{
                            flexDirection:'row',
                            //alignItems:'center',
                        }}>

                            <Text style={{marginRight:5, fontSize:18}}> {this.state.usuarioDto.celular} </Text>
                            {this.state.usuarioDto.whatsapp && <Icon name="whatsapp" size={20} color={'green'}/>}
                        </View>
                        <Text style={{marginTop:5, marginLeft:5,fontSize:18, marginRight:5}}>{this.state.usuarioDto.email}</Text>

                    </View>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    backgroundColor:{
        flex:1,

    },
    androidHeader : {
        ...Platform.select({
            android:{
                backgroundColor:'#15a1f8'
            },
            ios:{
                backgroundColor:'#15a1f8'
            }
        })
    },
})
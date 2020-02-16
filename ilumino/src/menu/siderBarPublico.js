import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {Container, Content, Header, Button, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SiderBarPublico extends Component {
    funcaoEntrar = () => {
        //Alert.alert('Entrar selecionado!');
        this.props.navigation.navigate('Login');
    }

    funcaoHome = () => {
        Alert.alert('Home selecionado!');
    }

    funcaoCategoria = () => {
       // Alert.alert('Categoria selecionado!');
       this.props.navigation.navigate('ListaCategorias');
    }

    funcaoCadastro = () => {
        this.props.navigation.navigate('PreCadastro');
    }

    funcaoColaborador = () => {
        //Alert.alert('Colaborador selecionado!');
        this.props.navigation.navigate('SejaColaborador');
    }

    funcaoCadastroEstabelecimento = () => {
        this.props.navigation.navigate('CadastreSeuNegocio');
    }

    funcaoSobre = () => {
        this.props.navigation.navigate('SobreAIlumino');
    }

    funcaoFaleConosco = () => {
        this.props.navigation.navigate('FaleConosco');
    }

    funcaoAjuda = () => {
        this.props.navigation.navigate('Ajuda');
    }

    render() {
        return(
            <View style={{
                flex:1,
                backgroundColor:'#fff',
            }}>
            
            <View style={{
                paddingBottom: 10,
                backgroundColor:'#fff',
                alignItems:'center',
            }}>

            <Image source={require('../pages/assets/user.png')}
                style={{
                    width:115, height:115, borderRadius:100,
                    marginTop:20, borderWidth: 2, borderColor:'#d3d3d3',
                }}></Image>
                <TouchableOpacity onPress={
                    this.funcaoEntrar
                }>
                    <Text style={{
                        color:'#000',
                        fontSize:16,
                        fontWeight: 'bold',
                        marginTop:15,
                    }}>Entrar</Text>
                </TouchableOpacity>

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

                    <TouchableOpacity onPress={
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
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        this.funcaoCadastro
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
                            Cadastre-se
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
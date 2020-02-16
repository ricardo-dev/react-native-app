import React, {Component} from 'react';
import {View, Dimensions, BackHandler,Text, StyleSheet, Platform, Image,AsyncStorage, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import {Container, Content, Header, RadioButton,Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';

class MeusDadosColaborador extends Component {

    static navigationOptions = {
        header:null,
    }

    state = {
        coladoradorDto:{}
    }

    Voltar = ()=>{
        this.props.navigation.goBack();
    }

    goEditar = ()=> {
        this.props.navigation.navigate('EditarColaborador');
    }

    render(){
        return(
            <Container>
                <ImageBackground style={{width:'100%', height:'100%'}} source={require('../../assets/bg/BG.png')}>
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
                    <TouchableOpacity
                            style={{marginRight:20}}
                            onPress={this.goEditar}
                            hitSlop={{ bottom: 15, top: 15, right: 15, left: 15 }}>
                            <Icon name='gear' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>

                </View>
                {/*<Header style={styles.androidHeader} androidStatusBarColor='#15a1f8' iosBarStyle='light-content'>
                    
                        <Left style={{
                            flex:1,
                            marginRight:2,
                        }}><TouchableOpacity onPress={this.Voltar} hitSlop={{top:20, bottom:20, right:20, left:20}}>
                            <Icon name='angle-left' size={30} color='#fff'
                            onPress={
                                this.Voltar
                            }></Icon></TouchableOpacity>
                        </Left>
                    
                    <Body style={{
                        flex:2,
                    }}>
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                        }}>iLúmino</Text>
                    </Body>

                    </Header>*/}
                <View style={{
                    flex:1,
                    backgroundColor:'transparent'
                }}>
                    <View style={{
                        //borderTopColor:'#fff',
                        //borderTopWidth:0.8,
                        backgroundColor:'transparent',
                        height:100,
                        alignItems:'flex-end'
                    }}>
                        {/*<TouchableOpacity style={{
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
                            this.redirecionarEditar
                        }>
                            <Text style={{
                                color:'#fff'
                            }}>Editar Perfil</Text>
                        </TouchableOpacity>*/}
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
                        marginTop:10,
                    }}
                    source={{uri:this.props.fotoPath}}/>

                    <View style={{
                        marginTop:80,
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            color:'#fff', fontWeight:'bold', fontSize:22,
                        }}>{this.props.nome} {this.props.sobreNome}</Text>
                        <Text style={{fontSize:22, color:'#fff'}}>ID : {this.props.id}</Text>
                        <Text style={{fontSize:22, color:'#fff'}}> - {this.props.nickname} - </Text>
                    </View>

                    <View style={{
                        marginTop:40,
                        marginHorizontal:20,
                    }}>

                        <View style={{
                            flexDirection:'row',
                            //alignItems:'center',
                        }}>

                            <Text style={{marginRight:5, fontSize:18, color:'#fff'}}> {this.props.celular} </Text>
                            {this.state.coladoradorDto.whatsapp && <Icon name="whatsapp" size={20} color={'#fff'}/>}
                        </View>
                        <Text style={{marginTop:5, marginLeft:5,fontSize:18, marginRight:5, color:'#fff'}}>{this.props.email}</Text>

                    </View>

                </View>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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
})

function mapStateToProps(state){
    return{
        fotoPath: state.fotoPath,
        nome: state.nome,
        id: state.id,
        sobreNome: state.sobreNome,
        nickname: state.nickname,
        celular: state.celular,
        whatsapp: state.whatsapp,
        email: state.email,
    }
}

export default connect(mapStateToProps) (MeusDadosColaborador);